/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

package com.facebook.react.views.image;

import android.content.Context;
import android.widget.LinearLayout;

/**
 * Wrapper class around Fresco's GenericDraweeView, enabling persisting props across multiple view
 * update and consistent processing of both static and network images.
 */
public class ReactImageView extends LinearLayout {

  public ReactImageView(Context context) {
        super(context);
    }

}
