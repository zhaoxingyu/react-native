// Copyright 2004-present Facebook. All Rights Reserved.

package com.facebook.react.views.toolbar;

import android.content.Context;
import android.widget.LinearLayout;

/**
 * Custom implementation of the {@link Toolbar} widget that adds support for remote images in logo
 * and navigationIcon using fresco.
 */
public class ReactToolbar extends LinearLayout {

    public ReactToolbar(Context context) {
        super(context);
    }

}
