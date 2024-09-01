import { APP_CONSTANTS } from './constants.js';

const catchErrors = (err, res) => {
  console.log(err)
  return res.status(500).json({
    msg: 'Server error!',
    data: err.message,
    status: APP_CONSTANTS.OPERATION_FAILED,
  });
};

export default catchErrors;
