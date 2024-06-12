import jwt from "jsonwebtoken";

// handle errors
export const errorHandler = (err, req, res, next)=>{
    const defaultMessage = "Nous avons des problémes techniques. Merci de réessayer plus tard.";
    const {status, message, error} = err;
    if (error) {
        console.log(error);
    }
    res.status(status).json({message: message || defaultMessage});
}

// Protect routes with authentication
export const verifyToken= (req, res, next) => { 
    // get the token from the cookies inside the browser
    const token = req.cookies.token;

    // if no token user is not authorized 
    if(!token) return res.status(401).json({message: 'accés non autorisé'});

    // if token let's verify it
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        // if errors access forbidden
        if (err) {
            return res.status(403).json({message:'accés interdit'}); 
        }
        // if no errors access granted and  user data saved
        req.user = user;
        next(); 
    })
}