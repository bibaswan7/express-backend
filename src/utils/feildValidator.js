const { extractValidationRules } = require('./modalValidator/proxyValidator');

const validateModal = (schema) => {
  const validationSchema = extractValidationRules(schema);

  return (req, res, next) => {
    const { error } = validationSchema.validate(req.body, { abortEarly: false });

    if (error) {
      const errorMessages = error.details.map((detail) => detail.message);
      return res.status(400).json({ message: 'Validation error', errors: errorMessages });
    }
    next();
  };
};

module.exports = validateModal;