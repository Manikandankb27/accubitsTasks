//import model 
import Users from '../Models/userModel';

// validation function 
import { userLoginInputValidate } from '../Validations/userValidation';

// config
import { connURL } from '../Config/config';

// npm
import amqp from 'amqplib/callback_api';
import _ from 'lodash';
import csv from 'csvtojson';

//  amqp connection to create channel
let ch = null;
amqp.connect(connURL, function (err, conn) {
    conn.createChannel(function (err, channel) {
        ch = channel;
    });
});


/** 
 * add user
 * url    : /user
 * method : post
 * body   : firstName, lastName, email, age
*/
export const addUsers = (req, res) => {
    const { errors, isValid } = userLoginInputValidate(req.body);
    if (!isValid) {
        return res.status(400).json({success: true, message : "Validation Error" , errors});
    }

    Users.findOne({ "email": req.body.email }).then(user => {
        if (user) {
            errors.email = 'User Email Already Exist';
            return res.status(400).json({success: true, message:"Already Exits",errors});
        }
        else {
            const newUser = new Users({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                age: req.body.age,
            })
            newUser.save().then(users => {
                let userDetails = {
                    _id: users._id,
                    firstName: users.firstName,
                    lastName: users.lastName,
                    email: users.email,
                    age: users.age
                };
                return res.json({ success: true, message: "Insert Successfully", data: userDetails });
            }).catch(err => {
                console.log(err)
                return res.status(500).json({ success: false, 'message': "Some Error", data: [] })
            })
        }
    })
}


/**
 * import file csv
 * url    : /importCsv
 * method : post
 * Form - Data   : File
*/
export const importNewLetterCsvFile = (req,res) => {
    try{
      csv()
      .fromFile(__dirname+'/../'+req.file.path)
      .on('header',()=>{      
          csv()
          .fromFile(__dirname+'/../'+req.file.path)
          .then( async (jsonObj)=>{
            addNewLetterFromCsv(jsonObj,res)
          })
      })
    }
    catch(err){
        console.log(err);
      return res.status(500).json({'success':false, 'message':"Error on server", 'error': err.toString()})
    }
  }


/**
 * file csv
 * call publish queue 
*/

  export const addNewLetterFromCsv = async (jsonObj,res) =>{
    try{
      let size = jsonObj.length;
      for(let i=0; i<size; i++){
          jsonObj[i].userName   = jsonObj[i].firstName + ' ' + jsonObj[i].lastName;
          var email = {
            userName: jsonObj[i].userName,
            email: jsonObj[i].email,            
          };
          publishToQueue("emailDetection",email);          
      }
      return res.status(200).json({"success":true, 'message':"Csv file imported successfully"})
    }
    catch(err){
        console.log("err",err);
    }
  }
  
/**
 * message queue through channel
 * inputs email sent details 
 */

  export const publishToQueue = async (queueName, data) => {
  try{
    console.log(queueName ,data)
    ch.sendToQueue(queueName, Buffer.from(JSON.stringify(data)));
  }catch(err){
    console.log(err)
  }
}