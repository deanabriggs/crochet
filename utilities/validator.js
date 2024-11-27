// Require resources
const { body, validationResult } = require("express-validator");

// Identify needed validation for Contributors
const contributorValidationRules = () => {
  return [
    body("firstName")
      .isLength({ min: 3 })
      .withMessage("First name must be at least 3 characters long"),
    body("lastName")
      .isLength({ min: 3 })
      .withMessage("Last name must be at least 3 characters long"),
    body("email").isEmail().withMessage("Must provide a valid email address"),
    body("phone")
      .isInt()
      .isLength({ min: 10, max: 10 })
      .withMessage("Phone number must contain only numbers (10 digits)"),
    body("joinDate")
      .isDate()
      .withMessage("Provide a valid date (YYYY-MM-DD format)"),
    body("numOfProj").isInt().withMessage("Must be a number"),
    body("qtyFollows").isInt().optional().withMessage("Must be a number"),
  ];
};

// Identify needed validation for Projects
const projectValidationRules = () => {
  return [
    body("title")
      .isLength({ min: 3 })
      .withMessage("Title must be at least 3 characters long"),
    body("category")
      .isIn(["Apparel", "Bags", "Blanket", "Decor", "Toys", "Other"])
      .withMessage(
        "Category must be Apparel, Bags, Blanket, Decor, Toys, Other (case sensative)"
      ),
    body("yarnType")
      .isAlpha()
      .isLength({ min: 3 })
      .withMessage("Yarn type must be at least 3 characters long"),
    body("yarnQty")
      .matches(/^(?=.*\d)(?=.*\b(?:ounces|yards|skeins)\b)[a-zA-Z0-9.\s]+/i)
      .withMessage(
        "Yarn quantity must include a number value and specification type (ounces, yards, or skeins)"
      ),
    body("needle")
      .matches(/^[a-zA-Z0-9.\s]+$/)
      .withMessage("Can be a letter or number in mm"),
    body("picture").optional(),
    body("pattern")
      .isLength({ min: 20 })
      .withMessage("Pattern must include at least 20 characters"),
  ];
};

// Checks if there is a validation issue
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors = errors.array().map((err) => ({
    [err.path]: err.msg,
  }));

  return res.status(422).json({
    errors: extractedErrors,
  });
};

// Export valication functions
module.exports = {
  contributorValidationRules,
  projectValidationRules,
  validate,
};
