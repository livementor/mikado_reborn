install:
	yarn

doc-start:
	yarn workspace doc storybook

doc-build:
	yarn workspace doc build-storybook

lib-build:
	yarn workspace @livementor/mikado_reborn build

lib-build-tokens:
	yarn workspace @livementor/mikado_reborn build:tokens

lib-lint:
	yarn workspace @livementor/mikado_reborn lint

create-component:
	npm run create-component -- ${name}

upgrade-mikado:
	npm run upgrade:mikado

