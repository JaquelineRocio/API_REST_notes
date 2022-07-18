import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import './database/connectdb.js';
import authRouter from './routes/auth.route.js';
import noteRouter from './routes/note.route.js';
import cookieParser from 'cookie-parser';

const app = express();

const whiteList = [process.env.ORIGIN1]

app.use(cors({
    origin: function(origin, callback){
        if(whiteList.includes(origin)){
            return callback(null, origin)
        }
        return callback("Error de CORS origin:")
    }
}))

app.use(express.json());
app.use(cookieParser());
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/notes', noteRouter)

const PORT = process.env.PORT || 5000
app.listen(PORT, ()=>console.log("http://localhost:"+PORT))

