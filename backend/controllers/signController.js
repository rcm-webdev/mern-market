const Sign = require("../models/signModel");
const {uploadToCloudinary, generateTransformations, deleteMedia} = require("../config/cloudinary");
const {processUploadedFiles} = require("../config/multer");

//HTTP GET request to get all signs
const getSigns = async (req, res) => {
    try {
        const signs = await Sign.find({userId: req.user.id}).populate('userId', 'name email');
        
        res.status(200).json(signs);
    } catch (err) {
        console.log(`Error getting signs: ${err.message}`);
        res.status(500).json({message: err.message});
    }
}

//HTTP POST request to create a sign
const createSign = async (req, res) => {
   try {
    const {name} = req.body;

    if(!name){
        return res.status(400).json({message: "Name is required"});
    }
    if(!req.file){
        return res.status(400).json({message: "Image is required"});
    }
    
    //process the uploaded file
    const processedFile = processUploadedFiles(req.file)[0];
    
    const cloudinaryResult = await uploadToCloudinary(processedFile, {
        folder: "sign-cast/signs",
        transformation: [
            {width:1920, height:1080, crop:"limit"}
        ]
    }); 
    
    // Generate different transformation URLs
    const transformations = generateTransformations(cloudinaryResult.public_id, cloudinaryResult.resource_type);

    // Create media asset object
    const mediaAsset = {
        url: cloudinaryResult.secure_url,
        publicId: cloudinaryResult.public_id,
        type: cloudinaryResult.resource_type === 'video' ? 'video' : 
              cloudinaryResult.format === 'gif' ? 'gif' : 'image',
        originalName: processedFile.originalName,
        size: processedFile.size,
        mimeType: processedFile.mimeType,
        fieldname: processedFile.fieldname,
        width: cloudinaryResult.width,
        height: cloudinaryResult.height,
        duration: cloudinaryResult.duration || null,
        transformations: transformations
    };

    // Create the sign with embedded media asset
    const sign = await Sign.create({
        name,
        userId: req.user.id,
        mediaAsset
    });

    console.log(`Sign created by user ${req.user.email || req.user.name || req.user.id}: ${sign.name} (ID: ${sign._id})`);
    res.status(201).json(sign);

   } catch(err){
    console.error(`Error creating sign: ${err.message}`);
    res.status(500).json({ message: err.message });
   }
}

//HTTP PUT request to update a sign
const updateSign = async (req, res) => {
    try {
        const {id} = req.params;
        const {name} = req.body;
        
        const sign = await Sign.findById(id);
        if (!sign) {
            return res.status(404).json({message: "Sign not found"});
        }
        
        // Check if the user owns this sign
        if (sign.userId.toString() !== req.user.id.toString()) {
            return res.status(403).json({message: "Not authorized to update this sign"});
        }
        
        if (!name) {
            return res.status(400).json({message: "Name is required"});
        }
        
        sign.name = name;
        sign.updatedAt = Date.now();
        await sign.save();
        
        console.log(`User ${req.user.email || req.user.name || req.user.id} updated sign: ${sign.name} (ID: ${sign._id})`);
        res.status(200).json(sign);
    } catch (err) {
        console.error(`Error updating sign: ${err.message}`);
        res.status(500).json({message: err.message});
    }
}

//HTTP DELETE request to delete a sign
const deleteSign = async (req, res) => {
    try {
        const {id} = req.params;
        const sign = await Sign.findById(id);
        if (!sign) {
            return res.status(404).json({message: "Sign not found"});
        }
        
        // Check if the user owns this sign
        if (sign.userId.toString() !== req.user.id.toString()) {
            return res.status(403).json({message: "Not authorized to delete this sign"});
        }
        
        // Delete the asset from Cloudinary first
        if (sign.mediaAsset && sign.mediaAsset.publicId) {
            try {
                const resourceType = sign.mediaAsset.type === 'video' ? 'video' : 'image';
                await deleteMedia(sign.mediaAsset.publicId, resourceType);
                console.log(`Deleted asset from Cloudinary: ${sign.mediaAsset.publicId}`);
            } catch (cloudinaryError) {
                console.error(`Error deleting asset from Cloudinary: ${cloudinaryError.message}`);
                // Continue with sign deletion even if Cloudinary deletion fails
            }
        }
        
        // Delete the sign from database
        await sign.deleteOne();
        console.log(`User ${req.user.email || req.user.name || req.user.id} deleted sign: ${sign.name} (ID: ${sign._id})`);
        res.status(200).json({message: "Sign deleted successfully"});
    } catch (err) {
        console.error(`Error deleting sign: ${err.message}`);
        res.status(500).json({message: err.message});
    }
}

module.exports = {
    getSigns,
    createSign,
    updateSign,
    deleteSign
}