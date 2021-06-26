import mongoose from 'mongoose';
var Schema = mongoose.Schema;

const newletterSchema = new Schema({
	date		:  { type: Date ,  default: Date.now  },
	userName	:  { type: String , default: null },
	email		:  { type: String },
	},
	{	timestamps: true  });

const newletter = mongoose.model('newsletters', newletterSchema);

export default newletter;