export const errorHandler = (err, req, res, next)=>{
    const defaultMessage = "Nous avons des problémes techniques. Merci de réessayer plus tard.";
    const {status, message, error} = err;
    if (error) {
        console.log(error);
    }
    res.status(status).json({message: message || defaultMessage});
}