const tokenGenerate = (user, statusCode, res, message) => {
    const token = user.generateJsonWebToken();
    const options = {
        expires: new Date(
            Date.now() + 60 * 60 * 1000
        ),
        httpOnly: true
    };

    return res.status(statusCode).cookie("token", token, options).json({
        message: message,
        user,
        token,
    })
}

export default tokenGenerate;