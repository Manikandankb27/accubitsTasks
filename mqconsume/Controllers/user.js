//import model 
import NewLetter from '../Models/newLetterModel';

// config
import { nodemailerUser, nodemailerPass, connURL } from '../Config/config';

// npm
import nodemailer from "nodemailer";
//import amqp from 'amqplib/callback_api';

var amqp = require('amqplib');


  /**
   * send email from nodemailer
   * input email & content
   */
export const sendOTPToMail = async (data) =>{
    console.log(data)
    let smtpConfig = {
      service: 'gmail',
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: nodemailerUser,
        pass: nodemailerPass
      },
        tls: { 
          rejectUnauthorized: false 
      }
    };
    let transporter = nodemailer.createTransport(smtpConfig);
  
    let mailOptions = {
      from: '"Admin NewLetter',     // sender address
      to: data.email ,              // list of receivers
      subject: "NewLetter",         // Subject line
      text: data.userName           //"name"
    };
  
    // send mail with defined transport object
    transporter.sendMail(mailOptions, async (error, info) => {
      if (error) {
       console.log("email error",error)
      }else{
        await new NewLetter(data).save();   // email sent success save newletter data's
      }
    });
  }


amqp.connect(connURL).then(function(conn) {
  return conn.createChannel().then(function(ch) {
      return ch.consume('emailDetection', function(msg) {
        sendOTPToMail(JSON.parse(msg.content))
      }, {noAck: true});
  });
}).catch(console.warn);