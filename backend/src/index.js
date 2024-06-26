import dotenv from 'dotenv'
import connectDB from './database/index.js'
import app from './app.js'

dotenv.config({
    path: "./.env"
})

connectDB()
.then(() => {
    app.listen(process.env.PORT || 3000, () => {
        console.log("App is Listening at PORT", process.env.PORT);
    })
})
.catch((error) => {
    console.log(error);
})