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

import android.content.Context;
import android.net.Uri;
import android.widget.ImageView;

import com.sina.weibo.universalimageloader.core.ImageLoader;
import com.sina.weibo.universalimageloader.core.download.ImageDownloader.Scheme;

/**
 * Wrapper class around Fresco's GenericDraweeView, enabling persisting props
 * across multiple view update and consistent processing of both static and
 * network images.
 */
public class ReactImageView extends ImageView {

    public ReactImageView(Context context) {
        super(context);
    }


    /*
     * Implementation note re rounded corners:
     * 
     * Fresco's built-in rounded corners only work for 'cover' resize mode -
     * this is a limitation in Android itself. Fresco has a workaround for this,
     * but it requires knowing the background color.
     * 
     * So for the other modes, we use a postprocessor. Because the postprocessor
     * uses a modified bitmap, that would just get cropped in 'cover' mode, so
     * we fall back to Fresco's normal implementation.
     */

    private @Nullable Uri mUri;

    // We can't specify rounding in XML, so have to do so here

    public void setBorderColor(int borderColor) {
    }

    public void setBorderWidth(float borderWidth) {
    }

    public void setBorderRadius(float borderRadius) {
    }

    public void setSource(@Nullable String source) {
        mUri = null;
        if (source != null) {
            try {
                mUri = Uri.parse(source);
                // Verify scheme is set, so that relative uri (used by static
                // resources) are not handled.
                if (mUri.getScheme() == null) {
                    mUri = null;
                }
            } catch (Exception e) {
                // ignore malformed uri, then attempt to extract resource ID.
            }
            if (mUri == null) {
                mUri = getResourceDrawableUri(getContext(), source);
            }
        }
        if (null != mUri) {
            ImageLoader.getInstance().displayImage(mUri.toString(), this);
        }
    }

    public void setProgressiveRenderingEnabled(boolean enabled) {
    }

    public void setFadeDuration(int durationMs) {
    }

    /**
     * ReactImageViews only render a single image.
     */
    @Override
    public boolean hasOverlappingRendering() {
        return false;
    }

    private static @Nullable Uri getResourceDrawableUri(Context context, @Nullable String name) {
        if (name == null || name.isEmpty()) {
            return null;
        }
        name = name.toLowerCase().replace("-", "_");
        int resId = context.getResources().getIdentifier(name, "drawable", context.getPackageName());
        return Uri.parse(Scheme.DRAWABLE.wrap(resId + ""));
    }
}
