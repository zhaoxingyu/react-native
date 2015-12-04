/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

package com.sina.weibo.reactnative.views.switchview;

import android.content.Context;
import android.widget.CheckBox;
import android.widget.Switch;

/**
 * Switch that has its value controlled by JS. Whenever the value of the switch changes, we do not
 * allow any other changes to that switch until JS sets a value explicitly. This stops the Switch
 * from changing its value multiple times, when those changes have not been processed by JS first.
 */
/*package*/ class WeiboSwitch extends CheckBox {

  private boolean mAllowChange;

  public WeiboSwitch(Context context) {
    super(context);
    mAllowChange = true;
  }

  @Override
  public void setChecked(boolean checked) {
    if (mAllowChange) {
      mAllowChange = false;
      super.setChecked(checked);
    }
  }

  /*package*/ void setOn(boolean on) {
    // If the switch has a different value than the value sent by JS, we must change it.
    if (isChecked() != on) {
      super.setChecked(on);
    }
    mAllowChange = true;
  }
}
