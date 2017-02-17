
/**
 *	Module dependencies 
 */

const mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * Message Schema definition
 */

var messageSchema = new Schema({
	thread: { type: Schema.Types.ObjectId, ref: 'Thread' },
	message: String,
	postedOn: { type: Date, default: Date.now },
	sender: { type: Schema.Types.ObjectId, ref: 'User' },
	read: { type: Boolean, default: false },
	isGenerated: Boolean
});


mongoose.model('Message', messageSchema);

