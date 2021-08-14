module.exports = {
  // Server
  PORT: process.env.PORT || 3000,
  // Database
  DBURL: 'mongodb://localhost:27017/ritesh',
  // Secrets
  AUTHSECRET: 'd428546e65be4c9b804b21fee2c8262453a4e2c0ba76f6ba6454950df4fe1b7b7964312187ec24ac11d05f7495aff503bd00e918870b6dd6525409eb0a83f617',
  PWDSALT: '6f9f1f7fdbbd61af35ebc168b2a25a83',
  TOKENEXPIRE: 5 * 24 * 60 * 60, // seconds, 5 days
}
