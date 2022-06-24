const bcrypt = require('bcrypt')
module.exports = (mongoose) => {

    const userSchema = new mongoose.Schema({
        user_name: {
            type: String,
            required: [true, 'Username is required'],
            unique: true,
            lowercase: true
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
        },
        first_name: {
            type: String,
            required: [true, 'First name is required'],
        },
        last_name: {
            type: String,
            required: [true, 'Last name is required'],
        },
        full_name: String
    }, {
        toJson: {
            getters: true,
            setters: true,
        },
        toObject: {
            getters: true,
            setters: true,
        },
        timestamps: true
    })

    userSchema.pre('save', async function (next) {
        this.full_name = this.first_name + ' ' + this.last_name
        this.password = await bcrypt.hash(this.password, 10)
        next();
    })
    userSchema.post('init', function (doc) {
        doc.full_name = doc.first_name + ' ' + doc.last_name
        doc.save()
    })

    return userSchema
}