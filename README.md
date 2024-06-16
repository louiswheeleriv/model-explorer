# model-explorer

Rails/React app for uploading and browsing collections of painted miniatures.

## Build Process

Ensure your `.bash_profile` has the following line before running `yarn build`. It won't pick it up just from your `.env`.

```
export FONTAWESOME_PACKAGE_TOKEN="MY_TOKEN_HERE"
```

## SSL Certificate Generation & Renewal

SSL certs generally last 3 months before expiration.

A new SSL cert can be generated like so:

```
brew install certbot
sudo certbot certonly --manual
```

Follow the CLI instructions and ensure the generated key is hosted at the indicated URL before proceeding (i.e. before hitting ENTER).
