/**
 * Copyright (c) 2015-present, Facebook, Inc. All rights reserved.
 * 
 * This source code is licensed under the BSD-style license found in the LICENSE
 * file in the root directory of this source tree. An additional grant of patent
 * rights can be found in the PATENTS file in the same directory.
 * 
 * @providesModule WeiboPrivacyAndroid
 */

'use strict';

var { NativeModules } = require('react-native');

var RCTWeiboPrivacyAndroid= NativeModules.WeiboPrivacyAndroid;

var WeiboPrivacyAndroid = {
  Tag:RCTWeiboPrivacyAndroid.Tag,
  
  getStates: function (
    callback: Function,
  ): void {
    RCTWeiboPrivacyAndroid.getStates(callback);
  },
  
  updateState: function(
	jsondata: string,
	):void{
	RCTWeiboPrivacyAndroid.updateState(jsondata); 
  },

};

module.exports = WeiboPrivacyAndroid;
