import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SECRET = "SECRET";

const schema = new mongoose.Schema({
    name: {
      type: "String",
    //   required: true
    },
    age: {
      type: "String",
    //   required: true
    },
    email: {
      type: "String",
    //   required: true
    },
    password: {
      type: "String",
    //   required: true
    },
    role: {
      type: String,
    //   default: "user"
    },
    subscription: {
      type: String,
    //   default: "free"
    },
    referredUsers: {  // Array of ObjectIds pointing to other users
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'data',
      default: []
    }
  });
  

schema.pre('save', async function(next) {
    if (!this.isModified('password'))
        return next();

    this.password = await bcrypt.hash(this.password, 10);
    return next();
});

schema.methods = {
    generateJWTToken: async function() {
        return jwt.sign({
            id: this._id,
            role: this.role,
            subscription: this.subscription
        },
        SECRET, {
            expiresIn: '300s'
        });
    }
};

const data = mongoose.model("data", schema);

export default data;
