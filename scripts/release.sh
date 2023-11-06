#!/bin/sh

set -e

# Local Release Workflow
#
# 1. run typecheck
# 2. run tests
# 3. pack project
# 4. run postbuild typecheck
# 5. analyze types
# 6. print package size report
# 7. get release version data
# 8. create release chore commit
# 9. cleanup
#
# References:
#
# - https://git-scm.com/docs/git-commit
# - https://github.com/arethetypeswrong/arethetypeswrong.github.io
# - https://jqlang.github.io

yarn typecheck
yarn test:cov
yarn pack
yarn check:types:build
attw package.tgz
yarn pkg-size
RELEASE_VERSION=$(node ./dist/cli.mjs bump -j $@)
git commit --allow-empty -S -s -m "release(chore): $(jq .version -r <<<$RELEASE_VERSION)"
yarn clean:pack
