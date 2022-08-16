const generateToken = (user, statusCode, res, role, message) => {
    const token = user.generateJsonWebToken();
    const options = {
        expires: new Date(
            Date.now() + 60 * 60 * 1000  //cookie expire 
        ),
        httpOnly: true
    };

    console.log("TOKEN ROLE : ", role);

    return res.status(statusCode).cookie("token", token, options).json({
        data: message,
        role,
        token,
   })
};

export default generateToken;