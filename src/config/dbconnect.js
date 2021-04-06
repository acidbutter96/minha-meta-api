import mongoose from 'mongoose';

import dotenv from 'dotenv';
dotenv.config();

class DataBase {
    constructor() {
        this.mongoDataBase();
    }
    mongoDataBase() {
        this.mongoDBConnection = mongoose.connect(`mongodb+srv://${process.env.DATABASE}:${process.env.DB_PASSWORD}${process.env.DB_SERVER}?retryWrites=true&w=majority`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        })
            .then(() => console.log("Connected with MongoDB"))
            .catch((e) => console.log(`Error: Not conencted with MongoDB.\nErr: ${e}`));
    }
}

export default new DataBase();