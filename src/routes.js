import { Router } from 'express';

const routes = new Router();

routes.get('/v1', (req, res) => {
    return res.send('Teste Byefive');
})

export default routes;