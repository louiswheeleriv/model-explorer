# model-explorer

Rails/React app for uploading and browsing collections of painted miniatures.

Hosted at [mini-painter.com](https://mini-painter.com)

## Development

### Running the Rails Server

Install Ruby dependencies:

```
bundle install
```

Run any Rails migrations:

```
rake db:migrate
```

Start the Rails server:

```
rails s
```

### Building the Client

Install client dependencies:

```
yarn install
```

Build from Javascript files and watch for changes:

```
yarn build --watch
```

Build CSS and watch for changes:

```
yarn build:css --watch
```

#### Note on FontAwesome Token

Ensure your `.bash_profile` has the following line before running `yarn build`. It won't pick it up just from your `.env`.

```
export FONTAWESOME_PACKAGE_TOKEN="MY_TOKEN_HERE"
```
