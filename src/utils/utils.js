function throwError (condition, res, message) {
  if (condition) {
    return res.status(406).json({
      error: message
    })
  }
}

function handleError (error, res) {
  return res.status(502).json({
    error: `${error.name}`,
    message: `${error.message}`
  })
}

module.exports = {
  throwError,
  handleError
}
