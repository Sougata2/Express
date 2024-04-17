export const createUserValidationSchema = {
  username: {
    isLength: {
      options: {
        min: 5,
        max: 32,
      },
      errorMessage:
        "Username must be at least 5 characters with a max of 32 characters",
    },
    notEmpty: {
      errorMessage: "Username cannot be empty",
    },
    isString: {
      errorMessage: "Username must be a string!",
    },
  },
  displayName: {
    notEmpty: {
      errorMessage: "Display cannot be empty",
    },
  },
};

export const getUsersValidationSchema = {
  filter: {
    isString: {
      errorMessage: "Filter must be a string!",
    },
    notEmpty: {
      errorMessage: "Filter must not be empty",
    },
    isLength: {
      options: {
        min: 3,
        max: 10,
      },
      errorMessage: "Filter must be at least 3-10 characters",
    },
  },
  value: {},
};
