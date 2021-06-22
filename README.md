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

If you added a font, you can create a class for that font if you want to make it accessible: `packages/mikado_reborn/src/assets/styles/fonts.scss`
