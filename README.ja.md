# lambda-env-cli

AWS Lambda の環境変数を設定するコマンド。

## Installation

```
npm i lambda-env-cli -D
```

## Usage

```
lambda-env [options...] <functions>
```

- `functions`
    - Lambda の関数名を指定する。

## Options

### -s, --set-env

設定する環境変数を `key=value` の形式で指定する。

### -u, --unset-env

設定解除する環境変数名を指定する。

### -f, --fingerprint

Lambda 関数の fingerprint として役に立つ以下の環境変数を設定する。

- `LAMBDA_CODE_SHA256`
    - Lambda 関数パッケージの SHA256 ハッシュ値。
- `LAMBDA_LAST_MODIFIED`
    - Lambda 関数更新時のタイムスタンプ。

### --region

対象の AWS リージョンを指定する。

### --profile

aws-sdk 初期化に使用するプロファイル名を指定する。

## License

MIT
