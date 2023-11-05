import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url';
import './config.mjs';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = process.env.PORT ?? 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
  });
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
