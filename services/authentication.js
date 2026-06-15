const jwt=require('jsonwebtoken');
const secretKey=process.env.JWT_SECRET || "b@tm@n@123";


function generateToken(user){
    const payload={
        _id : user._id,
        fullName: user.fullName,
        email : user.email,
        profilePictureURL : user.profilePictureURL,
        role : user.role
    }
    const token=jwt.sign(payload,secretKey);
    return token;
}

function validateToken(token){
    const payload=jwt.verify(token,secretKey)
    return payload;
}

module.exports={
    generateToken,
    validateToken
}
