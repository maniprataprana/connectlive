
/**
 *	Module dependencies 
 */

const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var statusTypes = 'unscheduled unconfirmed confirmed rescheduled done'.split(' ');

/**
 * Thread Schema definition  
 */

var threadSchema = new Schema({
	user: { type: Schema.Types.ObjectId, ref: 'User' },
	expert: { type: Schema.Types.ObjectId, ref: 'User' },
	subject: { type: String, default: 'No Subject' },
	requestedSlots: [Date],	
	currentStatus: {
		status: { 
			type: String, 
			enum: statusTypes, 
			default: 'unscheduled',
			required: 'Please enter the current thread status.', 
		},
		timestamp: Date,
	},
});

mongoose.model('Thread', threadSchema);
