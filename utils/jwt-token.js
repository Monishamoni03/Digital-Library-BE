const sendRoleToken = (user) => {
    const token = user.generateJsonWebToken();
    const options = {
        expires: new Date(
            Date.now() + 60 * 60 * 1000
        ),
        httpOnly: true
    };

    return ({
        user,
        token,
        options
   })
};

export default sendRoleToken;