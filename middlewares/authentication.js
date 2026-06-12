const {validateToken}=require('../services/authentication');
function checkAuthentication(cookieName) {
    return (req, res, next) => {// return (req, res, next) => {}) is a middleware function that takes in the request, response and next function as arguments. It checks for the presence of a token in the cookies of the request. If the token is not present, it calls the next function to move on to the next middleware. If the token is present, it validates the token using the validateToken function from the authentication service. If the token is valid, it attaches the payload of the token to the request object as req.user and calls the next function to move on to the next middleware. If the token is invalid, it simply calls the next function without attaching any user information to the request object.
        const token= req.cookies[cookieName];
        if (!token) {
            return next();
        }
        try{
            const payload= validateToken(token);
            req.user=payload;
            return next();
        } catch (error) {
            return next();
        }
}}
// this middleware will be used to check if the user is authenticated or not by validating the token present in the cookie. If the token is valid, it will attach the user information to the request object and call the next middleware. If the token is invalid or not present, it will simply call the next middleware without attaching any user information.
// we can use this middleware in our routes to protect certain routes that require authentication. For example, we can use it in the route for creating a new blog post to ensure that only authenticated users can create posts.

module.exports={
    checkAuthentication
}
