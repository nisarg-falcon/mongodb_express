module.exports = (mongoose) => {
    const userSchema = new mongoose.Schema({
        user_name: String,
        password: String,
        first_name: String,
        last_name: String,
    }, {
        toJson: {
            getters: true,
            setters: true,
            virtuals: true
        },
        toObject: {
            getters: true,
            setters: true,
            virtuals: true
        },
        timestamps: true
    })

    userSchema.virtual('full_name').get(() => {
        return this.first_name + ' ' + this.last_name
    })

    return userSchema
}