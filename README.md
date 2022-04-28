# mikado_reborn

## Getting started

```sh
# Go in the project directory
cd mikado_reborn
# Install dependencies
yarn
# Run Storybook for documentation
yarn workspace doc storybook
# Or
yarn --cwd packages/doc storybook
```

### Project structure

This project is a mono repo, using yarn workspaces.

You will find two packages:

- doc (the documentation, built using storybook)
- mikado_reborn (the vue.js ui library)

### How to deploy

Since the design system is used as a package in our front-end application, we need to manage the versions. It is also important to keep an up-to-date changelog for each new version. By doing this, we allow multiple developers to know about changes even if they haven't reviewed the PR.

Lucky you, we've covered this with an upgrade script located at : `scripts/upgrade.js`.

The version control system we use is based on [semver](https://semver.org/). Using [AngularJS's commit message convention](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#-git-commit-guidelines), also known as conventional-changelog, it is therefore easy for a script to create a changelog.

To run the script, you must have GitHub cli installed and be authenticated.
If you don't have these prerequisites, the script will show you the corresponding error and guide you through the steps.

```sh
# GitHub cli install
brew install gh
# GitHub cli auth
gh auth login
```

To publish a new version of mikado, run:

```sh
make upgrade-mikado
```

> ⚠️ If there is any breaking changes, it is important to sync with others to make sure a PR with the needed changes will be merged alongside with the dependency upgrade.

### Design tokens

We are using design tokens to sync the values used in the code for any color or font.

We use a design token generator [plugin](https://www.figma.com/community/plugin/888356646278934516/Design-Tokens). This plugin exports all design tokens in a json file that we can then use with [Style Dictionary](https://amzn.github.io/style-dictionary/#/).

To update the `design-tokens.json` file (located under `mikado_reborn/tokens`), just generate a new one using the plugin on figma.

`Plugins` > `Design Tokens` > `Export Design Token File`

To generate the sass variables :

```sh
# if you don't have style-dictionary installed yet
yarn global add style-dictionary
cd packages/mikado_reborn/tokens
style-dictionary build
```

This should update `packages/mikado_reborn/src/assets/styles/settings/_tokens.scss`.

Once this file is updated, all is done if there is no addition.

If you have any colors or font added, you must modify the related partial sass files under the `packages/mikado_reborn/src/assets/styles/settings` directory (update `_fonts.scss`, `_variables.scss`, ...).

### Icons

The icons are relying on a font generated by icomoon service.

To update the icons, replace the `mikado.ttf` font file located under `mikado_reborn/src/assets/fonts` with the new one. Then, you need to update the icon classes unicodes with the newly generated file. In order to do this, you can copy-paste the lines of the `style.css` file issued by icomoon and drop these lines into `mikado-codes.css` file in the icon component directory.

Now, for documentation, you just need to update the `icons.js` file in the utils directory.

### Makefile commands :

You can access all our available make commands using `make help`.

```sh
# Install project dependencies
make install
# Start storybook dev server
make doc-start
# Build storybook doc
make doc-build
# Build library
make lib-build
# Update library design tokens with the design-tokens.json file
make lib-build-tokens
# Lint library
make lib-lint
# Creates everything needed for a new component development
make create-component [my-component-name]
# Publish a new release of the mikado library
make upgrade-mikado
```
