#!/bin/bash

# Testing Workflow
#
# Refernces:
#
# - https://github.com/entropitor/dotenv-cli#cascading-env-variables
# - https://jestjs.io/docs/next/cli
# - https://github.com/hipstersmoothie/jest-github-reporter

# 1. Clear terminal
# 2. Set test environment variabls and run Jest
clear
dotenv -c test -- jest --passWithNoTests --testLocationInResults $@
