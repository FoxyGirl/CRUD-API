import http from 'http';

import { API, Status } from '../types';
import { basePath, endpoint, contentType } from '../constants';
import { getUsers, getUserById, deleteUser, postUser, putUser } from '../utils';

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
    res.writeHead(Status.NOT_FOUND, contentType);
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
        getUserById(userId, res);
        break;
      }
    }

    case API.DELETE: {
      const userId = params[0] || '';

      deleteUser(userId, res);
      break;
    }

    case API.POST: {
      if (params.length === 0) {
        postUser(req, res);
      } else {
        res.writeHead(Status.ERROR, contentType);
        res.end(JSON.stringify({ message: `Server error` }));
      }
      break;
    }

    case API.PUT: {
      if (params.length === 0) {
        putUser(req, res);
      } else {
        res.writeHead(Status.ERROR, contentType);
        res.end(JSON.stringify({ message: `Server error` }));
      }
      break;
    }

    default: {
      console.log('>>> default');

      res.writeHead(Status.NOT_FOUND, contentType);
      res.end(JSON.stringify({ message: 'Endpoint not found' }));
      break;
    }
  }
};
