/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

package com.facebook.react.modules.fresco;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.modules.common.ModuleDataCleaner;

/**
 * Module to initialize the Fresco library.
 *
 * <p>Does not expose any methods to JavaScript code. For initialization and cleanup only.
 */
public class FrescoModule extends ReactContextBaseJavaModule implements
    ModuleDataCleaner.Cleanable {

    public FrescoModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "Fresco";
    }

    @Override
    public void clearSensitiveData() {
        
    }
}
