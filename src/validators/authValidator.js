const { body, param } = require("express-validator");

const authValidator = {
  validateSignup: [
    body("name")
      .exists()
      .withMessage("Name is required")
      .bail()
      .isString()
      .withMessage("Name must contain characters")
      .bail()
      .trim()
      .notEmpty()
      .withMessage("Name can't be empty")
      .bail()
      .isLength({ max: 100 })
      .withMessage("Character limit exceeded"),
    body("email")
      .exists()
      .withMessage("Email is required")
      .bail()
      .isEmail()
      .withMessage("Invalid email"),
    body("password")
      .exists()
      .withMessage("Password is required")
      .bail()
      .isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minSymbols: 1,
        minNumbers: 1,
      })
      .withMessage(
        "Password must contain at least one lowercase letter, one uppercase letter, one number, one special character and be at least 8 characters long"
      )
      .bail()
      .isLength({ max: 20 })
      .withMessage("Character limit exceeded"),
    body("confirmPassword")
      .exists()
      .withMessage("Confirm password is required")
      .bail()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Passwords don't match");
        }
        return true;
      }),
  ],

  validateSignin: [
    body("email")
      .exists()
      .withMessage("Incorrect email or password")
      .bail()
      .isEmail()
      .withMessage("Incorrect email or password"),
    body("password")
      .exists()
      .withMessage("Incorrect email or password")
      .bail()
      .isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minSymbols: 1,
        minNumbers: 1,
      })
      .withMessage("Incorrect email or password")
      .bail()
      .isLength({ max: 20 })
      .withMessage("Incorrect email or password"),
  ],

  validateSignout: [
    param("id")
      .exists()
      .withMessage("Id is required")
      .bail()
      .isMongoId()
      .withMessage("Invalid id"),
  ],

  validateEmailVerification: [
    param("token")
      .exists()
      .withMessage("Token is required")
      .bail()
      .isLength({ min: 64, max: 64 })
      .withMessage("Invalid token")
      .bail()
      .matches(/^[a-f0-9]{64}$/i)
      .withMessage("Invalid token"),
    param("id")
      .exists()
      .withMessage("Id is required")
      .bail()
      .isMongoId()
      .withMessage("Invalid id"),
  ],

  validateVerificationEmailResending: [
    param("id")
      .exists()
      .withMessage("Id is required")
      .bail()
      .isMongoId()
      .withMessage("Invalid id"),
  ],

  validatePasswordResetEmailSending: [
    body("email")
      .exists()
      .withMessage("Email is required")
      .bail()
      .isEmail()
      .withMessage("Invalid email"),
  ],

  validatePasswordReset: [
    param("token")
      .exists()
      .withMessage("Token is required")
      .bail()
      .isLength({ min: 64, max: 64 })
      .withMessage("Invalid token")
      .bail()
      .matches(/^[a-f0-9]{64}$/i)
      .withMessage("Invalid token"),
    param("id")
      .exists()
      .withMessage("Id is required")
      .bail()
      .isMongoId()
      .withMessage("Invalid id"),
    body("newPassword")
      .exists()
      .withMessage("New password is required")
      .bail()
      .isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minSymbols: 1,
        minNumbers: 1,
      })
      .withMessage(
        "Password must contain at least one lowercase letter, one uppercase letter, one number, one special character and be at least 8 characters long"
      )
      .bail()
      .isLength({ max: 20 })
      .withMessage("Character limit exceeded"),
    body("confirmPassword")
      .exists()
      .withMessage("Confirm password is required")
      .bail()
      .custom((value, { req }) => {
        if (value !== req.body.newPassword) {
          throw new Error("Passwords don't match");
        }
        return true;
      }),
  ],

  validatePasswordChange: [
    param("id")
      .exists()
      .withMessage("Id is required")
      .bail()
      .isMongoId()
      .withMessage("Invalid id"),
    body("currentPassword")
      .exists()
      .withMessage("Incorrect password")
      .bail()
      .isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minSymbols: 1,
        minNumbers: 1,
      })
      .withMessage("Incorrect password")
      .bail()
      .isLength({ max: 20 })
      .withMessage("Incorrect password"),
    body("newPassword")
      .exists()
      .withMessage("New password is required")
      .bail()
      .isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minSymbols: 1,
        minNumbers: 1,
      })
      .withMessage(
        "Password must contain at least one lowercase letter, one uppercase letter, one number, one special character and be at least 8 characters long"
      )
      .bail()
      .isLength({ max: 20 })
      .withMessage("Character limit exceeded"),
    body("confirmPassword")
      .exists()
      .withMessage("Confirm password is required")
      .bail()
      .custom((value, { req }) => {
        if (value !== req.body.newPassword) {
          throw new Error("Passwords don't match");
        }
        return true;
      }),
  ],
};

module.exports = authValidator;
