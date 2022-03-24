import {createServer, IncomingMessage, RequestListener, Server, ServerResponse} from "http";
import {HttpStatus, RequestMethod} from "./types";

class Router {
  handlers = new Map();
  private server: Server;

  constructor(private readonly port: number) {
    this.server = createServer((req: IncomingMessage, res: ServerResponse) => {
      const handler = this.handlers.get(req.url);

      if (handler) {
        handler(req, res)
      } else {
        res.writeHead(HttpStatus.OK, {"Content-Type": "application/json"})

        return res.end(JSON.stringify({
          status: HttpStatus.NOT_FOUND,
          message: `The method ${req.method} at ${req.url} was not found`
        }))
      }
    }).listen(port, () => console.log(`listening on http://localhost:${port}`))
  }

  private generateRoute = (method: RequestMethod, route: string, callback: RequestListener) => {
    const generateHandler = (req: IncomingMessage, res: ServerResponse) => {
      if (req.method === method) {
        try {

          return callback?.(req, res);
        } catch (e) {
          console.log(e);
        }
      }
    }
    this.handlers.set(route, generateHandler);
  }

  public get = (route: string, callback: RequestListener) => this.generateRoute(RequestMethod.GET, route, callback)

  public post = (route: string, callback: RequestListener) => this.generateRoute(RequestMethod.POST, route, callback)

  public put = (route: string, callback: RequestListener) => this.generateRoute(RequestMethod.PUT, route, callback)

  public delete = (route: string, callback: RequestListener) => this.generateRoute(RequestMethod.DELETE, route, callback)
}

export default new Router(3000)