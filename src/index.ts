import http from 'http';
import * as dotenv from 'dotenv';

import { requestHandler } from './helpers';

dotenv.config();

const port = process.env.PORT || 3000;
const server = http.createServer(requestHandler);

server.listen(port);
console.log(`Server is working on Port: ${port}`);

export { server, port };
