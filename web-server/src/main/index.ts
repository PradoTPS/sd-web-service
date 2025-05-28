import App from '../infrastructure/webserver/fastify/server';
import BoardGameRoutes from './handlers/BoardGame.route';
import PlayerRoutes from './handlers/Player.route';
import ListRoutes from './handlers/List.route';

export const app = new App({
  routes: [
    BoardGameRoutes,
    PlayerRoutes,
    ListRoutes,
  ],
})

app.listen();