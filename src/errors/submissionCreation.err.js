const BaseError = require('./base.err');

class SubmissionCreationError extends BaseError {
  constructor(details) {
    super(
      'SubmissionCreationError',
      400,
      'Failed to create submission',
      details
    );
  }
}
module.exports = SubmissionCreationError;
