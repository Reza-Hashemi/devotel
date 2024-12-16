import { diskStorage } from 'multer';
import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

const uploadFolder = './uploadFiles';
if (!fs.existsSync(uploadFolder)) {
    fs.mkdirSync(uploadFolder, { recursive: true });
}
export const uploadOptions = {
    storage: diskStorage({
        destination: uploadFolder,
        filename: (req, file, callback) => {
            const originalName = Buffer.from(file.originalname, 'latin1').toString(
                'utf8',
            );
            const filename = `${uuidv4()}@@${originalName}`;
            callback(null, filename);
        },
    }),
};
