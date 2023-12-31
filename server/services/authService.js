const User = require('../models/User.js')
const jwt = require('../promisifyToken/jsonwebtoken.js')
require('dotenv').config();
const SECRET = process.env.JWT_SECRET
const ADMIN_EMAIL = process.env.ADMIN_EMAIL

exports.register = async (email,password,repeatPassword) => {
    const user = await User.findOne({email})

    if(user) {
        throw new Error('User already exists!')
    }

    if(password !== repeatPassword) {
        throw new Error('passwords missmatch!')
    }

    await User.create({email,password})
}

exports.login = async (email,password) => {
    const user = await User.findOne({email})

    if(!user) {
        throw new Error('Invalid email or password')
    }

    const checkPassword = await user.validatePassword(password)

    if(!checkPassword) {
        throw new Error('Invalid email or password')
    }

    let isOwner = false;

    if(user.email === ADMIN_EMAIL) {
        isOwner = true;
    }


    const payload = {_id: user._id, email: user.email};
    const token = await jwt.sign(payload, SECRET,{ expiresIn: '20h' })
    
    return {
        _id: user._id,
        email: user.email,
        accessToken: token,
        isOwner: isOwner
    }
}

exports.addToCart = async (_id,watchId) => {
    const user = await User.findById(_id)
    const existingWatch = user.shopCart.findIndex((watch) => watch._id == watchId)

    if(existingWatch !== -1) {
        throw new Error('watch has already been added to cart')
    }

    const updatedUser = await User.findOneAndUpdate(
        { _id },
        { $push: { shopCart: watchId } },
        { new: true }
      );
    
      if (!updatedUser) {
        throw new Error('Invalid user');
      }
    
      return updatedUser;
}

exports.getAllCartProducts = async (userId) => {
const cartItems = await User.findById(userId).populate('shopCart')

return cartItems.shopCart

}

exports.deleteWatchFromCart = async (userId,watchId) => {
   await User.findByIdAndUpdate(userId, { $pull: { shopCart: watchId } });
   return watchId
}

exports.addToUserPurchaseHistory = async (userId,watchId,quantity,price,name,phone,address) => {
   
let totalSum = Number(quantity) * Number(price);
const updateUserPurchaseHistory = await User.findOneAndUpdate(
    { _id: userId },
    { $push: { userPurchaseHistory: { userId,watchId,quantity,totalSum,name,phone,address } } },
    { new: true, runValidators:true}
)

if(!updateUserPurchaseHistory) {
    throw new Error('Invalid User')
}

return updateUserPurchaseHistory
}

exports.getPurchaseHistory = async (userId) => {
    const user = await User.findById(userId).populate({
        path: 'userPurchaseHistory.watchId',
        select: 'brand model',
        
      });
    if(!user) {
        throw new Error('Invalid user')
    }
    return user.userPurchaseHistory
}

exports.getAllPurchaseHistory = async () => {
    const users = await User.find({}).populate({
        path: 'userPurchaseHistory.watchId',
        select: 'brand model',
      });
    
      let allPurchaseHistory = [];
      users.forEach(user => {
        allPurchaseHistory = allPurchaseHistory.concat(user.userPurchaseHistory);
      });

      if(allPurchaseHistory.length > 0) {
        allPurchaseHistory = allPurchaseHistory.sort((a,b) => a.date - b.date)
      }
    
      return allPurchaseHistory;
}