const { Schema, model } = require('mongoose')
const Joi = require('joi')
const { handleMongooseError } = require('../helpers')

const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*/
const userSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        match: emailRegexp,
        unique: true,
        require: true
    },
    password: {
        type: String,
        minlength: 3,
        require: true
    }

}, { versionKey: false, timestamps: true })

userSchema.post("save", handleMongooseError)

const registerSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(3).required()
})
const loginSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(3).required()
})

const schemas = {
    registerSchema,
    loginSchema
}

const User = model('user', userSchema)

module.exports = {
    User,
    schemas
}