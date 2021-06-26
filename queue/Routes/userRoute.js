import express from 'express';
import * as userCtrl from '../Controllers/user';


const router = express.Router();

import path from "path";
var multer = require("multer");

var Csvstorage = multer.diskStorage({
	destination: (req, file, cb) => {
	  cb(null, "./public/");
	},
	filename: (req, file, cb) => {
	  var filetypes = /csv/;
	  var extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  	  if (extname) {
		cb(null, file.fieldname + ".csv");
	  }
	}
  });
  var CSVupload = multer({ storage: Csvstorage }).single("file");

// Add User
router.route('/user').post(userCtrl.addUsers);

// NewLetter Csv & Email
router.route('/importCsv').post(CSVupload,userCtrl.importNewLetterCsvFile);

export default router;