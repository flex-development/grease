/**
 * @file Enums - IsSemVerMessage
 * @module grease/enums/IsSemVerMessage
 */

/**
 * `IsSemVer` decorator error codes mapped to error messages and message
 * substrings.
 *
 * Messages may use [special class-validator tokens][1].
 *
 * [1]: https://github.com/typestack/class-validator#validation-messages
 */
export enum IsSemVerMessage {
  /**
   * Value is valid SemVer tag, but failed version comparison.
   *
   * Note that this is a message substring.
   */
  CMP = '$property must satisfy comparison',

  /**
   * Value is valid SemVer tag, but already exists in the current repository.
   *
   * Thrown when `IsSemVerOptions.negit` is `true` is true.
   */
  CONFLICT = '$property must not exist in the remote',

  /**
   * Value is valid SemVer tag, but it is not pushed to the current repository.
   *
   * Thrown when `IsSemVerOptions.git` is `true`, or a config object is defined.
   */
  DOES_NOT_EXIST = '$property must be pushed to current git repository',

  /**
   * Value is valid SemVer tag, but does not satisfy specified range.
   *
   * Note that this is a message substring.
   */
  RANGE_UNSATISFIED = '$property must satisfy range',

  /**
   * Value is not valid SemVer tag.
   */
  SEM_VER = '$property must be SemanticVersion: <major>.<minor>.<patch> | <major>.<minor>.<patch>-<unstable>.<number> or SemanticVersionTag: <tag-prefix><SemanticVersion>'
}
