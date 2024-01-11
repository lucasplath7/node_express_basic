import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import routes from './routes/index.js';

const app = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('combined'));

app.get('/health', (req, res) => {
  res.send('server is active');
});

app.use('/', routes);

app.listen(3001, () => {
  console.log('listening on port 3001');
});