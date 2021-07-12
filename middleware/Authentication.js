const jwt = require('jsonwebtoken');
const config = require('../config/config');

const authenticateToken = (req, res, next)=>{
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    const secretKey = config.data.secretKey

    if (token == null) return res.status(401).send({
        status: false,
        msg: 'Unauthorized'
    })

    jwt.verify(token, secretKey, (err, decoded)=>{
        if(err){
            console.log(err)
            res.status(403).send({
                status: false,
                msg: 'Forbidden Authorization failed'
            })
        }else{
            console.log(decoded)
            let dateIat = new Date(parseInt(decoded.iat) * 1000);
            let dateExp = new Date(parseInt(decoded.exp) * 1000);
            let now = new Date();
            console.log({dateIat, dateExp, now})
            next()
        }
    })
}
module.exports = authenticateToken