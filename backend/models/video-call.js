
/**
 *	Module dependencies 
 */

const mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * VideoCall Schema definition
 */

var VideoCallSchema = new Schema({
	thread: { type: Schema.Types.ObjectId, ref: 'Thread'},
	scheduledOn: Date,
	confirmed: { type: Boolean, default: false },
	// if a call happens over multiple sessions until it is marked as done,
  // all time chunks add up to calculate the total call duration.
  callTimeLog: [{
		from: Date,
		to: Date 
	}],
	textChats: [{
		message: String,
		sender: { type: Schema.Types.ObjectId, ref: 'User' },
		timestamp: { type: Date }
	}],
	files: [String],
	createdOn: { type: Date, default: Date.now },
	done: { type: Boolean, default: false },
});
