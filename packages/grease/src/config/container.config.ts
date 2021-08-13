import { Injectable } from '@grease/enums/injectable.enum'
import GreaseCache from '@grease/services/grease-cache.service'
import { Container } from 'typedi'
import TOKENS from './tokens.config'

/**
 * @file Configuration - Injectable Dependency Register
 * @module grease/config/register
 */

const config = {
  [Injectable.GreaseCache]: new GreaseCache()
}

Object.keys(config).forEach(key => {
  if (!Container.has(TOKENS[key])) Container.set(TOKENS[key], config[key])
})

export default Container
