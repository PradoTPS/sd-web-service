import App from '../infrastructure/webserver/fastify/server';
import BoardGameRoutes from './handlers/BoardGame.route';
import PlayerRoutes from './handlers/Player.route';
import PlayerListRoutes from './handlers/PlayerList.route';
import ListRoute from './handlers/List.route';

export const app = new App({
  routes: [
    BoardGameRoutes,
    PlayerRoutes,
    PlayerListRoutes,
    ListRoute,
  ],
})

app.listen();