class SubmissionService {
  constructor(submissionRepository) {
    this.submissionRepository = submissionRepository;
  }
  async addSubmission(submissionPayload) {
    const problemID = submissionPayload.problemID;
    console.log('Submission ProblemID : ', problemID);

    const submission =
      await this.submissionRepository.createSubmission(submissionPayload);

    if (!submission) {
      throw new Error('Submission creation failed');
    }
    console.log('submission Payload : ', submission);
    return submission;
  }
}
module.exports = SubmissionService;
