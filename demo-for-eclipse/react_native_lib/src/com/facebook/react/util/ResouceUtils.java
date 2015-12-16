package com.facebook.react.util;

import android.content.Context;

public class ResouceUtils {
    public static int getResId(Context ctx, String type, String name) {
        return ctx.getResources().getIdentifier(name, type, ctx.getPackageName());
    }
}
