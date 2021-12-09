import express, {Application} from "express"
import morgan from "morgan"

import authRoutes from './routes/auth';

const app:Application = express();

//settings
app.set('port', 3000)

//middlewares
app.use(morgan('dev')); //to back the type of request and the time it take to retrive the res and the status code
app.use(express.json())

//routes
app.use('/api/auth/',authRoutes);

export default app;