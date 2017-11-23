const debug = require('debug')('lambda-env-cli');
const { cyan, red } = require('chalk');
const awsConfigLoader = require('aws-sdk-config-loader');

exports.run = argv => {
  debug(argv);

  const lambda = initLambda(argv);

  argv._.forEach(FunctionName => {
    lambda.getFunctionConfiguration({ FunctionName }, (err, data) => {
      if (err) {
        console.error(`${FunctionName}: ${red('ERROR')}: ${err.message}`);
        return;
      }

      lambda.updateFunctionConfiguration(makeConfiguration(data, argv), err => {
        if (err) {
          console.error(`${FunctionName}: ${red('ERROR')}: ${err.message}`);
        } else {
          console.info(`${FunctionName}: ${cyan('OK')}`);
        }
      });
    });
  });
};

function initLambda(argv) {
  const AWS = require('aws-sdk');

  const profile = argv.profile || process.env.AWS_PROFILE;

  awsConfigLoader(AWS, { profile });

  AWS.config.update({
    region: argv.region || process.env.AWS_REGION,
  });

  return new AWS.Lambda();
}

function makeConfiguration(config, argv) {
  const {
    FunctionName,
    LastModified,
    CodeSha256,
    Environment = {},
  } = config;

  const { Variables = {} } = Environment;

  const {
    setEnv,
    unsetEnv,
    fingerprint,
  } = argv;

  if (setEnv) {
    Object.assign(Variables, setEnv);
  }

  if (unsetEnv) {
    unsetEnv.forEach(name => delete Variables[name]);
  }

  if (fingerprint) {
    Variables.LAMBDA_CODE_SHA256 = CodeSha256;
    Variables.LAMBDA_LAST_MODIFIED = LastModified;
  }

  return {
    FunctionName,
    Environment: {
      Variables,
    },
  };
}
