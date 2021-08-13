import { Injectable } from '@grease/enums/injectable.enum'
import { IGreaseCache } from '@grease/interfaces'
import { Token } from 'typedi'

/**
 * @file Configuration - Id Tokens
 * @module grease/config/tokens
 * @see https://docs.typestack.community/typedi/#using-service-groups
 */

export default {
  GreaseCache: new Token<IGreaseCache>(Injectable.GreaseCache)
}
