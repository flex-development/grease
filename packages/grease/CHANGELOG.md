# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## 1.0.0 (2021-08-15)


### :sparkles: Features

* **node:** `GreaseOptions.gitdir` ([2e5894a](https://github.com/flex-development/grease/commit/2e5894a273d809a1f595a3e318f4e99656389f0c))
* **node:** `GreaseOptions.verify` ([2b697aa](https://github.com/flex-development/grease/commit/2b697aada7bbb6c5f593f6ac2e32ee187b760700))
* **node:** add `GreaseScripts.postrelease` ([105ec5b](https://github.com/flex-development/grease/commit/105ec5b5a95b545d4dae9a2e5accc00b95f1494c))
* **node:** release branch whitelist ([fc61afa](https://github.com/flex-development/grease/commit/fc61afacf4cb74d6c5173d7c97a0a82174a7ef56))
* **node:** validate release data during `greaser` lifecycle ([38bedbc](https://github.com/flex-development/grease/commit/38bedbcaca0c84812519b5c65a6f8f6802c7b50c))


### :bug: Fixes

* `commitlint.config` ([8e65403](https://github.com/flex-development/grease/commit/8e65403f2290ad6269d8f36d3df9599e85f7d070))
* eslint typescript project settings ([5d34043](https://github.com/flex-development/grease/commit/5d34043d3a286673246f67789301fa7fbb30d100))
* **node:** `cannot read property 'options' of undefined` ([fbe5265](https://github.com/flex-development/grease/commit/fbe5265945f0ff1b986c1a05486f7a2a8014a6cc))
* **node:** `CreateReleaseDTO validation failure: [files,version]` ([20abaf1](https://github.com/flex-development/grease/commit/20abaf1c01c3e9101d7831d1679aede152e8c4ae))
* **node:** `CreateReleaseDTO validation failure: [version]` ([9cd322c](https://github.com/flex-development/grease/commit/9cd322c035c7e50e13b7d8a89c20d8cc21feaa8d))
* **node:** `CreateReleaseDTO#toString` ([a1a6f86](https://github.com/flex-development/grease/commit/a1a6f863f8185dbcdcf2ab8fc26f546b0ed1c45d))
* **node:** `CreateReleaseDTO#toString` ([4dfdbe4](https://github.com/flex-development/grease/commit/4dfdbe4ee1be6bf0bca4485ff66e341a5921abd0))
* **node:** `CreateReleaseDTO#toString` ([622d9ac](https://github.com/flex-development/grease/commit/622d9aca2c5044ff3cfc9ed1141b660b1787be34))
* **node:** `grease/main` runs `options.scripts.prerelease` twice ([4f90f0b](https://github.com/flex-development/grease/commit/4f90f0be1e348bf230ea34e1cc9a1191ece93fdc))
* **node:** `grease/main` runs `options.scripts.prerelease` twice ([c6c9db0](https://github.com/flex-development/grease/commit/c6c9db0e4b44a1694dbb16327ad8451485c58d21))
* **node:** `GreaseOptions.infile` decorator ([fd8aece](https://github.com/flex-development/grease/commit/fd8aeceda095c05708c4b62359b1c04ef1c1e7ef))
* **node:** `IsTargetBranchConstraint.validate` ([0a82c6e](https://github.com/flex-development/grease/commit/0a82c6e296d933fe6aefc3067ea922c1e59a0b0a))
* **node:** `package.json#types` ([a49eb3b](https://github.com/flex-development/grease/commit/a49eb3bdca948b6c659f1d8329da6e85410fd807))
* **node:** `standard-version/lib/run-lifecycle-script` usage ([36daabb](https://github.com/flex-development/grease/commit/36daabbbd1318e3c8fc057c6e4e37c17dd6e102e))
* **node:** `updaters_1.default is not a function` ([68ccc1f](https://github.com/flex-development/grease/commit/68ccc1fab3f2c5423b29fe452a7a26f6e44bf158))
* **node:** add `GreaseScripts.postdepchecker` ([8b3b8f4](https://github.com/flex-development/grease/commit/8b3b8f49cc58fab46b6059a1b3c2c9928e7a1786))
* **node:** release tagging ([91f560a](https://github.com/flex-development/grease/commit/91f560a5b00474f614831e451f069b04ebc495a1))
* **scripts:** `check:style` ([eff36a2](https://github.com/flex-development/grease/commit/eff36a28f58f0df47e7d743f673473870a252d02))
* **typescript:** `@zerollup/ts-transform-paths` usage ([3febb13](https://github.com/flex-development/grease/commit/3febb13dd383214d240f118839fc7d0052cd3098))


### :pencil2: Housekeeping

* `yarn set version 3.0.1` ([d3e9f8a](https://github.com/flex-development/grease/commit/d3e9f8ae00bdddd11f64849cfe9a20ec7bb872c0))
* add `publish:node` script ([3bbf8be](https://github.com/flex-development/grease/commit/3bbf8be104c85f30ee0674af96b252761a170018))
* add `scope:cache` label ([3d88b50](https://github.com/flex-development/grease/commit/3d88b50c95996d3b8794219b4ef2025645066fc5))
* **node-release:** allow users to download package from github ([796873b](https://github.com/flex-development/grease/commit/796873b1343c11eaabd68a7a7eeb50759ff56314))
* **node-scripts:** add release workflow script ([d15c166](https://github.com/flex-development/grease/commit/d15c166d75c60208b690e4d829c4d6065d2c62d3))
* **node-scripts:** update release workflow ([eb097c0](https://github.com/flex-development/grease/commit/eb097c0979a136892b6d2ac20d82c4ae5895be10))
* **node-scripts:** update release workflow ([78a4b6a](https://github.com/flex-development/grease/commit/78a4b6ab20dfd8f1f37fd87e1287370e97cc23c7))
* **node:** add `prepublish` script ([92c75a1](https://github.com/flex-development/grease/commit/92c75a157935246168ac8314c722dd24bf60dcd5))
* **node:** update `package.json#publishConfig` ([800d232](https://github.com/flex-development/grease/commit/800d2329212633c3974a9ec1b5bf33fda929fc34))
* P010-1 initial commit ([2f29aa3](https://github.com/flex-development/grease/commit/2f29aa3698cf31043389f43502b7423c2dd106af))
* P010-3 #done #time 15m ([25ac6a6](https://github.com/flex-development/grease/commit/25ac6a6bb0d0c7569c33200a614a03c523ed9f8c))
* replace `scope:grease-cli` with `scope:cli` ([1d609e9](https://github.com/flex-development/grease/commit/1d609e9ac2a411106a1eb425c683b257de71fc3e))
* replace `scope:grease` label with `scope:node` ([0e63fc7](https://github.com/flex-development/grease/commit/0e63fc7a1448d0d91dcee5243e8286feb119f5ff))
* run `yarn bootstrap` ([0bd0082](https://github.com/flex-development/grease/commit/0bd0082a6e9f7a664f7e76969422b00ae108d721))
* update publish config ([127aea5](https://github.com/flex-development/grease/commit/127aea5c5131f8b40042d4a10c4b07a79e7c3ea2))
