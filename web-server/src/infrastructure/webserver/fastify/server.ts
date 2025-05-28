import fastify, { FastifyInstance } from 'fastify'

const config = {
  app: {
    domain: 'localhost',
    port: 8000,
    kind: 'development'
  }
}

class App {
  public app: FastifyInstance;
  public app_domain: string = config.app.domain;
  public app_port: number = config.app.port;

  constructor(appInit: { routes: any }) {
    this.app = fastify();

    this.routes(appInit.routes);
  }

  public routes(routes: { forEach: (arg0: (routes: any) => void) => void }) {
    routes.forEach((route) => {
      const router = new route();
      this.app.register(router.routes, { prefix: router.prefix_route });
    })
  }

  public listen() {
    this.app.listen({ port: this.app_port} , (err) => {
      if (err) {
        this.app.log.fatal({ msg: `Application startup error`, err });
        process.exit(1);
      }

      console.log(`App listening on the http://${this.app_domain}:${this.app_port} 🚀`);
    })
  }
}

export default App;