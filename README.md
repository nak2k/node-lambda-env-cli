# lambda-env-cli

CLI to configure environment variables for AWS Lambda.

## Installation

```
npm i lambda-env-cli -D
```

## Usage

```
lambda-env [options...] <functions>
```

- `functions`
    - Function names of Lambda.

## Options

### -s, --set-env

Specify the environment variable to be set in the form `key=value`.

### -u, --unset-env

Specify the environment variable name to unset.

### -f, --fingerprint

Set the following environment variables useful as fingerprint of Lambda function.

- `LAMBDA_CODE_SHA256`
    - SHA 256 hash value of Lambda function package.
    - This value is encoded with base64. So this value should re-encode with [base64url](https://www.npmjs.com/package/base64url) if necessary.
- `LAMBDA_LAST_MODIFIED`
    - Time stamp of Lambda function update.

### --region

Specify the target AWS region.

### --profile

Specify the profile name to be used to initialize aws-sdk.

## License

MIT
