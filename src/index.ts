import Express, { Application, Request, Response } from 'express'
import cors from 'cors';
import 'dotenv/config'
import { routes } from './routes/otp_route'

const app: Application = Express()

app.use(cors());
app.use(Express.json())
app.use(Express.urlencoded({ extended: false }))

app.get('/', (req: Request, res: Response) => {
    res.json({
        status: "success"
    })
})

app.use('/', routes)

app.listen(3000, () => {
    console.log("Welcome to http://localhost:3000");

})