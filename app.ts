import Router from "./router";
import {HttpStatus} from "./types";
import {IncomingMessage, ServerResponse} from "http";
import { IncomingForm } from 'formidable';
import * as fs from "fs";

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
