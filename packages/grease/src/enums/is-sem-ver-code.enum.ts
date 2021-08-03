/**
 * @file Enums - IsSemVerCode
 * @module grease/enums/IsSemVerCode
 */

/**
 * `IsSemVer` decorator error codes.
 */
export enum IsSemVerCode {
  /**
   * Value is valid SemVer tag, but failed version comparison.
   */
  CMP = 'CMP',

  /**
   * Value is valid SemVer tag, but already exists in the current repository.
   */
  CONFLICT = 'CONFLICT',

  /**
   * Value is valid SemVer tag, but it is not pushed to the current repository.
   */
  DOES_NOT_EXIST = 'DOES_NOT_EXIST',

  /**
   * Value is valid SemVer tag, but does not satisfy specified range.
   */
  RANGE_UNSATISFIED = 'RANGE_UNSATISFIED',

  /**
   * Value is not valid SemVer tag.
   */
  SEM_VER = 'SEM_VER'
}
