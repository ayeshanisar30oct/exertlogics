export function validate(schema, data) {
  const { error, value } = schema.validate(data, { abortEarly: false });
  if (error) {
    const formattedErrors = error.details.map(err => err.message);
    return { isValid: false, errors: formattedErrors };
  }
  return { isValid: true, value };
}
