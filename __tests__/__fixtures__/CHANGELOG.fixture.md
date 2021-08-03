# Changelog

All notable changes to this project will be documented in this file. See
[standard-version](https://github.com/conventional-changelog/standard-version)
for commit guidelines.

## [5.1.0](https://github.com/flex-development/mango/compare/v5.0.0...v5.1.0) (2021-05-28)

### :sparkles: Features

- **interfaces:** `IAbstractMangoFinderBase`
  ([073401f](https://github.com/flex-development/mango/commit/073401fd82c14ba84dedb4a0cf9721548bb12fb4))
- **interfaces:** `IAbstractMangoRepositoryBase`
  ([9b976a6](https://github.com/flex-development/mango/commit/9b976a6c00912fda3551e92d4d5b72bc21b77de0))

## [5.0.0](https://github.com/flex-development/mango/compare/v4.0.1...v5.0.0) (2021-05-28)

### ⚠ BREAKING CHANGES

- **dtos:** integrate `DTOFilter`

### :hammer: Build

- use `@flex-development/tutils@3.1.0`
  ([fde654a](https://github.com/flex-development/mango/commit/fde654a2317d198e6ca121eef986c697ab725427))

### :sparkles: Features

- **types:** `DTOFilter`
  ([b861719](https://github.com/flex-development/mango/commit/b86171947f92bff077a1b2678fe6bc8bd31c5a9c))

### :recycle: Code Improvements

- **dtos:** integrate `DTOFilter`
  ([ec86961](https://github.com/flex-development/mango/commit/ec8696104ed8e9f88a54edaac79a0fb6257a86f0))

### [4.0.1](https://github.com/flex-development/mango/compare/v4.0.0...v4.0.1) (2021-05-27)

### :book: Documentation

- **repo:** update description in `README`
  ([a46200c](https://github.com/flex-development/mango/commit/a46200c363d99b5c9433e97d11e69a24778e370b))

### :bug: Fixes

- **interfaces:** `IMangoRepositoryAsync#delete`
  ([06c4a50](https://github.com/flex-development/mango/commit/06c4a50221e1076eed101ba2d7f82c9db25c2b07))

### :recycle: Code Improvements

- **repo:** allow optional `dto` arguments
  ([2819d1d](https://github.com/flex-development/mango/commit/2819d1d7c977cf6277317f183615b0ae3b5fa299))

## [4.0.0](https://github.com/flex-development/mango/compare/v3.1.1...v4.0.0) (2021-05-27)

### ⚠ BREAKING CHANGES

- **repo:** `MangoRepository extends AbstractMangoRepository`
- **mango:** rename `*.resetCache` methods to `*.setCache`

### :bug: Fixes

- type instantiation is excessively deep and possibly infinite
  ([b3f4ea6](https://github.com/flex-development/mango/commit/b3f4ea6df5ad4060c0e84b9e32d1759512461b56))

### :nail_care: Formatting & Structure

- **mango:** rename `*.resetCache` methods to `*.setCache`
  ([68bb0fb](https://github.com/flex-development/mango/commit/68bb0fb598fb46dbda700b552c5d81b72b6e4a20))
- **repo:** use `F` in generics to represent field paths of `dto`
  ([ea6708a](https://github.com/flex-development/mango/commit/ea6708aafb994c1049968aaf9ba2cb4980ff7642))

### :book: Documentation

- **mango:** fix use of `[@throws](https://github.com/throws) {Exception}`
  ([6bcab30](https://github.com/flex-development/mango/commit/6bcab30eb2d77305e97cdf54d2dd6717e1db1e98))
- **mango:** sorting rules
  ([de2707c](https://github.com/flex-development/mango/commit/de2707c1d92f3127f6a8cf460eb92db9263d1953))
- **validator:** update code sample in `README`
  ([04de572](https://github.com/flex-development/mango/commit/04de572d38d50e3a5dc2e43c3055af467ccb4bea))

### :recycle: Code Improvements

- **repo:** `MangoRepository extends AbstractMangoRepository`
  ([2367918](https://github.com/flex-development/mango/commit/2367918751b6cc91faf317436d00ee0148f51590))
- **validator:** use `ObjectUnknown` as default `E` in generic
  ([92f5c57](https://github.com/flex-development/mango/commit/92f5c577f930a8c8f0506347cea8a248ae8c8782))

### :sparkles: Features

- **abstracts:** add `AbstractMangoFinder`
  ([fbb8c4b](https://github.com/flex-development/mango/commit/fbb8c4b74b8f8b02aa7cac1446434f3629c0cad8))
- **abstracts:** add `AbstractMangoRepository`
  ([7ac2164](https://github.com/flex-development/mango/commit/7ac21647b13359abd568b34d6d08cdbb20888857))
- **finder:** add `AbstractMangoFinder#uid`
  ([e0d9dc1](https://github.com/flex-development/mango/commit/e0d9dc1646bb610ea0976341e1027c35dc3cc148))
- **interfaces:** add `IAbstractMangoRepository`
  ([48a6111](https://github.com/flex-development/mango/commit/48a61113bb42bca75933fba01e4be110ce8c7102))
- **interfaces:** add `IMangoRepositoryAsync`
  ([8df94de](https://github.com/flex-development/mango/commit/8df94deba66d8e49a16b3a3619b2744913f6b2ca))
- **plugins:** add `MangoFinderAsync`
  ([b2c51df](https://github.com/flex-development/mango/commit/b2c51dfe00eeb5c23f60806f429353962ee1c6b3))
- **repositories:** `MangoRepositoryAsync`
  ([e4def6a](https://github.com/flex-development/mango/commit/e4def6a749935325e0f33277f71fbd20e8e335e3))

### [3.1.1](https://github.com/flex-development/mango/compare/v3.1.0...v3.1.1) (2021-05-25)

### :bug: Fixes

- **dtos:** `EntityDTO` definition
  ([30b379d](https://github.com/flex-development/mango/commit/30b379da1ca83fdd5aed54c62d35cfa71ec52593))

## [3.1.0](https://github.com/flex-development/mango/compare/v3.0.0...v3.1.0) (2021-05-25)

### :hammer: Build

- **deps:** use @flex-development/tutils@3.0.0
  ([36e4e21](https://github.com/flex-development/mango/commit/36e4e21858c407b36e6234f21a1174bd09994bac))

## [3.0.0](https://github.com/flex-development/mango/compare/v2.0.0...v3.0.0) (2021-05-24)

### ⚠ BREAKING CHANGES

- **plugins:** MangoFinder

### :sparkles: Features

- **mango:** allow async extensions
  ([e74cfbb](https://github.com/flex-development/mango/commit/e74cfbb9b5a991704854a5c6e50f58d6cb39be30))
- **mango:** synchronous validator api
  ([6731ef8](https://github.com/flex-development/mango/commit/6731ef8a6e87c1815ad184e48ca16916f8c58c36))

### :nail_care: Formatting & Structure

- **plugins:** MangoFinder
  ([0e99498](https://github.com/flex-development/mango/commit/0e99498003b5ffe03bfe496194f981ca5e97d07f))

### :pencil2: Housekeeping

- update github release script logic
  ([bd57029](https://github.com/flex-development/mango/commit/bd57029961f9b1eba0d12b49bff6b4ff332b6ca4))
- use github release script from ts-pkg template
  ([5623d5f](https://github.com/flex-development/mango/commit/5623d5ff4f681712c64da0e2006df299b433478c))

### :book: Documentation

- **mango:** update code samples
  ([af9d632](https://github.com/flex-development/mango/commit/af9d632191d83d60ca4b15308fc3ebaf655a3288))
- **release:** getting started, mango finder, mango repo
  ([10c98dd](https://github.com/flex-development/mango/commit/10c98dd7805c1a4378529f9b64eeeaae731a00e3))

## [2.0.0](https://github.com/flex-development/mango/compare/v1.0.0...v2.0.0) (2021-05-23)

### ⚠ BREAKING CHANGES

- **repo:** add MangoRepository
- **repo:** dtos, interfaces, types

### :hammer: Build

- **deps:** install repo api dependencies
  ([0c73e11](https://github.com/flex-development/mango/commit/0c73e11351468c6613560ea08d66d3c97a3ddee5))

### :sparkles: Features

- **decorators:** custom decorators
  ([32c3d47](https://github.com/flex-development/mango/commit/32c3d4767e7e8db90ca1a38381db55876cbfc2bc))
- **mixins:** add MangoValidator
  ([25a5df1](https://github.com/flex-development/mango/commit/25a5df10d69cc157b94215f2d794b61fb6a97b6c))
- **repo:** add MangoRepository
  ([00bf295](https://github.com/flex-development/mango/commit/00bf2958b8a68b81b97a1a695fa6f6d97ccef868))
- **repo:** dtos, interfaces, types
  ([1d0c286](https://github.com/flex-development/mango/commit/1d0c28660da03a92509c21016c9f99ab2b73cf62))

## 1.0.0 (2021-05-22)

### :pencil2: Housekeeping

- project architecture
  ([709495a](https://github.com/flex-development/mango/commit/709495a0a287dddda14dbff83ea69e641fe07751))
- repo setup
  ([0f52994](https://github.com/flex-development/mango/commit/0f52994793364b07a60d0b2c6aa8e46fa9952b59))

### :hammer: Build

- use @flex-development/tutils@1.0.0
  ([83d1c16](https://github.com/flex-development/mango/commit/83d1c16a13814d8fd1cc212a38e58e0032703da4))

### :sparkles: Features

- **config:** mingo
  ([2d6e7f9](https://github.com/flex-development/mango/commit/2d6e7f9dd6509d378a92bd789f740b2200d903bb))
- **enums:** add BSONTypeAlias, BSONTypeCode, ProjectRule, SortOrder
  ([cf64488](https://github.com/flex-development/mango/commit/cf6448896b78dc4ad4494c37e0b5b1cf466ef84c))
- **mango:** interfaces and types
  ([87d89c0](https://github.com/flex-development/mango/commit/87d89c02043eb37a26f685d9430140e0a435e008))
- **mango:** plugin
  ([1d69bd9](https://github.com/flex-development/mango/commit/1d69bd9beb5e09bfa611287003c424980ffcdb7d))
- **mixins:** add MangoParser
  ([fae840b](https://github.com/flex-development/mango/commit/fae840b6fec386c7a10391e29dd97e6d80c62843))
- **types:** documents
  ([d0ea07f](https://github.com/flex-development/mango/commit/d0ea07f80a0f6aad96cab32ec3acd9e060f487f2))
