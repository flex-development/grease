# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [2.0.0](https://github.com/flex-development/grease/compare/grease@1.1.0...grease@2.0.0) (2021-09-19)


### ⚠ BREAKING CHANGES

* **typescript:** `IsSemVerOptionsConfigSatisfies` -> `IsSemVerOptionsSatisfies`
* **typescript:** `IsSemVerOptionsConfigCMP` -> `IsSemVerOptionsCMP`
* **typescript:** `IsSemVerOptionsConfigClean` -> `IsSemVerOptionsClean`

### :pencil2: Housekeeping

* add eslint base config ([8de32f3](https://github.com/flex-development/grease/commit/8de32f3e4dd32c7f1cea85c9943b7ec88a1d7153))
* refine commit scopes ([ae15022](https://github.com/flex-development/grease/commit/ae15022381725668a773ab09c5c38b784e7cd83d))
* run `yarn set version berry` ([f94a4e1](https://github.com/flex-development/grease/commit/f94a4e162dbc3de7038b1bdb79573e25427baa5d))
* **typescript:** add typings for `shell-quote@1.7.2` ([70156cb](https://github.com/flex-development/grease/commit/70156cb7751374830f5c74d5b3c9d9f58c4b3e6a))
* update environment variables ([3f55036](https://github.com/flex-development/grease/commit/3f55036bf343aa8a3079294d3ebb4158cb4068e4))
* use yarn workspace based commit scopes ([889322b](https://github.com/flex-development/grease/commit/889322b2d5224a58dbde522f81cc3177da981c86))


### :sparkles: Features

* `utils/getOptions` ([dd4c3a0](https://github.com/flex-development/grease/commit/dd4c3a0bd50ac4f31c1b9ce78bd9df57b7a63bec))
* **typescript:** add `CommitType` ([70393c6](https://github.com/flex-development/grease/commit/70393c67a860e16cbe04f374fd57dbb7a672ea17))


### :robot: Testing

* **grease:** update changelog fixtures ([aabe44f](https://github.com/flex-development/grease/commit/aabe44fca6f2bf24060724cda5548793b58b080e))
* **grease:** use `DTO` fixture in `IsPath` functional test ([5150d51](https://github.com/flex-development/grease/commit/5150d511e12fed11779c647ceb6e5d671f322e8e))
* use `OPTIONS` fixture in `cacheOptions` functional test ([b8c5c26](https://github.com/flex-development/grease/commit/b8c5c2662f2ee786945bc7c6f113212829c1f4ce))


### :recycle: Code Improvements

* `types` directory architecture ([990f9dd](https://github.com/flex-development/grease/commit/990f9dd9cdb277eea407b25d633531bafa1fa00f))
* **grease:** `CreateReleaseDTO#toString` ([0347d26](https://github.com/flex-development/grease/commit/0347d262a903f14692469da75974557dfced1f38))
* **grease:** integrate `@flex-development/log@2.0.0` ([787ac1d](https://github.com/flex-development/grease/commit/787ac1db313ca8ee3e0cab961aee2ab91b19531b))
* integrate `getOptions` into `main` ([d178829](https://github.com/flex-development/grease/commit/d17882988913b61abcb23d72e7b889b2f829e7b4))
* **typescript:** `IsSemVerOptionsConfigClean` -> `IsSemVerOptionsClean` ([b420f94](https://github.com/flex-development/grease/commit/b420f94efe3856e2454fba3b0a506fc75fe26434))
* **typescript:** `IsSemVerOptionsConfigCMP` -> `IsSemVerOptionsCMP` ([a99d89d](https://github.com/flex-development/grease/commit/a99d89de1eea744dad789bb295e72eba958e08bb))
* **typescript:** `IsSemVerOptionsConfigSatisfies` -> `IsSemVerOptionsSatisfies` ([3d2ddc9](https://github.com/flex-development/grease/commit/3d2ddc99d21b8a6073e9b2e9c8d2f516d89a3cf7))


### :hammer: Build

* **deps-dev:** add `@types/rimraf@3.0.2` ([0728879](https://github.com/flex-development/grease/commit/072887991b2c591fd719375987f31797ff6edf52))
* **deps-dev:** add `jest-extended@0.11.5` ([7268756](https://github.com/flex-development/grease/commit/726875681564692f1c65b4ff958dffeb47bba06d))
* **deps-dev:** add `rimraf@3.0.2` ([ec913bc](https://github.com/flex-development/grease/commit/ec913bc1d4583c0757965d6c27a987c9c4450916))
* **deps-dev:** drop `@types/yargs-unparser@2.0.1` ([e6adbfa](https://github.com/flex-development/grease/commit/e6adbfa7692dfdf0c4eae0b5085bbf6699e99c82))
* **deps-dev:** move `@types/lodash@4.14.172` to `devDependencies` ([4cebed3](https://github.com/flex-development/grease/commit/4cebed3e1c724fc848761b7e4a3226facf1d8737))
* **deps-dev:** move `@types/shelljs@0.8.9` to `devDependencies` ([283bc29](https://github.com/flex-development/grease/commit/283bc29413db865a35026d1c446c091525571e3b))
* **deps-dev:** use `@types/faker@5.5.8` ([ca4fb8e](https://github.com/flex-development/grease/commit/ca4fb8e7de0adfdaa3f0d3843898f1dcff7e3c90))
* **deps-dev:** use `@types/node@16.9.2` ([c0c1cd1](https://github.com/flex-development/grease/commit/c0c1cd1cabb25e8e21c662fcb1d839eb29eb582a))
* **deps-peer:** add `@types/node>=15` ([5ca3485](https://github.com/flex-development/grease/commit/5ca3485335012d0eb6660619a3e51456068bb8c0))
* **deps-peer:** add `@types/shelljs@0.8.9` ([60e82ea](https://github.com/flex-development/grease/commit/60e82ea33ea184c4751289cbdc449b0300e7f0fd))
* **deps:** add `@flex-development/log@2.0.0` ([1bc20c4](https://github.com/flex-development/grease/commit/1bc20c4f8701510ec604ece4ca5dce211296ec45))
* **deps:** add `shell-quote@1.7.2` ([6e72cd6](https://github.com/flex-development/grease/commit/6e72cd6782d057ef797d9b5d555edb702ed8828c))
* **deps:** use `isomorphic-git@1.10.0` ([3284bf4](https://github.com/flex-development/grease/commit/3284bf43ac5dd660374a629d1a872d56f74943dc))
* **deps:** use `lodash.*` deps ([4a9dc84](https://github.com/flex-development/grease/commit/4a9dc841d2e78259a1646da37904e91d368fcafb))
* run local integrity check ([0ab9086](https://github.com/flex-development/grease/commit/0ab9086048c10b77f041eb85819ee2a4c1cfddab))
* update build output ([3d97289](https://github.com/flex-development/grease/commit/3d972890cfa69e9f9622a54dc5371930d7079131))
* **yarn:** set `nmHoistingLimits` to `dependencies` ([bf7978f](https://github.com/flex-development/grease/commit/bf7978f06406a2c02f530a1eafe7f550722c70a7))

## [1.1.0](https://github.com/flex-development/grease/compare/grease@1.0.2...grease@1.1.0) (2021-08-26)


### :recycle: Code Improvements

* **typescript:** update `SemanticVersionUnstable` definition ([66538cb](https://github.com/flex-development/grease/commit/66538cb6ba9811da0f3f69843aa0d410416fb770))
* **typescript:** update `SemanticVersionTag` definition ([549bf6d](https://github.com/flex-development/grease/commit/549bf6d3c6b4a6a60645eb0180950c1f517340e5))
* **grease:** update `grease` options ([1c4c898](https://github.com/flex-development/grease/commit/1c4c8986e11470f2da069c6f0a42a29b948cae3b))


### :hammer: Build

* **grease:** install `@flex-development/dtag@1.0.0` ([17d4afd](https://github.com/flex-development/grease/commit/17d4afd9ebd9e8fe5c6f7d30d295ccc6ae25b616))


### :sparkles: Features

* **grease:** `utils/getPrerelease` ([541a880](https://github.com/flex-development/grease/commit/541a8804f72e13fb8be543d74e32a7bfe9045d34))
* **grease:** autodetect `prerelease` ([ea6c990](https://github.com/flex-development/grease/commit/ea6c990ba3b0098b705e01d00302440b9df7dab8))


### :truck: Continuous Integration & Deployment

* **workflows:** use `yarn workspace` command ([79f0edf](https://github.com/flex-development/grease/commit/79f0edfa22e3c5ed3606fe1c13e1f41e50fbb30a))


### :pencil2: Housekeeping

* **grease:** update package keywords ([8da62a3](https://github.com/flex-development/grease/commit/8da62a3a80c421c1998e1b8934c03f309cc90dd1))
* **scripts:** update `build` script ([005e1c1](https://github.com/flex-development/grease/commit/005e1c1932bda4df1b07cd3f21fb8a79a69f9635))

### [1.0.2](https://github.com/flex-development/grease/compare/grease@1.0.1...grease@1.0.2) (2021-08-23)


### :book: Documentation

* **grease:** update installation instructions ([32699c2](https://github.com/flex-development/grease/commit/32699c2a6bc05a06699c84bddb40f2b4fb191972))
* **grease:** update `package.json#homepage` ([6630524](https://github.com/flex-development/grease/commit/6630524c727da612482c1d2f0e152c44b3b1ee42))


### [1.0.1](https://github.com/flex-development/grease/compare/grease@1.0.0...grease@1.0.1) (2021-08-23)


### :pencil2: Housekeeping

* update release workflow ([3affb38](https://github.com/flex-development/grease/commit/3affb38bb20dd46d938c5ea8f4625ddf658d855e))


### :bug: Fixes

* **grease:** `CreateReleaseDTO#version` failure when `options.skip.tag` is `true` ([e8ede43](https://github.com/flex-development/grease/commit/e8ede4365c7194e3f73d05413fdcbc2fecd037b7))

## 1.0.0 (2021-08-15)


### :sparkles: Features

* **grease:** `GreaseOptions.gitdir` ([2e5894a](https://github.com/flex-development/grease/commit/2e5894a273d809a1f595a3e318f4e99656389f0c))
* **grease:** `GreaseOptions.verify` ([2b697aa](https://github.com/flex-development/grease/commit/2b697aada7bbb6c5f593f6ac2e32ee187b760700))
* **grease:** add `GreaseScripts.postrelease` ([105ec5b](https://github.com/flex-development/grease/commit/105ec5b5a95b545d4dae9a2e5accc00b95f1494c))
* **grease:** release branch whitelist ([fc61afa](https://github.com/flex-development/grease/commit/fc61afacf4cb74d6c5173d7c97a0a82174a7ef56))
* **grease:** validate release data during `greaser` lifecycle ([38bedbc](https://github.com/flex-development/grease/commit/38bedbcaca0c84812519b5c65a6f8f6802c7b50c))


### :bug: Fixes

* `commitlint.config` ([8e65403](https://github.com/flex-development/grease/commit/8e65403f2290ad6269d8f36d3df9599e85f7d070))
* eslint typescript project settings ([5d34043](https://github.com/flex-development/grease/commit/5d34043d3a286673246f67789301fa7fbb30d100))
* **grease:** `cannot read property 'options' of undefined` ([fbe5265](https://github.com/flex-development/grease/commit/fbe5265945f0ff1b986c1a05486f7a2a8014a6cc))
* **grease:** `CreateReleaseDTO validation failure: [files,version]` ([20abaf1](https://github.com/flex-development/grease/commit/20abaf1c01c3e9101d7831d1679aede152e8c4ae))
* **grease:** `CreateReleaseDTO validation failure: [version]` ([9cd322c](https://github.com/flex-development/grease/commit/9cd322c035c7e50e13b7d8a89c20d8cc21feaa8d))
* **grease:** `CreateReleaseDTO#toString` ([a1a6f86](https://github.com/flex-development/grease/commit/a1a6f863f8185dbcdcf2ab8fc26f546b0ed1c45d))
* **grease:** `CreateReleaseDTO#toString` ([4dfdbe4](https://github.com/flex-development/grease/commit/4dfdbe4ee1be6bf0bca4485ff66e341a5921abd0))
* **grease:** `CreateReleaseDTO#toString` ([622d9ac](https://github.com/flex-development/grease/commit/622d9aca2c5044ff3cfc9ed1141b660b1787be34))
* **grease:** `grease/main` runs `options.scripts.prerelease` twice ([4f90f0b](https://github.com/flex-development/grease/commit/4f90f0be1e348bf230ea34e1cc9a1191ece93fdc))
* **grease:** `grease/main` runs `options.scripts.prerelease` twice ([c6c9db0](https://github.com/flex-development/grease/commit/c6c9db0e4b44a1694dbb16327ad8451485c58d21))
* **grease:** `GreaseOptions.infile` decorator ([fd8aece](https://github.com/flex-development/grease/commit/fd8aeceda095c05708c4b62359b1c04ef1c1e7ef))
* **grease:** `IsTargetBranchConstraint.validate` ([0a82c6e](https://github.com/flex-development/grease/commit/0a82c6e296d933fe6aefc3067ea922c1e59a0b0a))
* **grease:** `package.json#types` ([a49eb3b](https://github.com/flex-development/grease/commit/a49eb3bdca948b6c659f1d8329da6e85410fd807))
* **grease:** `standard-version/lib/run-lifecycle-script` usage ([36daabb](https://github.com/flex-development/grease/commit/36daabbbd1318e3c8fc057c6e4e37c17dd6e102e))
* **grease:** `updaters_1.default is not a function` ([68ccc1f](https://github.com/flex-development/grease/commit/68ccc1fab3f2c5423b29fe452a7a26f6e44bf158))
* **grease:** add `GreaseScripts.postdepchecker` ([8b3b8f4](https://github.com/flex-development/grease/commit/8b3b8f49cc58fab46b6059a1b3c2c9928e7a1786))
* **grease:** release tagging ([91f560a](https://github.com/flex-development/grease/commit/91f560a5b00474f614831e451f069b04ebc495a1))
* **scripts:** `check:style` ([eff36a2](https://github.com/flex-development/grease/commit/eff36a28f58f0df47e7d743f673473870a252d02))
* **typescript:** `@zerollup/ts-transform-paths` usage ([3febb13](https://github.com/flex-development/grease/commit/3febb13dd383214d240f118839fc7d0052cd3098))


### :pencil2: Housekeeping

* `yarn set version 3.0.1` ([d3e9f8a](https://github.com/flex-development/grease/commit/d3e9f8ae00bdddd11f64849cfe9a20ec7bb872c0))
* add `publish:node` script ([3bbf8be](https://github.com/flex-development/grease/commit/3bbf8be104c85f30ee0674af96b252761a170018))
* add `scope:cache` label ([3d88b50](https://github.com/flex-development/grease/commit/3d88b50c95996d3b8794219b4ef2025645066fc5))
* **release:** allow users to download package from github ([796873b](https://github.com/flex-development/grease/commit/796873b1343c11eaabd68a7a7eeb50759ff56314))
* **scripts:** add release workflow script ([d15c166](https://github.com/flex-development/grease/commit/d15c166d75c60208b690e4d829c4d6065d2c62d3))
* **scripts:** update release workflow ([eb097c0](https://github.com/flex-development/grease/commit/eb097c0979a136892b6d2ac20d82c4ae5895be10))
* **scripts:** update release workflow ([78a4b6a](https://github.com/flex-development/grease/commit/78a4b6ab20dfd8f1f37fd87e1287370e97cc23c7))
* **grease:** add `prepublish` script ([92c75a1](https://github.com/flex-development/grease/commit/92c75a157935246168ac8314c722dd24bf60dcd5))
* **grease:** update `package.json#publishConfig` ([800d232](https://github.com/flex-development/grease/commit/800d2329212633c3974a9ec1b5bf33fda929fc34))
* P010-1 initial commit ([2f29aa3](https://github.com/flex-development/grease/commit/2f29aa3698cf31043389f43502b7423c2dd106af))
* P010-3 #done #time 15m ([25ac6a6](https://github.com/flex-development/grease/commit/25ac6a6bb0d0c7569c33200a614a03c523ed9f8c))
* replace `scope:grease-cli` with `scope:cli` ([1d609e9](https://github.com/flex-development/grease/commit/1d609e9ac2a411106a1eb425c683b257de71fc3e))
* replace `scope:grease` label with `scope:node` ([0e63fc7](https://github.com/flex-development/grease/commit/0e63fc7a1448d0d91dcee5243e8286feb119f5ff))
* run `yarn bootstrap` ([0bd0082](https://github.com/flex-development/grease/commit/0bd0082a6e9f7a664f7e76969422b00ae108d721))
* update publish config ([127aea5](https://github.com/flex-development/grease/commit/127aea5c5131f8b40042d4a10c4b07a79e7c3ea2))
