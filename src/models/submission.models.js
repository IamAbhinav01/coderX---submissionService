const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: [true, 'User id for the submission is missing'],
  },
  problemId: {
    type: String,
    required: [true, 'Probelm id for the submission is missing'],
  },
  code: {
    type: String,
    required: [true, 'code for submission is missing'],
  },
  language: {
    type: String,
    required: [true, 'language for submission is missing'],
  },
  status: {
    type: String,
    enum: ['Pending', 'Success', 'RE', 'TLE', 'MLE', 'WA'],
    default: 'Pending',
  },
});
const Submission = mongoose.mongoose.model('Submission', submissionSchema);
module.exports = Submission;
