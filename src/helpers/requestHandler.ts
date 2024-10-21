import http from 'http';

import { API } from '../types';
import { basePath, endpoint } from '../constants';
import { getUsers, getUserById } from '../utils';

export const requestHandler = (req: http.IncomingMessage, res: http.ServerResponse) => {
  const { url, method } = req;
  console.log('\n==== requestHandler url >', url, '<');

  const urlParts: string[] = url ? url.slice(1).split('/') : [];
  console.log('requestHandler urlParts', urlParts);
  console.log('requestHandler method', method);

  const [baseUrl, ...rest] = urlParts;

  console.log('requestHandler baseUrl', baseUrl);

  const [action, ...params] = rest;

  if (baseUrl !== basePath || action !== endpoint) {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Endpoint not found' }));
    return;
  }

  console.log('==== requestHandler action', action);
  console.log('==== requestHandler params', params);

  switch (method) {
    case API.GET: {
      console.log('>>> requestHandler method', API.GET);

      if (params.length === 0) {
        getUsers(res);
        break;
      }

      if (params.length === 1) {
        const userId = params[0];
        console.log('>>> userId', userId);

        getUserById(userId, res);
        break;
      }
    }

    default: {
      console.log('>>> default');

      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Endpoint not found' }));
      break;
    }
  }
};
