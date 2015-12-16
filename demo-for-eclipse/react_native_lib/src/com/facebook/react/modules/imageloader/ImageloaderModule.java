/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

package com.facebook.react.modules.imageloader;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.sina.weibo.universalimageloader.core.ImageLoader;
import com.sina.weibo.universalimageloader.core.ImageLoaderConfiguration;

/**
 * Module to initialize the Fresco library.
 *
 * <p>Does not expose any methods to JavaScript code. For initialization and cleanup only.
 */
public class ImageloaderModule extends ReactContextBaseJavaModule{

    public ImageloaderModule(ReactApplicationContext reactContext) {
        super(reactContext);
        ImageLoaderConfiguration config = new ImageLoaderConfiguration.Builder(reactContext).build();
        if (!ImageLoader.getInstance().isInited()) {
            ImageLoader.getInstance().init(config);
        }
    }

    @Override
    public String getName() {
        return "ImageLoader";
    }
}
