// importing required packages and modules

const { isValidObjectId } = require(`mongoose`);

// custom validator for incoming objectId value
const objectIdValidation = (value, helpers) => {
  // validating incoming value
  if (!isValidObjectId(value)) {
    // this code runs in case incoming value is not a valid object id

    // returning with an error indicating that incoming value is invalid
    return helpers.error(`any.invalid`);
  }

  // returning incoming value if it is valid
  return value;
};
// custom validator for incoming stringified JSON objects
const jsonObjValidation = (value, helpers) => {
  try {
    // parsing and storing incoming JSON value
    value = JSON.parse(value);

    // checking if incoming value is valid
    if (!!value && value.constructor !== Object) {
      // this code runs in case incoming value is not an object

      // storing custom error
      const error = new Error(`it is not valid stringified JSON object.`);

      // returning with an error indicating that incoming value is invalid JSON
      return helpers.error(`any.custom`, { error });
    } else if (!Object.keys(value).includes(`query`)) {
      // this code runs in case incoming obj doesn't have 'query' key

      // storing custom error
      const error = new Error(`it is missing 'query' field.`);

      // returning with an error indicating that incoming value is invalid JSON
      return helpers.error(`any.custom`, { error });
    }
  } catch (err) {
    // this code runs in case value could not be parsed as JSON

    // storing custom error
    const error = new Error(`it is not valid JSON.`);

    // returning with an error indicating that incoming value is invalid JSON
    return helpers.error(`any.custom`, { error });
  }

  // returning incoming value if it is valid
  return value;
};

// custom validator for incoming stringified JSON objects
const emptyObjectValidation = (value, helpers) => {
  // checking if incoming value is valid
  if (!Object.keys(value).length) {
    // this code runs in case incoming obj is empty

    // storing custom error
    const error = new Error(`it can't be empty.`);

    // returning with an error indicating empty object
    return helpers.error(`any.custom`, { error });
  }

  // returning incoming value if it is valid
  return value;
};

// exporting validation helpers as modules
module.exports = {
  objectIdValidation,
  jsonObjValidation,
  emptyObjectValidation,
};
