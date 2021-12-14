import usersRouter from './routes/usersRoutes';
import sequelize from './data/database'
import swaggerUi from "swagger-ui-express"
import swaggerDocs from "./config/swaggerDocs.json"

const ex = require('express');
const cors = require('cors');

class App {
    public server;
    public seq;
    constructor(){
        this.seq = sequelize;        
        this.server = ex();
        this.server.use(cors());
        this.server.use(ex.json());
        this.server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
        this.server.use('/users', usersRouter);
    }
}

export default new App();