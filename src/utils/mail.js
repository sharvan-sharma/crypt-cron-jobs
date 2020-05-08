const nodemailer = require("nodemailer");


const mail = async (quater,email,dataArray)=>{
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, 
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  });
 

  let info = await transporter.sendMail({
    from: '"CryPt Reports Team" <crypt.oauth.reports@gmail.com>',
    to: email, 
    subject: "Day quater-"+quater+"report", 
    html: `<b>Hello Dev</b>
           <p>Report of this quarter</p>
           <div>`+dataArray.map(obj=>`<p>`+obj+`</p>`)+`<div>
           <p>Thank you</p>
           <p>CryPt Reports Team</p>` 
  });
  console.log("Message sent: %s", info.messageId,'quater', quater);
}



module.exports = mail