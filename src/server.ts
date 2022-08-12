import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv';
import productHandler from './handlers/products'
import usersHandler from './handlers/users';
dotenv.config();
const app: express.Application = express();

const address : number = parseInt ( process.env.PORT as string ) || 8000 ;

app.use( bodyParser.json() );

productHandler(app);
usersHandler(app);

app.get('/', (req: express.Request , res: express.Response ) => {
    res.send('Hello World!');
});

app.listen( address , function () {
    console.log(`starting app on: ${address}`)
});


export default app ;