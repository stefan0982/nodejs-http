import Router from "./router";
import {HttpStatus} from "./types";
import {IncomingMessage, ServerResponse} from "http";
import { IncomingForm } from 'formidable';
import * as fs from "fs";
import * as http from "http";
import { NotFoundError } from "./errors/notFoundError";
import { NotAuthorizedError } from "./errors/notAuthorizedError";
import { BadRequestError } from "./errors/badRequestError";
import { DatabaseConnectionError } from "./errors/databaseConnectionError";
import { ForbiddenError } from "./errors/forbiddenError";
import { SuccessStatus } from "./errors/successStatus";

const app = Router;

app.get('/', (req: IncomingMessage, res: ServerResponse) => {
  res.writeHead(HttpStatus.OK, { "Content-Type": "text/html" })

  return res.end(`
    <form action="update" method="post" enctype="multipart/form-data">
      <label>
        Last Name: 
        <input type="text" name="lastName" required>
      </label>
      <br>
      <input type="file" name="avatar" required>
      <br>
      <input type="submit" value="Submit"/>
    </form>
    <a href="/error">receive response from hw-serve/weather</a>
  `)
})

app.post('/update', (req: IncomingMessage, res: ServerResponse) => {
  res.writeHead(HttpStatus.CREATED, { "Content-Type": "text/plain" })
  const form = new IncomingForm();
  form.parse(req, function (err, fields, files) {
    const oldPath = files.avatar.filepath;
    const newPath = __dirname + '/\/' + fields.lastName + '.png';
    fs.rename(oldPath, newPath, function (err) {
      if (err) throw err;
      return res.end('File was uploaded');
    });
  });
})

app.get('/error', (_, response) => {
  const options = new URL('http://localhost:3004/weather');

  const request = http.request(options, async (res) => {
    let error;
    console.log(`STATUS: ${res.statusCode}`);
    switch ( res.statusCode ) {
      case 200: error = new SuccessStatus(); break;
      case 400: error = new BadRequestError('Please provide a valid input'); break;
      case 401: error = new NotAuthorizedError(); break;
      case 403: error = new ForbiddenError(); break;
      case 404: error = new NotFoundError(); break;
      case 500: error = new DatabaseConnectionError(); break;
      default: error = new SuccessStatus();
    }
    res.setEncoding('utf8');
    res.on('data', () => {
      response.end(`server response: ${error.statusCode} - ${error.message}`)
    });
  });

  request.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
  });

  request.end();
})
