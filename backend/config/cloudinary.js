const cloudinary = require('cloudinary').v2;

// Validate environment variables
if (!process.env.CLOUD_NAME || !process.env.API_KEY || !process.env.API_SECRET) {
    console.error('Missing Cloudinary environment variables. Please check:');
    console.error('- CLOUD_NAME:', process.env.CLOUD_NAME ? '✓' : '✗');
    console.error('- API_KEY:', process.env.API_KEY ? '✓' : '✗');
    console.error('- API_SECRET:', process.env.API_SECRET ? '✓' : '✗');
    throw new Error('Cloudinary configuration incomplete');
}

// Configure Cloudinary using your existing environment variables
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

// Upload function for slideshow media
const uploadToCloudinary = async (file, options = {}) => {
    try {
        // Debug logging to help troubleshoot
        console.log('File object received:', {
            mimeType: file.mimeType,
            type: file.type,
            originalName: file.originalName,
            size: file.size
        });

        // Determine resource type and folder based on file type
        let resourceType = 'auto';
        let folder = 'sign-cast/slideshows';
        
        // Use mimeType from processed file or fallback to type
        const mimeType = file.mimeType || '';
        const fileType = file.type || '';
        
        if (mimeType.startsWith('video/') || fileType === 'video') {
            resourceType = 'video';
            folder = 'sign-cast/slideshows/videos';
        } else if (mimeType.startsWith('image/') || fileType === 'image' || fileType === 'gif') {
            resourceType = 'image';
            folder = 'sign-cast/slideshows/images';
        }

        // Validate file buffer exists
        if (!file.buffer) {
            throw new Error('File buffer is missing');
        }

        const uploadOptions = {
            folder: folder,
            resource_type: resourceType,
            quality: 'auto:good',
            fetch_format: 'auto',
            transformation: [
                { width: 1920, height: 1080, crop: 'limit' }
            ],
            public_id: `${Date.now()}_${Math.random().toString(36).substring(2)}`,
            ...options
        };

        console.log('Upload options:', uploadOptions);

        // Upload buffer to cloudinary
        const result = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                uploadOptions,
                (error, result) => {
                    if (error) {
                        console.error('Cloudinary upload stream error:', error);
                        reject(error);
                    } else {
                        console.log('Cloudinary upload successful:', result.public_id);
                        resolve(result);
                    }
                }
            );
            uploadStream.end(file.buffer);
        });

        return result;
    } catch (error) {
        throw new Error(`Cloudinary upload failed: ${error.message}`);
    }
};

// Helper function to generate transformation URLs for different use cases
const generateTransformations = (publicId, resourceType = 'image') => {
    const baseUrl = cloudinary.url(publicId, { resource_type: resourceType });
    
    return {
        original: baseUrl,
        thumbnail: cloudinary.url(publicId, {
            resource_type: resourceType,
            width: 300,
            height: 200,
            crop: 'fill',
            quality: 'auto:good'
        }),
        preview: cloudinary.url(publicId, {
            resource_type: resourceType,
            width: 800,
            height: 600,
            crop: 'limit',
            quality: 'auto:good'
        }),
        fullscreen: cloudinary.url(publicId, {
            resource_type: resourceType,
            width: 1920,
            height: 1080,
            crop: 'limit',
            quality: 'auto:best'
        })
    };
};

// Helper function to delete media from Cloudinary
const deleteMedia = async (publicId, resourceType = 'image') => {
    try {
        const result = await cloudinary.uploader.destroy(publicId, {
            resource_type: resourceType
        });
        return result;
    } catch (error) {
        console.error('Error deleting from Cloudinary:', error);
        throw error;
    }
};

// Helper function to get media details
const getMediaDetails = async (publicId, resourceType = 'auto') => {
    try {
        const result = await cloudinary.api.resource(publicId, {
            resource_type: resourceType
        });
        return result;
    } catch (error) {
        console.error('Error getting media details:', error);
        throw error;
    }
};

module.exports = {
    cloudinary,
    uploadToCloudinary,
    generateTransformations,
    deleteMedia,
    getMediaDetails
}; 