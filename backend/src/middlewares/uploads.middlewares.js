import multer from 'multer';
import path from "path";


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(process.cwd(), "public", "images");
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

export const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5,
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
            cb(null, true);
        } else {
            cb(new Error("File type not supported")); 
        }
    },
});