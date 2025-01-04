import express from 'express';
import router from './routers/index.js';
import cors from 'cors';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import cookieParser from 'cookie-parser';
import { UPLOAD_DIR } from './constants/constants.js';
import { swaggerDocs } from './middlewares/swaggerDocs.js';

export function setupServer() {
 const app = express();
 app.use(express.json());
 app.use(cors());
 app.use(cookieParser());

app.use(router);

app.use('/api-docs', swaggerDocs());

app.use(notFoundHandler);

app.use(errorHandler);

app.use('/uploads', express.static(UPLOAD_DIR));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
}
