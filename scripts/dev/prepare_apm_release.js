#!/usr/bin/env node --harmony
'use strict';
/* @noflow */

/*
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

/*eslint-disable no-var, prefer-const, no-console*/

var assert = require('assert');
var fs = require('fs');
var path = require('path');

var basedir = path.join(__dirname, '../..');

var gitIgnorePath = path.join(basedir, '.gitignore');
var npmIgnorePath = path.join(basedir, '.npmignore');
var packageJsonPath = path.join(basedir, 'package.json');

var gitIgnore = fs.readFileSync(gitIgnorePath, 'utf8');
var npmIgnore = fs.readFileSync(npmIgnorePath, 'utf8');
var packageJson = fs.readFileSync(packageJsonPath, 'utf8');

var pkg = JSON.parse(packageJson);

/**
 * .gitignore:
 */
var gitIgnoreLines = gitIgnore.split('\n');
gitIgnoreLines.push(
  '',
  '########################################################',
  '### !!!AUTO GENERATED by "prepare_apm_release.js"!!! ###',
  '########################################################',
  '',
  '# "apm" doesn\'t honor ".npmignore" files. As a workaround, we merge the',
  '# ".npmignore" content into ".gitignore":',
  npmIgnore,
  ''
);
fs.writeFileSync(gitIgnorePath, gitIgnoreLines.join('\n'));

/**
 * package.json:
 */
var pkgCopy = JSON.parse(JSON.stringify(pkg));
delete pkgCopy.bin;
delete pkgCopy.private;
var newPackageJson = JSON.stringify(pkgCopy, null, 2) + '\n';
fs.writeFileSync(packageJsonPath, newPackageJson);
