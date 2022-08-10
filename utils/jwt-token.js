const sendRoleToken = (user, statusCode, res) => {
    const token = user.getJWTToken();
    
    const options = {
      expires: new Date(
        Date.now() + 5 * 24 * 60 * 60 * 1000 
      ),
      httpOnly: true,
    };
  
    res.status(statusCode).cookie("token", token, options).json({
      success: true,
      user,
      token,
    });
  };
  
export default sendRoleToken;
  





// const sendRoleToken = (user, statusCode, res, message, role) => {
//     const token = user.generateJsonWebToken();
//     const options = {
//         expires: new Date(
//             Date.now() + 60 * 60 * 1000  //cookie expire
//         ),
//         httpOnly: true
//     };

//     return res.status(statusCode).cookie("token", token, options).json({
//         message: message,
//         user,
//         role: role,
//         token,
//    })
// };

// export default sendRoleToken;