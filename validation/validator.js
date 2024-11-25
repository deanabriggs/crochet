// Require resources
const { body, validationResult } = require('express-validator');

// Identify needed validation
const contributorValidationRules = () => {
    return [
        body('firstName').isLength({min:3}),
        body('lastName').isLength({min:3}),
        body('email').isEmail()
    ]
}

// Checks if there is a validation issue
const validate = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg}))

    return res.status(422).json({
        errors: extractedErrors,
    })
}

// Export valication functions
module.exports = {
    contributorValidationRules,
    validate
}