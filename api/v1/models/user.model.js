const mongoose = require("mongoose");
const generateStringRandom = require("../../../helpers/generateStringRandom");


const userSchema = new mongoose.Schema(
  {
    fullName: String,
    email:String,
    password: String,
    token:{
        type:String,
        default:generateStringRandom.generateStringRandom(30)
    },
    deleted: {
      type: Boolean,
      default: false,
      required: false,
    },
    deletedAt: Date,
    restoreAt: Date,
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("User", userSchema, "users");
// console.log(productSchema);

module.exports = User;
