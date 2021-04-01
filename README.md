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