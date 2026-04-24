const SubmissionService = require('../services/submission.service');
const {
  createSubmissionZodSchema,
} = require('../validators/submission.validator');

async function createSubmission(request, response) {
  //   const response = await this.SubmissionService.addSubmission(request.body);

  try {
    const submissionService = new SubmissionService();
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
module.exports = createSubmission;
