const { z } = require('zod');

export const createSubmissionZodSchema = z
  .object({
    userId: z.string(),
    problemId: z.string(),
    code: z.string(),
    language: z.string(),
  })
  .strict();

module.exports = { createSubmissionZodSchema };
