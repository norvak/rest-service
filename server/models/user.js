const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


let rolesValid = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} not is rol validate'
};
let Schema = mongoose.Schema;

let userSchema = new Schema({

    name: {
        type: String,
        required: [true, 'Name is required']
    },
    last_name: {
        type: String,
        required: [true, 'LastName is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required']
    }, 
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValid
    },
    status: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

userSchema.methods.toJSON = function () {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    return userObject;
};

userSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser único' });

module.exports = mongoose.model('user', userSchema);