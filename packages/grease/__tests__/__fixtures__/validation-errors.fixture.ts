import type { ValidationError } from 'class-validator'

/**
 * @file Workspace Test Fixture - ValidationError[]
 * @module grease/tests/fixtures/validation-errors
 */

export default [
  {
    constraints: {
      length: '$property must be longer than or equal to 10 characters'
    },
    property: 'title',
    value: 'Hello'
  },
  {
    constraints: {
      contains: 'text must contain a hello string'
    },
    property: 'text',
    value: 'this is a great post about hell world'
  }
] as ValidationError[]
