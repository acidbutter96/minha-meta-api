import express from 'express';
import { next } from 'sucrase/dist/parser/tokenizer';
import routes from './routes';

class App {
    constructor() {
        this.app = express();
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.app.use(express.json());

        next();
    }

    routes() {
        this.app.use(routes);
    }
}

export default new App().app;