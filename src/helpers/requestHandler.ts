import http from 'http';

import { API } from '../types';
import { basePath } from '../constants';
import { getUsers } from '../utils';

export const requestHandler = (req: http.IncomingMessage, res: http.ServerResponse) => {
  const { url, method } = req;
  console.log('==== requestHandler url >', url, '<');

  const urlParts: string[] = url ? url.slice(1).split('/') : [];
  console.log('requestHandler urlParts', urlParts);
  console.log('requestHandler method', method);

  const [baseUrl, ...rest] = urlParts;

  console.log('requestHandler baseUrl', baseUrl);

  if (baseUrl !== basePath) {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Endpoint not found' }));
    return;
  }

  const [action, ...params] = rest;

  console.log('==== requestHandler action', action);
  console.log('==== requestHandler params', params);

  switch (action) {
    case 'users': {
      if (req.method === API.GET) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(getUsers());
      } else {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Server Error' }));
      }

      break;
    }
    default: {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Endpoint not found' }));
      break;
    }
  }
};
