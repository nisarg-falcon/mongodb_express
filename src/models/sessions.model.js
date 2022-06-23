module.exports = (mongoose) => {
    const sessionSchema = new mongoose.Schema({
        user_id: String,
        token: String
    }, {
        timestamps: true
    })

    return sessionSchema
}