import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        mongoose.connection.on('connected', () => {
            console.log('Database connected')
        })
        await mongoose.connect(`${process.env.MONGO_URI}`)
        console.log(`successfully connected mongodb`)
    } catch (error) {
        console.error(`Error ; ${error.message}`)
        process.exit(1)
    }
}
export default connectDB