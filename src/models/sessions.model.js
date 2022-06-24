

module.exports = (mongoose) => {
    const sessionSchema = new mongoose.Schema({
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        },
        token: String
    }, {
        timestamps: true
    })

    return sessionSchema
}