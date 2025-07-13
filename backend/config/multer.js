const multer = require('multer');
const path = require('path');

// Enhanced file filter for slideshow media
const fileFilter = (req, file, cb) => {
    // Get file extension
    const ext = path.extname(file.originalname).toLowerCase();
    
    // Allowed file extensions
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.mp4', '.mov', '.avi', '.webm'];
    
    // Allowed MIME types for slideshow content
    const allowedMimeTypes = [
        // Images
        'image/jpeg',
        'image/jpg', 
        'image/png',
        'image/webp',
        'image/gif',
        // Videos
        'video/mp4',
        'video/quicktime', // .mov
        'video/x-msvideo', // .avi
        'video/webm'
    ];

    // Check both extension and MIME type for security
    if (allowedExtensions.includes(ext) && allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error(`File type ${file.mimetype} with extension ${ext} is not supported. Allowed types: jpg, jpeg, png, webp, gif, mp4, mov, avi, webm`), false);
    }
};

// Size limits configuration
const limits = {
    fileSize: 50 * 1024 * 1024, // 50MB per file
    files: 20, // Maximum 20 files per upload
    fieldSize: 2 * 1024 * 1024, // 2MB for form fields
};

// Main multer configuration using memory storage (your existing approach)
const upload = multer({
    storage: multer.memoryStorage(),
    fileFilter: fileFilter,
    limits: limits,
});

// Error handler for multer errors
const handleMulterError = (error, req, res, next) => {
    if (error instanceof multer.MulterError) {
        switch (error.code) {
            case 'LIMIT_FILE_SIZE':
                return res.status(400).json({
                    error: 'File too large',
                    message: 'File size cannot exceed 50MB',
                    code: 'FILE_TOO_LARGE'
                });
            case 'LIMIT_FILE_COUNT':
                return res.status(400).json({
                    error: 'Too many files',
                    message: 'Cannot upload more than 20 files at once',
                    code: 'TOO_MANY_FILES'
                });
            case 'LIMIT_UNEXPECTED_FILE':
                return res.status(400).json({
                    error: 'Unexpected field',
                    message: 'Unexpected file field in upload',
                    code: 'UNEXPECTED_FIELD'
                });
            default:
                return res.status(400).json({
                    error: 'Upload error',
                    message: error.message,
                    code: 'UPLOAD_ERROR'
                });
        }
    }
    
    // Handle file filter errors
    if (error.message.includes('File type')) {
        return res.status(400).json({
            error: 'Invalid file type',
            message: error.message,
            code: 'INVALID_FILE_TYPE'
        });
    }

    // Pass other errors to global error handler
    next(error);
};

// Middleware configurations for different upload scenarios
const uploadMiddleware = {
    // Single file upload
    single: (fieldName) => upload.single(fieldName),
    
    // Multiple files upload (same field)
    multiple: (fieldName, maxCount = 20) => upload.array(fieldName, maxCount),
    
    // Multiple files upload (different fields)
    fields: (fields) => upload.fields(fields),
    
    // Any files (for flexible uploads)
    any: () => upload.any(),
};

// Validation middleware for file uploads
const validateFiles = (req, res, next) => {
    const files = req.files || (req.file ? [req.file] : []);
    
    if (files.length === 0) {
        return res.status(400).json({
            error: 'No files uploaded',
            message: 'At least one file is required',
            code: 'NO_FILES'
        });
    }

    // Additional validation can be added here
    // e.g., check for minimum dimensions, specific formats, etc.
    
    next();
};

// Helper function to process uploaded files (for memory storage)
const processUploadedFiles = (files) => {
    const processedFiles = Array.isArray(files) ? files : [files];
    
    return processedFiles.map(file => {
        // Determine media type with safety check
        const mimeType = file.mimetype || '';
        const mediaType = mimeType.startsWith('video/') ? 'video' : 
                         mimeType === 'image/gif' ? 'gif' : 'image';
        
        return {
            buffer: file.buffer,
            originalName: file.originalname,
            size: file.size,
            mimeType: file.mimetype,
            type: mediaType,
            fieldname: file.fieldname
        };
    });
};

module.exports = {
    upload,
    uploadMiddleware,
    handleMulterError,
    validateFiles,
    processUploadedFiles,
    limits
}; 