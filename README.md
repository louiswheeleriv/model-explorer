# model-explorer

Rails/React app for uploading and browsing collections of painted miniatures.

## SSL Certificate Generation & Renewal

SSL certs generally last 3 months before expiration.

A new SSL cert can be generated like so:

```
brew install certbot
sudo certbot certonly --manual
```

Follow the CLI instructions and ensure the generated key is hosted at the indicated URL before proceeding (i.e. before hitting ENTER).
