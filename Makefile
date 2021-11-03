install: ## Install project dependencies
	yarn

doc-start: ## Start storybook dev server
	yarn workspace doc storybook

doc-build: ## Build storybook doc
	yarn workspace doc build-storybook

lib-build: ## Build library
	yarn workspace @livementor/mikado_reborn build

lib-build-tokens: ## Update library design tokens with the design-tokens.json file
	yarn workspace @livementor/mikado_reborn build:tokens

lib-lint: ## Lint library
	yarn workspace @livementor/mikado_reborn lint

create-component:  ## Creates everything needed for a new component development
	npm run create-component -- ${name}

upgrade-mikado:  ## Publish a new release of the mikado library
	npm run upgrade:mikado

# Help command from https://gist.github.com/prwhite/8168133#gistcomment-3624253 - Author: https://gist.github.com/theherk
help:
	@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make \033[36m\033[0m\n"} /^[$$()% a-zA-Z_-]+:.*?##/ { printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2 } /^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) } ' $(MAKEFILE_LIST)
