const handleError = (res, error, customMessage, code) => {
  console.log("ERROR: " + error);
  res.status(code || 500).json({"error": customMessage});
  return {error};
}

module.exports = handleError;
