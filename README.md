![NPM Version](https://img.shields.io/npm/v/%40radiusnetworks%2Freact-native-flybuy-core)

<p align="center">
  <a href="https://github.com/RadiusNetworks/react-native-flybuy/">
    <img src="logo.svg" height="128">
  </a>
</p>


# React Native FlyBuy SDK Wrapper

The FlyBuy cloud service and mobile SDK enables developers to add FlyBuy functionality directly into their react native apps for a full white label implementation of the service.

Included SDKs:

- [X] FlyBuy Core
- [X] FlyBuy Pickup
- [X] FlyBuy Presence
- [X] FlyBuy Notify
- [X] FlyBuy LiveStatus


SDK that supports React Native New Architecture:
Right now the new architecture is in [https://reactnative.dev/docs/the-new-architecture/landing-page#should-i-use-the-new-architecture-today](Beta test)

- [ ] FlyBuy Core
- [ ] FlyBuy Pickup
- [ ] FlyBuy Presence
- [ ] FlyBuy Notify

The code is supports React Native New Architecture but we haven't test it.


## Documentation

Visit [FlyBuy SDK documentation](https://www.radiusnetworks.com/developers/flybuy/) to view the full documentation.

## Getting Started

To build and run the development app from source, perform the following steps:

Install ruby and nodejs using a tools such as `asdf`. The `.tool-versions` file specifies the current versions of each
to use.

For convenience, a setup script can be run to build the SDK packages and install app dependencies automatically

```
bin/setup
```

### Manual setup steps

Build SDK packages

```
cd mono
yarn install
yarn lerna run prepare
```

Install dev app dependencies

```
cd ../development-app
yarn install
bundle install
cd ios
bundle exec pod install --repo-update
```

### Running the apps

Start metro server

```
cd ..
yarn start
```

For iOS, either build from xcode or command line

```
yarn ios
```

For Android, either run from android studio or command line

```
yarn android
```

### Running checks/tests manually

To run the same checks and tests that run when a PR is pushed to Github

```
bin/checks
```

## Publish to NPM

To release a new version of the SDK wrapper:

0. Merge `main` to `release`
1. In terminal:

```
bin/bump-version 2.x.x
```
where 2.x.x is the new version

2. Commit and push to `release` branch.
3. Tag the commit with `v2.x.x` and push to remote.
4. [GitHub Actions](https://github.com/RadiusNetworks/iris-react-native/actions) should detect this tag and run a new build. This will:
    - Validate the package build process
    - Create a draft-release on GitHub
    - Message `#eng-iris-mobile` that the release is ready for review

5. Go to the GitHub draft release, fill out the release notes, publish

6. [GitHub Actions](https://github.com/RadiusNetworks/iris-react-native/actions) publishes to npm and posts to `#releases`

7. Merge `release` back to `main`


## Contributing

Do you have a feature request, bug report, or patch? Great! See [CONTRIBUTING.md](./CONTRIBUTING.md) for information on what you can do about that. Contributions are welcome and appreciated !

## License

[MIT](./LICENSE)

