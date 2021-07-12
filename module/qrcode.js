var QRCode = require('qrcode')
 
QRCode.toString('089998889998889998',{type:'terminal'}, function (err, url) {
  console.log(url)
})