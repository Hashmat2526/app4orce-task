// importing required packages and modules

// this helper logs info messages to the console
const logInfo = (inputMessage, inputData) => {
  // storing current date and time
  const CURRENT_DATE_TIME = new Date();

  // logging incoming message to the console
  console.log(` ${CURRENT_DATE_TIME} | INFO: ${inputMessage} `);

  // checking if some additional data has been sent
  if (inputData) {
    // this code runs in case some additional data has
    // been sent to log to the console

    // logging the incoming data to the console
    console.log(inputData);
  }
};

// this helper logs success messages to the console
const logSuccess = (inputMessage, inputData) => {
  // storing current date and time
  const CURRENT_DATE_TIME = new Date();

  // logging incoming message to the console
  console.log(` ${CURRENT_DATE_TIME} | SUCCESS: ${inputMessage} `);

  // checking if some additional data has been sent
  if (inputData) {
    // this code runs in case some additional data has
    // been sent to log to the console

    // logging the incoming data to the console
    console.log(inputData);
  }
};

// this helper logs warning messages to the console
const logWarning = (inputMessage, inputData) => {
  // storing current date and time
  const CURRENT_DATE_TIME = new Date();

  // logging incoming message to the console
  console.log(` ${CURRENT_DATE_TIME} | WARNING: ${inputMessage} `);

  // checking if some additional data has been sent
  if (inputData) {
    // this code runs in case some additional data has
    // been sent to log to the console

    // logging the incoming data to the console
    console.log(inputData);
  }
};

// this helper logs error messages to the console
const logError = (inputMessage, inputError) => {
  // storing current date and time
  const CURRENT_DATE_TIME = new Date();

  // logging incoming message to the console
  console.log(` ${CURRENT_DATE_TIME} | ERROR: ${inputMessage} `);

  // checking if some additional error data has been
  // sent
  if (inputError) {
    // this code runs in case some additional error
    // data has been sent to log to the console

    // logging the incoming data to the console
    console.log(inputError);
  }
};

// exporting helpers as module
module.exports = {
  logInfo,
  logSuccess,
  logWarning,
  logError,
};
