/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

package com.facebook.react.devsupport;

import com.facebook.react.util.ResouceUtils;

import android.os.Bundle;
import android.preference.PreferenceActivity;

/**
 * Activity that display developers settings. Should be added to the debug manifest of the app. Can
 * be triggered through the developers option menu displayed by {@link DevSupportManager}.
 */
public class DevSettingsActivity extends PreferenceActivity {

  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    int stringId = ResouceUtils.getResId(this, "string", "catalyst_settings_title");
    setTitle(stringId);
    int xmlId = ResouceUtils.getResId(this, "xml", "preferences");
    addPreferencesFromResource(xmlId);
  }
}
