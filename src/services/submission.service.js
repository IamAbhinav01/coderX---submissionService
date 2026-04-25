const { fetchProblemDetails } = require('../api/problemAdmin.api');
const SubmissionCreationError = require('../errors/submissionCreation.err');
const submissionProducer = require('../producers/submission.producer');
const SubmissionRepository = require('../repositories/submission.repository');

class SubmissionService {
  constructor() {
    this.submissionRepository = new SubmissionRepository();
  }
  async addSubmission(submissionPayload) {
    const problemID = submissionPayload.problemId;
    console.log('Submission ProblemID : ', problemID);

    const problemAdminResponse = await fetchProblemDetails(problemID);

    if (!problemAdminResponse || !problemAdminResponse.Success) {
      throw new SubmissionCreationError(
        'Failed to fetch problem details from Problem Admin Service'
      );
    }
    console.log('problemAdminService: ', problemAdminResponse);

    const codeStubs = problemAdminResponse.data.codeSnippets || [];
    const languageCodeStub = codeStubs.find(
      (stub) =>
        stub.language.toLowerCase() === submissionPayload.language.toLowerCase()
    );

    console.log('Found codeStub: ', languageCodeStub);

    if (!languageCodeStub) {
      throw new SubmissionCreationError(
        `No code stub found for language: ${submissionPayload.language}`
      );
    }

    submissionPayload.code =
      languageCodeStub.startSnippet +
      '\n' +
      submissionPayload.code +
      '\n' +
      languageCodeStub.endSnippet;

    const submission =
      await this.submissionRepository.createSubmission(submissionPayload);

    if (!submission) {
      throw new Error('Submission creation failed');
    }
    console.log('submission Payload : ', submission);

    const { userId } = submissionPayload;
    const response = await submissionProducer({
      [submission._id]: {
        code: submission.code,
        language: submission.language,
        inputCase: problemAdminResponse.data.testCases[0].input,
        outputCase: problemAdminResponse.data.testCases[0].output,
        userId: userId,
        submissionId: submission._id,
      },
    });
    return { queueresponse: response, submission };
  }
}
module.exports = SubmissionService;
