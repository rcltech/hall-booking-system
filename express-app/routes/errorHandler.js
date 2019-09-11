const handleError = (res, error, customMessage, code) => {
  console.log("ERROR: " + error);
  res.status(code || 500).json({"error": customMessage});
}

module.exports = handleError;
