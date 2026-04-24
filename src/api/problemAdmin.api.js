const { PROBLEM_ADMIN_SERVICE } = require('../config/server.config');
const axioInstance = require('../config/axios.config');

const PROBLEM_ADMIN_BASE_URL = `${PROBLEM_ADMIN_SERVICE}/api/v1/problems`;

async function fetchProblemDetails(problem_id) {
  try {
    const url = `${PROBLEM_ADMIN_BASE_URL}/${problem_id}`;
    const response = await axioInstance.get(url);
    console.log('API Response: ', response.data);
    return response.data;
  } catch (err) {
    console.log('something happend while fetching the problem details');
    throw err;
  }
}

module.exports = {
  fetchProblemDetails,
};
