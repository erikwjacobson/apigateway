const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String
    },
    created_at: {
        type: Date,
        required: true,
        default: Date.now
    },
    updated_at: {
        type: Date,
        required: true,
        default: Date.now
    },
    permissions: {
        admin: {type: Boolean, default: false},
    }
})

userSchema.statics.fillable = function() {
    // Define excluded attributes
    var { _id, __v, created_at, updated_at, password, permissions, ...attrs } = this.schema.paths
    return attrs;
}

userSchema.statics.publicAttributes = function() {
    var { __v, password, ...attrs } = this.schema.paths
}

module.exports = mongoose.model('User', userSchema)