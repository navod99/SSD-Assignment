const jwt = require('jsonwebtoken');
const secretKey = process.env.Token_key; 
const currentTimestamp = Math.floor(Date.now() / 1000); 


module.exports.validateToken = (req, res, next) => {
    console.log("validateToken")
      const authHeader = req.headers["authorization"];
      console.log("authHeader", authHeader )
      const token = authHeader && authHeader.split(" ")[1];
      if (authHeader && authHeader.split(" ")[0] === "Bearer") {
        const decoded = jwt.verify(token, secretKey);
        console.log("decoded", decoded )
        if (decoded) {
            if (decoded.exp && decoded.exp < currentTimestamp) {
                return res.status(401).send({
                    status: 401,
                    message: "Unauthorized",
                    description: "Token has expired",
                });
            }
            return next();
        } else {
          return res.status(403).send({
            status: 403,
            message: "Unauthorized",
            description: "Invalid Token",
          });
        }
      } else {
        return res.status(401).send({
          status: 401,
          message: "Invalid Request",
          description: "Authorization Header Missing",
        });
      }
  };