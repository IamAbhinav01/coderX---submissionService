const Submission = require('../models/submission.models');

class SubmissionRepository {
  constructor() {
    this.submissionModel = Submission;
  }
  async createSubmission(submission) {
    const response = await this.submissionModel.create(submission);
    return response;
  }
}
module.exports = SubmissionRepository;
