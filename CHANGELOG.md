## [grease@3.0.0-alpha.1](https://github.com/flex-development/grease/compare/grease@2.0.0...grease@3.0.0-alpha.1) (2023-10-20)

### ⚠ BREAKING CHANGES

- **nvm:** require `>=18.18.2 <20.6.0 || >20.6.0`
- init project rewrite

### :package: Build

- [[`40f0434`](https://github.com/flex-development/grease/commit/40f0434ac3d624a322162118c9318b92b30fa59a)] **deps-dev:** bump @arethetypeswrong/cli from 0.10.1 to 0.10.2 ([#103](https://github.com/flex-development/grease/issues/103))
- [[`29565d5`](https://github.com/flex-development/grease/commit/29565d57ad643c2594115f895c4587cc0be0a55e)] **deps-dev:** bump @arethetypeswrong/cli from 0.10.2 to 0.11.0 ([#125](https://github.com/flex-development/grease/issues/125))
- [[`e49314c`](https://github.com/flex-development/grease/commit/e49314c5f4d8696ca8aeee1cc0700c83bed00291)] **deps-dev:** bump @arethetypeswrong/cli from 0.11.0 to 0.12.1 ([#140](https://github.com/flex-development/grease/issues/140))
- [[`cdf094b`](https://github.com/flex-development/grease/commit/cdf094b9ecef8ad2e669bcdca3ac68e478de89dc)] **deps-dev:** bump @arethetypeswrong/cli from 0.12.1 to 0.12.2 ([#146](https://github.com/flex-development/grease/issues/146))
- [[`016d957`](https://github.com/flex-development/grease/commit/016d9578e634c7efe3f31ddb24bc040352c70206)] **deps-dev:** bump @arethetypeswrong/cli from 0.9.0 to 0.10.1 ([#89](https://github.com/flex-development/grease/issues/89))
- [[`5d9fcb4`](https://github.com/flex-development/grease/commit/5d9fcb406a69933e6da202012646c3b03cdb5384)] **deps-dev:** bump @faker-js/faker from 8.0.2 to 8.1.0 ([#115](https://github.com/flex-development/grease/issues/115))
- [[`eddec77`](https://github.com/flex-development/grease/commit/eddec77479cf19e5e50debf1def66e6815e75991)] **deps-dev:** bump @faker-js/faker from 8.1.0 to 8.2.0 ([#148](https://github.com/flex-development/grease/issues/148))
- [[`7a32453`](https://github.com/flex-development/grease/commit/7a32453742ae83b32d58828b9aefe56f423babf1)] **deps-dev:** bump @swc/core from 1.3.81 to 1.3.82 ([#82](https://github.com/flex-development/grease/issues/82))
- [[`4ec551c`](https://github.com/flex-development/grease/commit/4ec551c367e5ab8aaa0859e162ee70b6fe2bd330)] **deps-dev:** bump cspell from 7.2.0 to 7.3.2 ([#84](https://github.com/flex-development/grease/issues/84))
- [[`7e60047`](https://github.com/flex-development/grease/commit/7e60047a0e6cceac59c0fc358eaf8cb8f2e1ca47)] **deps-dev:** bump cspell from 7.3.2 to 7.3.5 ([#106](https://github.com/flex-development/grease/issues/106))
- [[`c430ef8`](https://github.com/flex-development/grease/commit/c430ef87820184460ac4ca94d73a49aed2baa2cc)] **deps-dev:** bump cspell from 7.3.5 to 7.3.6 ([#107](https://github.com/flex-development/grease/issues/107))
- [[`062ae1a`](https://github.com/flex-development/grease/commit/062ae1a5da50866bb62eb640ef2c53c525b19367)] **deps-dev:** bump cspell from 7.3.6 to 7.3.7 ([#129](https://github.com/flex-development/grease/issues/129))
- [[`650af9a`](https://github.com/flex-development/grease/commit/650af9a7a9c97888c3312682345daba0d8f0596a)] **deps-dev:** bump cspell from 7.3.7 to 7.3.8 ([#149](https://github.com/flex-development/grease/issues/149))
- [[`a92d2a6`](https://github.com/flex-development/grease/commit/a92d2a661abca61208dc358443d9dc3ff6ec70cb)] **deps-dev:** bump dprint from 0.40.2 to 0.41.0 ([#105](https://github.com/flex-development/grease/issues/105))
- [[`4d2a43e`](https://github.com/flex-development/grease/commit/4d2a43ee68ddada446795dbb86f2e273b964d9c0)] **deps-dev:** bump esbuild from 0.19.2 to 0.19.3 ([#110](https://github.com/flex-development/grease/issues/110))
- [[`b2bc507`](https://github.com/flex-development/grease/commit/b2bc507cd6d78273863861a86a27404d98534eca)] **deps-dev:** bump esbuild from 0.19.3 to 0.19.4 ([#128](https://github.com/flex-development/grease/issues/128))
- [[`821f801`](https://github.com/flex-development/grease/commit/821f8019df0fadcf084ccaef358bea4f94cad38c)] **deps-dev:** bump eslint-import-resolver-typescript from 3.6.0 to 3.6.1 ([#120](https://github.com/flex-development/grease/issues/120))
- [[`0845f72`](https://github.com/flex-development/grease/commit/0845f7256458f205338d4a2d8bb7b2a695024abf)] **deps-dev:** bump eslint-plugin-import from 2.27.5 to 2.28.1 ([#83](https://github.com/flex-development/grease/issues/83))
- [[`7a97a68`](https://github.com/flex-development/grease/commit/7a97a6837001f8a628c2e7948cb0ffeb1ef165dd)] **deps-dev:** bump eslint-plugin-jsonc from 2.9.0 to 2.10.0 ([#139](https://github.com/flex-development/grease/issues/139))
- [[`65e6e72`](https://github.com/flex-development/grease/commit/65e6e72a3582a1c41e23e35d381ae1ab6216b94e)] **deps-dev:** bump eslint-plugin-yml from 1.8.0 to 1.9.0 ([#104](https://github.com/flex-development/grease/issues/104))
- [[`59ce85b`](https://github.com/flex-development/grease/commit/59ce85b41c23c6594af353909d45b33d76b918fa)] **deps-dev:** bump eslint-plugin-yml from 1.9.0 to 1.10.0 ([#138](https://github.com/flex-development/grease/issues/138))
- [[`c4c2a15`](https://github.com/flex-development/grease/commit/c4c2a158d0b19a69bd304a2c29fe1706fbea2ed8)] **deps-dev:** bump lint-staged from 14.0.1 to 15.0.1 ([#147](https://github.com/flex-development/grease/issues/147))
- [[`8144b11`](https://github.com/flex-development/grease/commit/8144b11053bcc3c64e3b1c4554879e2381c8ac35)] **deps-dev:** bump lint-staged from 15.0.1 to 15.0.2 ([#155](https://github.com/flex-development/grease/issues/155))
- [[`67baae5`](https://github.com/flex-development/grease/commit/67baae5aa99efc871ce140925b36853497633f03)] **deps-dev:** bump the commitlint group with 1 update ([#130](https://github.com/flex-development/grease/issues/130))
- [[`b4f2727`](https://github.com/flex-development/grease/commit/b4f27275fc6b8e25b976af89f853f573fccb836b)] **deps-dev:** bump the commitlint group with 1 update ([#145](https://github.com/flex-development/grease/issues/145))
- [[`61cdc46`](https://github.com/flex-development/grease/commit/61cdc467b9a50bf9c71ab5bfa291b09a1b89f751)] **deps-dev:** bump the eslint group with 1 update ([#121](https://github.com/flex-development/grease/issues/121))
- [[`b2b96b0`](https://github.com/flex-development/grease/commit/b2b96b0460142d17a7b1be08110d6ec4f34cdf8c)] **deps-dev:** bump the eslint group with 1 update ([#137](https://github.com/flex-development/grease/issues/137))
- [[`9340204`](https://github.com/flex-development/grease/commit/9340204594cf47f8839ff2c39292dbfbd5edd2fd)] **deps-dev:** bump the eslint group with 1 update ([#96](https://github.com/flex-development/grease/issues/96))
- [[`28d7526`](https://github.com/flex-development/grease/commit/28d75265f6453aa7e2b137fe6042c18328a26868)] **deps-dev:** bump the flex-development group with 1 update ([#97](https://github.com/flex-development/grease/issues/97))
- [[`a05d3b5`](https://github.com/flex-development/grease/commit/a05d3b54ce1b02f4ab318b74ef364c6b89dd529d)] **deps-dev:** bump the nestjs group with 2 updates ([#118](https://github.com/flex-development/grease/issues/118))
- [[`ceda859`](https://github.com/flex-development/grease/commit/ceda859f7483e56d599c1dae4e6fe75801040623)] **deps-dev:** bump the nestjs group with 2 updates ([#135](https://github.com/flex-development/grease/issues/135))
- [[`c8f387d`](https://github.com/flex-development/grease/commit/c8f387dd1b4954afe1f6d00b8e50194117cade46)] **deps-dev:** bump the nestjs group with 2 updates ([#98](https://github.com/flex-development/grease/issues/98))
- [[`b32e5f7`](https://github.com/flex-development/grease/commit/b32e5f7e25097891490d6906e0dfec061d5daed5)] **deps-dev:** bump the nestjs group with 3 updates ([#80](https://github.com/flex-development/grease/issues/80))
- [[`1a55024`](https://github.com/flex-development/grease/commit/1a550245876cbab358fdb58b59bcdce97e31d94e)] **deps-dev:** bump the typescript-eslint group with 2 updates ([#102](https://github.com/flex-development/grease/issues/102))
- [[`47cc069`](https://github.com/flex-development/grease/commit/47cc06941e0ecaac0a5f9e22a8e7862fa5b48e4d)] **deps-dev:** bump the typescript-eslint group with 2 updates ([#114](https://github.com/flex-development/grease/issues/114))
- [[`b13e749`](https://github.com/flex-development/grease/commit/b13e749e57ad59d9b9af153f6669de9d7d8a985d)] **deps-dev:** bump the typescript-eslint group with 2 updates ([#124](https://github.com/flex-development/grease/issues/124))
- [[`0759efe`](https://github.com/flex-development/grease/commit/0759efe0732d29e9253df58e8defdd8258cef5ec)] **deps-dev:** bump the typescript-eslint group with 2 updates ([#132](https://github.com/flex-development/grease/issues/132))
- [[`724c04c`](https://github.com/flex-development/grease/commit/724c04c346ad59e0a705f27f825076148bbb4c8e)] **deps-dev:** bump the typescript-eslint group with 2 updates ([#141](https://github.com/flex-development/grease/issues/141))
- [[`f235d7d`](https://github.com/flex-development/grease/commit/f235d7d2d0caff8c0e3fa4cc6106420efe4d62ec)] **deps-dev:** bump the typescript-eslint group with 2 updates ([#150](https://github.com/flex-development/grease/issues/150))
- [[`64a19f0`](https://github.com/flex-development/grease/commit/64a19f04b963ccddd534d00d2aa473ff74cdf8d4)] **deps-dev:** bump the typescript-eslint group with 2 updates ([#87](https://github.com/flex-development/grease/issues/87))
- [[`121e06f`](https://github.com/flex-development/grease/commit/121e06f262dc9162fc2080b3d7dbb53dffd33efc)] **deps-dev:** bump the vitest group with 3 updates ([#116](https://github.com/flex-development/grease/issues/116))
- [[`7f6d596`](https://github.com/flex-development/grease/commit/7f6d596865ed9de5d1b5556d3fb912e488a6bec6)] **deps-dev:** bump the vitest group with 3 updates ([#131](https://github.com/flex-development/grease/issues/131))
- [[`3ec3b86`](https://github.com/flex-development/grease/commit/3ec3b86d2b05de02660c48a8382af2e70f5cfcaf)] **deps-dev:** bump vite from 5.0.0-beta.1 to 5.0.0-beta.2 ([#113](https://github.com/flex-development/grease/issues/113))
- [[`2abaf4c`](https://github.com/flex-development/grease/commit/2abaf4c487594bce38dd2eea5dd56ae4fe1d1fe1)] **deps-dev:** bump vite from 5.0.0-beta.10 to 5.0.0-beta.11 ([#156](https://github.com/flex-development/grease/issues/156))
- [[`8a9f2ad`](https://github.com/flex-development/grease/commit/8a9f2adbb8bfb10ef8500a818240996916664fc2)] **deps-dev:** bump vite from 5.0.0-beta.2 to 5.0.0-beta.3 ([#122](https://github.com/flex-development/grease/issues/122))
- [[`161cc73`](https://github.com/flex-development/grease/commit/161cc7365a2a61cd714516036f4381a0661e92ee)] **deps-dev:** bump vite from 5.0.0-beta.3 to 5.0.0-beta.4 ([#133](https://github.com/flex-development/grease/issues/133))
- [[`a240b44`](https://github.com/flex-development/grease/commit/a240b4422d1da93c36124bc3d82781af926d36bb)] **deps-dev:** bump vite from 5.0.0-beta.4 to 5.0.0-beta.5 ([#142](https://github.com/flex-development/grease/issues/142))
- [[`1ef3e44`](https://github.com/flex-development/grease/commit/1ef3e448ef8439d84dd5707d6cee4ce46f0f4fbc)] **deps-dev:** bump vite from 5.0.0-beta.5 to 5.0.0-beta.6 ([#143](https://github.com/flex-development/grease/issues/143))
- [[`d1629b9`](https://github.com/flex-development/grease/commit/d1629b91dc324df05470f30016d293157eccebaf)] **deps-dev:** bump vite from 5.0.0-beta.6 to 5.0.0-beta.7 ([#144](https://github.com/flex-development/grease/issues/144))
- [[`0b5b6ac`](https://github.com/flex-development/grease/commit/0b5b6ac32e07864c3efb12ab8d1ec078fc8ab624)] **deps-dev:** bump vite from 5.0.0-beta.7 to 5.0.0-beta.8 ([#152](https://github.com/flex-development/grease/issues/152))
- [[`a90c715`](https://github.com/flex-development/grease/commit/a90c715cba4a18baccca6a519202472d0fde476e)] **deps-dev:** bump vite from 5.0.0-beta.8 to 5.0.0-beta.10 ([#153](https://github.com/flex-development/grease/issues/153))
- [[`c7601b5`](https://github.com/flex-development/grease/commit/c7601b57c47120e416a75989686032177ca82b80)] **deps-dev:** downgrade eslint-plugin-import from 2.28.1 to 2.27.5
- [[`81ec976`](https://github.com/flex-development/grease/commit/81ec976436527650a0cf9d69d7c0aad44373240f)] **deps:** bump cosmiconfig from 8.2.0 to 8.3.3 ([#85](https://github.com/flex-development/grease/issues/85))
- [[`eb7f8f8`](https://github.com/flex-development/grease/commit/eb7f8f8ec33f8b262a0f42b6b6e6bc85ae539180)] **deps:** bump get-func-name from 2.0.0 to 2.0.2 ([#126](https://github.com/flex-development/grease/issues/126))
- [[`b8b0ae8`](https://github.com/flex-development/grease/commit/b8b0ae818cea97b838fa2d53b7f1127eae957042)] **deps:** bump postcss from 8.4.30 to 8.4.31 ([#134](https://github.com/flex-development/grease/issues/134))
- [[`8a05850`](https://github.com/flex-development/grease/commit/8a0585023e4ff91c49abd4e09a685abcf82428cc)] **deps:** bump the dependencies group with 1 update ([#119](https://github.com/flex-development/grease/issues/119))
- [[`cc6b5ae`](https://github.com/flex-development/grease/commit/cc6b5ae09dfa2eefee267a85ee5d79f9b09f8284)] **deps:** bump the dependencies group with 1 update ([#127](https://github.com/flex-development/grease/issues/127))
- [[`bba51ea`](https://github.com/flex-development/grease/commit/bba51ea86679764a3663c60d6095c111b8ed4b47)] **deps:** bump the dependencies group with 1 update ([#136](https://github.com/flex-development/grease/issues/136))
- [[`4ff7b36`](https://github.com/flex-development/grease/commit/4ff7b36c124bbc75bcd64a035b4c2427b03cc67a)] **deps:** bump the dependencies group with 1 update ([#151](https://github.com/flex-development/grease/issues/151))
- [[`83ec01c`](https://github.com/flex-development/grease/commit/83ec01c2d02ce0d24064486f55b90b30db36a858)] **deps:** bump the dependencies group with 1 update ([#93](https://github.com/flex-development/grease/issues/93))
- [[`5c4a27c`](https://github.com/flex-development/grease/commit/5c4a27c9c5d31044539b92e7be6126e9f8a71591)] **deps:** bump the dependencies group with 2 updates ([#108](https://github.com/flex-development/grease/issues/108))
- [[`dbb2db4`](https://github.com/flex-development/grease/commit/dbb2db432d63d285c2d8fe0b02cab7e2b3b6d429)] **deps:** bump the dependencies group with 2 updates ([#99](https://github.com/flex-development/grease/issues/99))
- [[`642cc9f`](https://github.com/flex-development/grease/commit/642cc9ff17d09377be502e6992e4506d28df126d)] **nvm:** require `>=18.18.2 <20.6.0 || >20.6.0`

### :robot: Continuous Integration

- [[`ae99e7e`](https://github.com/flex-development/grease/commit/ae99e7e800dcbef9e7b5720493e073e7dc7827ab)] [[@dependabot](https://github.com/dependabot)] ignore eslint-plugin-import
- [[`b1f2493`](https://github.com/flex-development/grease/commit/b1f24935e18038b587fa4f9c8267d7a253e2e2b1)] add codecov status checks
- [[`ad14c65`](https://github.com/flex-development/grease/commit/ad14c65fc9e59ac13cdd7edf68357641a84a77f2)] **deps:** bump actions/cache from 3.3.1 to 3.3.2 ([#95](https://github.com/flex-development/grease/issues/95))
- [[`3885804`](https://github.com/flex-development/grease/commit/388580481e9494c972391ec29f15891e8c733384)] **deps:** bump actions/checkout from 3.6.0 to 4.0.0 ([#86](https://github.com/flex-development/grease/issues/86))
- [[`dc05906`](https://github.com/flex-development/grease/commit/dc05906fde3609c0d54860ed16595540dce04c06)] **deps:** bump actions/checkout from 4.0.0 to 4.1.0 ([#123](https://github.com/flex-development/grease/issues/123))
- [[`f98bc04`](https://github.com/flex-development/grease/commit/f98bc048cef0b4ef5fb350a91274a7522b55ad32)] **deps:** bump actions/checkout from 4.1.0 to 4.1.1 ([#154](https://github.com/flex-development/grease/issues/154))
- [[`999a933`](https://github.com/flex-development/grease/commit/999a933c474073a78a3add905369ea49392465e1)] **deps:** bump actions/upload-artifact from 3.1.2 to 3.1.3 ([#92](https://github.com/flex-development/grease/issues/92))
- [[`e8afc66`](https://github.com/flex-development/grease/commit/e8afc66f57614b609348eb0cc66d0432f2aa35a2)] **deps:** bump crazy-max/ghaction-import-gpg from 5.3.0 to 6.0.0 ([#101](https://github.com/flex-development/grease/issues/101))
- [[`d9f40c1`](https://github.com/flex-development/grease/commit/d9f40c1988cab35af8ef94affc00bc965fee502a)] **workflows:** [`ci`] add `changelog` job
- [[`f791c67`](https://github.com/flex-development/grease/commit/f791c67adfdc543e978a86a74cb95038af047ed4)] **workflows:** [`release-branch`] add `pr` job
- [[`d2dd4bd`](https://github.com/flex-development/grease/commit/d2dd4bdd1985348f60b0c523a1784280b83db04c)] **workflows:** [`release-branch`] fix pr assignee syntax
- [[`a8c4e54`](https://github.com/flex-development/grease/commit/a8c4e545c866c953581a289cc3b690d9a074ad7c)] **workflows:** [`release`] cleanup `publish` job
- [[`3dab080`](https://github.com/flex-development/grease/commit/3dab080daddaaa4795dc96afa4019742631f86c6)] **workflows:** [`release`] set trust on gpg key via action input
- [[`3e64a58`](https://github.com/flex-development/grease/commit/3e64a585fcd502431da2c8bd579f908f5c9b1209)] **workflows:** [`release`] use `secrets.PAT_REPO`
- [[`28319fb`](https://github.com/flex-development/grease/commit/28319fb614bc96282c23a794ec8e4955b88c3c30)] **workflows:** add `git`
- [[`d1e4261`](https://github.com/flex-development/grease/commit/d1e426100440a0492e26a3c21f8022ec8d888ec6)] **workflows:** add `release-branch`

### :pencil: Documentation

- [[`e34f5b7`](https://github.com/flex-development/grease/commit/e34f5b78df51e84a2675d6bfb0301d479ae79d7d)] update deployment guide

### :sparkles: Features

- [[`bb00e5f`](https://github.com/flex-development/grease/commit/bb00e5f9c9840aab75bf60a208c4730a3c492bf0)] **bump:** recommended version bump
- [[`8db3a7e`](https://github.com/flex-development/grease/commit/8db3a7e0bced6ab5156416d8881eb5b8eb619dbe)] **changelog:** changelog generation
- [[`513512f`](https://github.com/flex-development/grease/commit/513512f8c1cabc71d1961436f084378fda8a8e79)] **cli:** [`InfoCommand`] `--pm`
- [[`3c5e309`](https://github.com/flex-development/grease/commit/3c5e30936833b083a625fa975ecd888cb2c1d006)] **cli:** [`InfoCommand`] `--yaml`
- [[`094f1b2`](https://github.com/flex-development/grease/commit/094f1b2d3c28556225d4cb9265ad7a032115e21f)] **cli:** `BumpCommand`
- [[`781362a`](https://github.com/flex-development/grease/commit/781362a84dd66f2300ba9be4c4443e8d5378b504)] **cli:** `ChangelogCommand`
- [[`9cc8383`](https://github.com/flex-development/grease/commit/9cc838360d27b660d6897ca8d19d2ec708242dc5)] **cli:** `InfoCommand`
- [[`067c93c`](https://github.com/flex-development/grease/commit/067c93cc68575a652d8609585bd64478c38dccfe)] **cli:** `TagCommand`
- [[`749179f`](https://github.com/flex-development/grease/commit/749179fe39c28de672fa03dacc23734af3e6fcc4)] **cli:** json output
- [[`d7ba51d`](https://github.com/flex-development/grease/commit/d7ba51dbfc57ed4225ae293ada253682cab3e956)] **config:** `ConfigService`
- [[`47d4d7d`](https://github.com/flex-development/grease/commit/47d4d7df5fc91193a28a3d2b5904663a2890a0d0)] **decorators:** `IsManifestId`, `IsReleaseVersion`
- [[`208898c`](https://github.com/flex-development/grease/commit/208898c9102c2ab64cf167ed4a391264a5a78ba2)] **decorators:** `IsNilable`, `IsNullable`, `IsOptional`
- [[`f84503e`](https://github.com/flex-development/grease/commit/f84503e79f349ab6852de58c93eb6b8d1f7593e8)] **git:** create tags
- [[`fecff4a`](https://github.com/flex-development/grease/commit/fecff4a0308c027764350b22fb22fd3370d4c61f)] **models:** `Commit`
- [[`812e10c`](https://github.com/flex-development/grease/commit/812e10c3a5054733373baeeca6a9134a89a478a8)] **models:** `Version`
- [[`17c153f`](https://github.com/flex-development/grease/commit/17c153f409200d10e6e40f66826740c16208e63e)] **providers:** `BumpService`
- [[`b61cac0`](https://github.com/flex-development/grease/commit/b61cac0a01f3d6d78e05b410bb4008842ffe16c4)] **providers:** `GitService`
- [[`bfb3642`](https://github.com/flex-development/grease/commit/bfb364275b741d4892afcc438a7761b46115f34b)] **providers:** `PackageService`
- [[`3b83e65`](https://github.com/flex-development/grease/commit/3b83e65d8f4790756dcf8fb101b42f85e836b13e)] **providers:** `ValidationService`

### :house_with_garden: Housekeeping

- [[`2e9d40f`](https://github.com/flex-development/grease/commit/2e9d40f4f584f6c4cb47eb366506698bae9a9fb3)] [dprint] update config
- [[`8e7c5aa`](https://github.com/flex-development/grease/commit/8e7c5aad7991c6376e6260f0dc43eeb0fcc062c7)] **pkg:** update package info
- [[`cca3204`](https://github.com/flex-development/grease/commit/cca3204f9a72c3b7bc7b6068a2c73d3c74b443ea)] **scripts:** [`release`] fix branching logic
- [[`9580017`](https://github.com/flex-development/grease/commit/9580017d4e084e13c0f510330b61a07c827425ed)] **scripts:** remove `typecheck-build`
- [[`668b2e3`](https://github.com/flex-development/grease/commit/668b2e3745e29b5f5b7b62ff56959b5d1c489528)] **tests:** [codecov] configure components

### :mechanical_arm: Refactors

- [[`0390249`](https://github.com/flex-development/grease/commit/03902492c39df7c299b731072480494f5527b75a)] cqrs integration
- [[`455c149`](https://github.com/flex-development/grease/commit/455c1497e3ed5019ab0ebd234509703dadba206a)] init project rewrite
- [[`8d2859b`](https://github.com/flex-development/grease/commit/8d2859b17e5519dceadd8db5680de706ac41d740)] **log:** add subdomain

## [grease@3.0.0-alpha.1](https://github.com/flex-development/grease/compare/grease@2.0.0...grease@3.0.0-alpha.1) (2023-10-20)

### ⚠ BREAKING CHANGES

- **nvm:** require `>=18.18.2 <20.6.0 || >20.6.0`
- init project rewrite

### :package: Build

- [[`40f0434`](https://github.com/flex-development/grease/commit/40f0434ac3d624a322162118c9318b92b30fa59a)] **deps-dev:** bump @arethetypeswrong/cli from 0.10.1 to 0.10.2 ([#103](https://github.com/flex-development/grease/issues/103))
- [[`29565d5`](https://github.com/flex-development/grease/commit/29565d57ad643c2594115f895c4587cc0be0a55e)] **deps-dev:** bump @arethetypeswrong/cli from 0.10.2 to 0.11.0 ([#125](https://github.com/flex-development/grease/issues/125))
- [[`e49314c`](https://github.com/flex-development/grease/commit/e49314c5f4d8696ca8aeee1cc0700c83bed00291)] **deps-dev:** bump @arethetypeswrong/cli from 0.11.0 to 0.12.1 ([#140](https://github.com/flex-development/grease/issues/140))
- [[`cdf094b`](https://github.com/flex-development/grease/commit/cdf094b9ecef8ad2e669bcdca3ac68e478de89dc)] **deps-dev:** bump @arethetypeswrong/cli from 0.12.1 to 0.12.2 ([#146](https://github.com/flex-development/grease/issues/146))
- [[`016d957`](https://github.com/flex-development/grease/commit/016d9578e634c7efe3f31ddb24bc040352c70206)] **deps-dev:** bump @arethetypeswrong/cli from 0.9.0 to 0.10.1 ([#89](https://github.com/flex-development/grease/issues/89))
- [[`5d9fcb4`](https://github.com/flex-development/grease/commit/5d9fcb406a69933e6da202012646c3b03cdb5384)] **deps-dev:** bump @faker-js/faker from 8.0.2 to 8.1.0 ([#115](https://github.com/flex-development/grease/issues/115))
- [[`eddec77`](https://github.com/flex-development/grease/commit/eddec77479cf19e5e50debf1def66e6815e75991)] **deps-dev:** bump @faker-js/faker from 8.1.0 to 8.2.0 ([#148](https://github.com/flex-development/grease/issues/148))
- [[`7a32453`](https://github.com/flex-development/grease/commit/7a32453742ae83b32d58828b9aefe56f423babf1)] **deps-dev:** bump @swc/core from 1.3.81 to 1.3.82 ([#82](https://github.com/flex-development/grease/issues/82))
- [[`4ec551c`](https://github.com/flex-development/grease/commit/4ec551c367e5ab8aaa0859e162ee70b6fe2bd330)] **deps-dev:** bump cspell from 7.2.0 to 7.3.2 ([#84](https://github.com/flex-development/grease/issues/84))
- [[`7e60047`](https://github.com/flex-development/grease/commit/7e60047a0e6cceac59c0fc358eaf8cb8f2e1ca47)] **deps-dev:** bump cspell from 7.3.2 to 7.3.5 ([#106](https://github.com/flex-development/grease/issues/106))
- [[`c430ef8`](https://github.com/flex-development/grease/commit/c430ef87820184460ac4ca94d73a49aed2baa2cc)] **deps-dev:** bump cspell from 7.3.5 to 7.3.6 ([#107](https://github.com/flex-development/grease/issues/107))
- [[`062ae1a`](https://github.com/flex-development/grease/commit/062ae1a5da50866bb62eb640ef2c53c525b19367)] **deps-dev:** bump cspell from 7.3.6 to 7.3.7 ([#129](https://github.com/flex-development/grease/issues/129))
- [[`650af9a`](https://github.com/flex-development/grease/commit/650af9a7a9c97888c3312682345daba0d8f0596a)] **deps-dev:** bump cspell from 7.3.7 to 7.3.8 ([#149](https://github.com/flex-development/grease/issues/149))
- [[`a92d2a6`](https://github.com/flex-development/grease/commit/a92d2a661abca61208dc358443d9dc3ff6ec70cb)] **deps-dev:** bump dprint from 0.40.2 to 0.41.0 ([#105](https://github.com/flex-development/grease/issues/105))
- [[`4d2a43e`](https://github.com/flex-development/grease/commit/4d2a43ee68ddada446795dbb86f2e273b964d9c0)] **deps-dev:** bump esbuild from 0.19.2 to 0.19.3 ([#110](https://github.com/flex-development/grease/issues/110))
- [[`b2bc507`](https://github.com/flex-development/grease/commit/b2bc507cd6d78273863861a86a27404d98534eca)] **deps-dev:** bump esbuild from 0.19.3 to 0.19.4 ([#128](https://github.com/flex-development/grease/issues/128))
- [[`821f801`](https://github.com/flex-development/grease/commit/821f8019df0fadcf084ccaef358bea4f94cad38c)] **deps-dev:** bump eslint-import-resolver-typescript from 3.6.0 to 3.6.1 ([#120](https://github.com/flex-development/grease/issues/120))
- [[`0845f72`](https://github.com/flex-development/grease/commit/0845f7256458f205338d4a2d8bb7b2a695024abf)] **deps-dev:** bump eslint-plugin-import from 2.27.5 to 2.28.1 ([#83](https://github.com/flex-development/grease/issues/83))
- [[`7a97a68`](https://github.com/flex-development/grease/commit/7a97a6837001f8a628c2e7948cb0ffeb1ef165dd)] **deps-dev:** bump eslint-plugin-jsonc from 2.9.0 to 2.10.0 ([#139](https://github.com/flex-development/grease/issues/139))
- [[`65e6e72`](https://github.com/flex-development/grease/commit/65e6e72a3582a1c41e23e35d381ae1ab6216b94e)] **deps-dev:** bump eslint-plugin-yml from 1.8.0 to 1.9.0 ([#104](https://github.com/flex-development/grease/issues/104))
- [[`59ce85b`](https://github.com/flex-development/grease/commit/59ce85b41c23c6594af353909d45b33d76b918fa)] **deps-dev:** bump eslint-plugin-yml from 1.9.0 to 1.10.0 ([#138](https://github.com/flex-development/grease/issues/138))
- [[`c4c2a15`](https://github.com/flex-development/grease/commit/c4c2a158d0b19a69bd304a2c29fe1706fbea2ed8)] **deps-dev:** bump lint-staged from 14.0.1 to 15.0.1 ([#147](https://github.com/flex-development/grease/issues/147))
- [[`8144b11`](https://github.com/flex-development/grease/commit/8144b11053bcc3c64e3b1c4554879e2381c8ac35)] **deps-dev:** bump lint-staged from 15.0.1 to 15.0.2 ([#155](https://github.com/flex-development/grease/issues/155))
- [[`67baae5`](https://github.com/flex-development/grease/commit/67baae5aa99efc871ce140925b36853497633f03)] **deps-dev:** bump the commitlint group with 1 update ([#130](https://github.com/flex-development/grease/issues/130))
- [[`b4f2727`](https://github.com/flex-development/grease/commit/b4f27275fc6b8e25b976af89f853f573fccb836b)] **deps-dev:** bump the commitlint group with 1 update ([#145](https://github.com/flex-development/grease/issues/145))
- [[`61cdc46`](https://github.com/flex-development/grease/commit/61cdc467b9a50bf9c71ab5bfa291b09a1b89f751)] **deps-dev:** bump the eslint group with 1 update ([#121](https://github.com/flex-development/grease/issues/121))
- [[`b2b96b0`](https://github.com/flex-development/grease/commit/b2b96b0460142d17a7b1be08110d6ec4f34cdf8c)] **deps-dev:** bump the eslint group with 1 update ([#137](https://github.com/flex-development/grease/issues/137))
- [[`9340204`](https://github.com/flex-development/grease/commit/9340204594cf47f8839ff2c39292dbfbd5edd2fd)] **deps-dev:** bump the eslint group with 1 update ([#96](https://github.com/flex-development/grease/issues/96))
- [[`28d7526`](https://github.com/flex-development/grease/commit/28d75265f6453aa7e2b137fe6042c18328a26868)] **deps-dev:** bump the flex-development group with 1 update ([#97](https://github.com/flex-development/grease/issues/97))
- [[`a05d3b5`](https://github.com/flex-development/grease/commit/a05d3b54ce1b02f4ab318b74ef364c6b89dd529d)] **deps-dev:** bump the nestjs group with 2 updates ([#118](https://github.com/flex-development/grease/issues/118))
- [[`ceda859`](https://github.com/flex-development/grease/commit/ceda859f7483e56d599c1dae4e6fe75801040623)] **deps-dev:** bump the nestjs group with 2 updates ([#135](https://github.com/flex-development/grease/issues/135))
- [[`c8f387d`](https://github.com/flex-development/grease/commit/c8f387dd1b4954afe1f6d00b8e50194117cade46)] **deps-dev:** bump the nestjs group with 2 updates ([#98](https://github.com/flex-development/grease/issues/98))
- [[`b32e5f7`](https://github.com/flex-development/grease/commit/b32e5f7e25097891490d6906e0dfec061d5daed5)] **deps-dev:** bump the nestjs group with 3 updates ([#80](https://github.com/flex-development/grease/issues/80))
- [[`1a55024`](https://github.com/flex-development/grease/commit/1a550245876cbab358fdb58b59bcdce97e31d94e)] **deps-dev:** bump the typescript-eslint group with 2 updates ([#102](https://github.com/flex-development/grease/issues/102))
- [[`47cc069`](https://github.com/flex-development/grease/commit/47cc06941e0ecaac0a5f9e22a8e7862fa5b48e4d)] **deps-dev:** bump the typescript-eslint group with 2 updates ([#114](https://github.com/flex-development/grease/issues/114))
- [[`b13e749`](https://github.com/flex-development/grease/commit/b13e749e57ad59d9b9af153f6669de9d7d8a985d)] **deps-dev:** bump the typescript-eslint group with 2 updates ([#124](https://github.com/flex-development/grease/issues/124))
- [[`0759efe`](https://github.com/flex-development/grease/commit/0759efe0732d29e9253df58e8defdd8258cef5ec)] **deps-dev:** bump the typescript-eslint group with 2 updates ([#132](https://github.com/flex-development/grease/issues/132))
- [[`724c04c`](https://github.com/flex-development/grease/commit/724c04c346ad59e0a705f27f825076148bbb4c8e)] **deps-dev:** bump the typescript-eslint group with 2 updates ([#141](https://github.com/flex-development/grease/issues/141))
- [[`f235d7d`](https://github.com/flex-development/grease/commit/f235d7d2d0caff8c0e3fa4cc6106420efe4d62ec)] **deps-dev:** bump the typescript-eslint group with 2 updates ([#150](https://github.com/flex-development/grease/issues/150))
- [[`64a19f0`](https://github.com/flex-development/grease/commit/64a19f04b963ccddd534d00d2aa473ff74cdf8d4)] **deps-dev:** bump the typescript-eslint group with 2 updates ([#87](https://github.com/flex-development/grease/issues/87))
- [[`121e06f`](https://github.com/flex-development/grease/commit/121e06f262dc9162fc2080b3d7dbb53dffd33efc)] **deps-dev:** bump the vitest group with 3 updates ([#116](https://github.com/flex-development/grease/issues/116))
- [[`7f6d596`](https://github.com/flex-development/grease/commit/7f6d596865ed9de5d1b5556d3fb912e488a6bec6)] **deps-dev:** bump the vitest group with 3 updates ([#131](https://github.com/flex-development/grease/issues/131))
- [[`3ec3b86`](https://github.com/flex-development/grease/commit/3ec3b86d2b05de02660c48a8382af2e70f5cfcaf)] **deps-dev:** bump vite from 5.0.0-beta.1 to 5.0.0-beta.2 ([#113](https://github.com/flex-development/grease/issues/113))
- [[`2abaf4c`](https://github.com/flex-development/grease/commit/2abaf4c487594bce38dd2eea5dd56ae4fe1d1fe1)] **deps-dev:** bump vite from 5.0.0-beta.10 to 5.0.0-beta.11 ([#156](https://github.com/flex-development/grease/issues/156))
- [[`8a9f2ad`](https://github.com/flex-development/grease/commit/8a9f2adbb8bfb10ef8500a818240996916664fc2)] **deps-dev:** bump vite from 5.0.0-beta.2 to 5.0.0-beta.3 ([#122](https://github.com/flex-development/grease/issues/122))
- [[`161cc73`](https://github.com/flex-development/grease/commit/161cc7365a2a61cd714516036f4381a0661e92ee)] **deps-dev:** bump vite from 5.0.0-beta.3 to 5.0.0-beta.4 ([#133](https://github.com/flex-development/grease/issues/133))
- [[`a240b44`](https://github.com/flex-development/grease/commit/a240b4422d1da93c36124bc3d82781af926d36bb)] **deps-dev:** bump vite from 5.0.0-beta.4 to 5.0.0-beta.5 ([#142](https://github.com/flex-development/grease/issues/142))
- [[`1ef3e44`](https://github.com/flex-development/grease/commit/1ef3e448ef8439d84dd5707d6cee4ce46f0f4fbc)] **deps-dev:** bump vite from 5.0.0-beta.5 to 5.0.0-beta.6 ([#143](https://github.com/flex-development/grease/issues/143))
- [[`d1629b9`](https://github.com/flex-development/grease/commit/d1629b91dc324df05470f30016d293157eccebaf)] **deps-dev:** bump vite from 5.0.0-beta.6 to 5.0.0-beta.7 ([#144](https://github.com/flex-development/grease/issues/144))
- [[`0b5b6ac`](https://github.com/flex-development/grease/commit/0b5b6ac32e07864c3efb12ab8d1ec078fc8ab624)] **deps-dev:** bump vite from 5.0.0-beta.7 to 5.0.0-beta.8 ([#152](https://github.com/flex-development/grease/issues/152))
- [[`a90c715`](https://github.com/flex-development/grease/commit/a90c715cba4a18baccca6a519202472d0fde476e)] **deps-dev:** bump vite from 5.0.0-beta.8 to 5.0.0-beta.10 ([#153](https://github.com/flex-development/grease/issues/153))
- [[`c7601b5`](https://github.com/flex-development/grease/commit/c7601b57c47120e416a75989686032177ca82b80)] **deps-dev:** downgrade eslint-plugin-import from 2.28.1 to 2.27.5
- [[`81ec976`](https://github.com/flex-development/grease/commit/81ec976436527650a0cf9d69d7c0aad44373240f)] **deps:** bump cosmiconfig from 8.2.0 to 8.3.3 ([#85](https://github.com/flex-development/grease/issues/85))
- [[`eb7f8f8`](https://github.com/flex-development/grease/commit/eb7f8f8ec33f8b262a0f42b6b6e6bc85ae539180)] **deps:** bump get-func-name from 2.0.0 to 2.0.2 ([#126](https://github.com/flex-development/grease/issues/126))
- [[`b8b0ae8`](https://github.com/flex-development/grease/commit/b8b0ae818cea97b838fa2d53b7f1127eae957042)] **deps:** bump postcss from 8.4.30 to 8.4.31 ([#134](https://github.com/flex-development/grease/issues/134))
- [[`8a05850`](https://github.com/flex-development/grease/commit/8a0585023e4ff91c49abd4e09a685abcf82428cc)] **deps:** bump the dependencies group with 1 update ([#119](https://github.com/flex-development/grease/issues/119))
- [[`cc6b5ae`](https://github.com/flex-development/grease/commit/cc6b5ae09dfa2eefee267a85ee5d79f9b09f8284)] **deps:** bump the dependencies group with 1 update ([#127](https://github.com/flex-development/grease/issues/127))
- [[`bba51ea`](https://github.com/flex-development/grease/commit/bba51ea86679764a3663c60d6095c111b8ed4b47)] **deps:** bump the dependencies group with 1 update ([#136](https://github.com/flex-development/grease/issues/136))
- [[`4ff7b36`](https://github.com/flex-development/grease/commit/4ff7b36c124bbc75bcd64a035b4c2427b03cc67a)] **deps:** bump the dependencies group with 1 update ([#151](https://github.com/flex-development/grease/issues/151))
- [[`83ec01c`](https://github.com/flex-development/grease/commit/83ec01c2d02ce0d24064486f55b90b30db36a858)] **deps:** bump the dependencies group with 1 update ([#93](https://github.com/flex-development/grease/issues/93))
- [[`5c4a27c`](https://github.com/flex-development/grease/commit/5c4a27c9c5d31044539b92e7be6126e9f8a71591)] **deps:** bump the dependencies group with 2 updates ([#108](https://github.com/flex-development/grease/issues/108))
- [[`dbb2db4`](https://github.com/flex-development/grease/commit/dbb2db432d63d285c2d8fe0b02cab7e2b3b6d429)] **deps:** bump the dependencies group with 2 updates ([#99](https://github.com/flex-development/grease/issues/99))
- [[`642cc9f`](https://github.com/flex-development/grease/commit/642cc9ff17d09377be502e6992e4506d28df126d)] **nvm:** require `>=18.18.2 <20.6.0 || >20.6.0`

### :robot: Continuous Integration

- [[`ae99e7e`](https://github.com/flex-development/grease/commit/ae99e7e800dcbef9e7b5720493e073e7dc7827ab)] [[@dependabot](https://github.com/dependabot)] ignore eslint-plugin-import
- [[`b1f2493`](https://github.com/flex-development/grease/commit/b1f24935e18038b587fa4f9c8267d7a253e2e2b1)] add codecov status checks
- [[`ad14c65`](https://github.com/flex-development/grease/commit/ad14c65fc9e59ac13cdd7edf68357641a84a77f2)] **deps:** bump actions/cache from 3.3.1 to 3.3.2 ([#95](https://github.com/flex-development/grease/issues/95))
- [[`3885804`](https://github.com/flex-development/grease/commit/388580481e9494c972391ec29f15891e8c733384)] **deps:** bump actions/checkout from 3.6.0 to 4.0.0 ([#86](https://github.com/flex-development/grease/issues/86))
- [[`dc05906`](https://github.com/flex-development/grease/commit/dc05906fde3609c0d54860ed16595540dce04c06)] **deps:** bump actions/checkout from 4.0.0 to 4.1.0 ([#123](https://github.com/flex-development/grease/issues/123))
- [[`f98bc04`](https://github.com/flex-development/grease/commit/f98bc048cef0b4ef5fb350a91274a7522b55ad32)] **deps:** bump actions/checkout from 4.1.0 to 4.1.1 ([#154](https://github.com/flex-development/grease/issues/154))
- [[`999a933`](https://github.com/flex-development/grease/commit/999a933c474073a78a3add905369ea49392465e1)] **deps:** bump actions/upload-artifact from 3.1.2 to 3.1.3 ([#92](https://github.com/flex-development/grease/issues/92))
- [[`e8afc66`](https://github.com/flex-development/grease/commit/e8afc66f57614b609348eb0cc66d0432f2aa35a2)] **deps:** bump crazy-max/ghaction-import-gpg from 5.3.0 to 6.0.0 ([#101](https://github.com/flex-development/grease/issues/101))
- [[`d9f40c1`](https://github.com/flex-development/grease/commit/d9f40c1988cab35af8ef94affc00bc965fee502a)] **workflows:** [`ci`] add `changelog` job
- [[`f791c67`](https://github.com/flex-development/grease/commit/f791c67adfdc543e978a86a74cb95038af047ed4)] **workflows:** [`release-branch`] add `pr` job
- [[`d2dd4bd`](https://github.com/flex-development/grease/commit/d2dd4bdd1985348f60b0c523a1784280b83db04c)] **workflows:** [`release-branch`] fix pr assignee syntax
- [[`a8c4e54`](https://github.com/flex-development/grease/commit/a8c4e545c866c953581a289cc3b690d9a074ad7c)] **workflows:** [`release`] cleanup `publish` job
- [[`3dab080`](https://github.com/flex-development/grease/commit/3dab080daddaaa4795dc96afa4019742631f86c6)] **workflows:** [`release`] set trust on gpg key via action input
- [[`3e64a58`](https://github.com/flex-development/grease/commit/3e64a585fcd502431da2c8bd579f908f5c9b1209)] **workflows:** [`release`] use `secrets.PAT_REPO`
- [[`28319fb`](https://github.com/flex-development/grease/commit/28319fb614bc96282c23a794ec8e4955b88c3c30)] **workflows:** add `git`
- [[`d1e4261`](https://github.com/flex-development/grease/commit/d1e426100440a0492e26a3c21f8022ec8d888ec6)] **workflows:** add `release-branch`

### :pencil: Documentation

- [[`e34f5b7`](https://github.com/flex-development/grease/commit/e34f5b78df51e84a2675d6bfb0301d479ae79d7d)] update deployment guide

### :sparkles: Features

- [[`bb00e5f`](https://github.com/flex-development/grease/commit/bb00e5f9c9840aab75bf60a208c4730a3c492bf0)] **bump:** recommended version bump
- [[`8db3a7e`](https://github.com/flex-development/grease/commit/8db3a7e0bced6ab5156416d8881eb5b8eb619dbe)] **changelog:** changelog generation
- [[`513512f`](https://github.com/flex-development/grease/commit/513512f8c1cabc71d1961436f084378fda8a8e79)] **cli:** [`InfoCommand`] `--pm`
- [[`3c5e309`](https://github.com/flex-development/grease/commit/3c5e30936833b083a625fa975ecd888cb2c1d006)] **cli:** [`InfoCommand`] `--yaml`
- [[`094f1b2`](https://github.com/flex-development/grease/commit/094f1b2d3c28556225d4cb9265ad7a032115e21f)] **cli:** `BumpCommand`
- [[`781362a`](https://github.com/flex-development/grease/commit/781362a84dd66f2300ba9be4c4443e8d5378b504)] **cli:** `ChangelogCommand`
- [[`9cc8383`](https://github.com/flex-development/grease/commit/9cc838360d27b660d6897ca8d19d2ec708242dc5)] **cli:** `InfoCommand`
- [[`067c93c`](https://github.com/flex-development/grease/commit/067c93cc68575a652d8609585bd64478c38dccfe)] **cli:** `TagCommand`
- [[`749179f`](https://github.com/flex-development/grease/commit/749179fe39c28de672fa03dacc23734af3e6fcc4)] **cli:** json output
- [[`d7ba51d`](https://github.com/flex-development/grease/commit/d7ba51dbfc57ed4225ae293ada253682cab3e956)] **config:** `ConfigService`
- [[`47d4d7d`](https://github.com/flex-development/grease/commit/47d4d7df5fc91193a28a3d2b5904663a2890a0d0)] **decorators:** `IsManifestId`, `IsReleaseVersion`
- [[`208898c`](https://github.com/flex-development/grease/commit/208898c9102c2ab64cf167ed4a391264a5a78ba2)] **decorators:** `IsNilable`, `IsNullable`, `IsOptional`
- [[`f84503e`](https://github.com/flex-development/grease/commit/f84503e79f349ab6852de58c93eb6b8d1f7593e8)] **git:** create tags
- [[`fecff4a`](https://github.com/flex-development/grease/commit/fecff4a0308c027764350b22fb22fd3370d4c61f)] **models:** `Commit`
- [[`812e10c`](https://github.com/flex-development/grease/commit/812e10c3a5054733373baeeca6a9134a89a478a8)] **models:** `Version`
- [[`17c153f`](https://github.com/flex-development/grease/commit/17c153f409200d10e6e40f66826740c16208e63e)] **providers:** `BumpService`
- [[`b61cac0`](https://github.com/flex-development/grease/commit/b61cac0a01f3d6d78e05b410bb4008842ffe16c4)] **providers:** `GitService`
- [[`bfb3642`](https://github.com/flex-development/grease/commit/bfb364275b741d4892afcc438a7761b46115f34b)] **providers:** `PackageService`
- [[`3b83e65`](https://github.com/flex-development/grease/commit/3b83e65d8f4790756dcf8fb101b42f85e836b13e)] **providers:** `ValidationService`

### :house_with_garden: Housekeeping

- [[`2e9d40f`](https://github.com/flex-development/grease/commit/2e9d40f4f584f6c4cb47eb366506698bae9a9fb3)] [dprint] update config
- [[`8e7c5aa`](https://github.com/flex-development/grease/commit/8e7c5aad7991c6376e6260f0dc43eeb0fcc062c7)] **pkg:** update package info
- [[`cca3204`](https://github.com/flex-development/grease/commit/cca3204f9a72c3b7bc7b6068a2c73d3c74b443ea)] **scripts:** [`release`] fix branching logic
- [[`9580017`](https://github.com/flex-development/grease/commit/9580017d4e084e13c0f510330b61a07c827425ed)] **scripts:** remove `typecheck-build`
- [[`668b2e3`](https://github.com/flex-development/grease/commit/668b2e3745e29b5f5b7b62ff56959b5d1c489528)] **tests:** [codecov] configure components

### :mechanical_arm: Refactors

- [[`0390249`](https://github.com/flex-development/grease/commit/03902492c39df7c299b731072480494f5527b75a)] cqrs integration
- [[`455c149`](https://github.com/flex-development/grease/commit/455c1497e3ed5019ab0ebd234509703dadba206a)] init project rewrite
- [[`8d2859b`](https://github.com/flex-development/grease/commit/8d2859b17e5519dceadd8db5680de706ac41d740)] **log:** add subdomain


