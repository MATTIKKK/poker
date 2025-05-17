const express = require('express')
require('dotenv').config()
import {Request, Response} from 'express'

const app = express();
const PORT = process.env.PORT || 5000

app.use(express.json())

app.get('/', (req: Request, res: Response) => res.send('Server is alive@!@'));

app.listen(PORT, () => console.log("Server is running on port " + PORT));