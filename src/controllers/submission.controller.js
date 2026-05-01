const SubmissionService = require('../services/submission.service');
const {
  createSubmissionZodSchema,
} = require('../validators/submission.validator');

const submissionService = new SubmissionService();

async function createSubmission(request, response) {
  try {
    const validated_response = createSubmissionZodSchema.parse(request.body);
    const serviceResponse =
      await submissionService.addSubmission(validated_response);
    console.log(validated_response);
    response.status(201).send({
      error: {},
      message: 'Submission created successfully',
      data: serviceResponse,
      success: true,
    });
  } catch (error) {
    console.log(error);
    response.status(400).send({
      error: error.errors,
      message: 'Invalid submission data',
      data: null,
      success: false,
    });
  }
}

async function getUserSubmissions(request, response) {
  try {
    const { userId } = request.params;
    const submissions = await submissionService.getUserSubmissions(userId);
    response.status(200).send({
      error: {},
      message: 'Submissions fetched successfully',
      data: submissions,
      success: true,
    });
  } catch (error) {
    console.log(error);
    response.status(500).send({
      error: error,
      message: 'Failed to fetch submissions',
      data: null,
      success: false,
    });
  }
}

module.exports = {
  createSubmission,
  getUserSubmissions
};
