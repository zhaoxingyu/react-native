/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

package com.facebook.react.views.image;

import javax.annotation.Nullable;

import com.facebook.react.uimanager.ReactProp;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewProps;

public class ReactImageManager extends SimpleViewManager<ReactImageView> {

  public static final String REACT_CLASS = "RCTImageView";

  @Override
  public String getName() {
    return REACT_CLASS;
  }

  @Override
  public ReactImageView createViewInstance(ThemedReactContext context) {
    return new ReactImageView(context);
  }

  // In JS this is Image.props.source.uri
  @ReactProp(name = "src")
  public void setSource(ReactImageView view, @Nullable String source) {
      view.setSource(source);
  }

  @ReactProp(name = "borderColor", customType = "Color")
  public void setBorderColor(ReactImageView view, @Nullable Integer borderColor) {
  }

  @ReactProp(name = "borderWidth")
  public void setBorderWidth(ReactImageView view, float borderWidth) {
  }

  @ReactProp(name = "borderRadius")
  public void setBorderRadius(ReactImageView view, float borderRadius) {
  }

  @ReactProp(name = ViewProps.RESIZE_MODE)
  public void setResizeMode(ReactImageView view, @Nullable String resizeMode) {
  }

  @ReactProp(name = "tintColor", customType = "Color")
  public void setTintColor(ReactImageView view, @Nullable Integer tintColor) {
  }

  @ReactProp(name = "progressiveRenderingEnabled")
  public void setProgressiveRenderingEnabled(ReactImageView view, boolean enabled) {
  }

  @ReactProp(name = "fadeDuration")
  public void setFadeDuration(ReactImageView view, int durationMs) {
  }

  @Override
  protected void onAfterUpdateTransaction(ReactImageView view) {
    super.onAfterUpdateTransaction(view);
  }
}
