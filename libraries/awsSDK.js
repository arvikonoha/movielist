var AWS = require('aws-sdk');

AWS.config.update({region: process.env.REGION});

module.exports = AWS