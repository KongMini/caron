package com.fresco.stracom; // <-- CHANGE TO YOUR PACKAGE NAME

import com.facebook.react.bridge.JSIModuleSpec;
import com.facebook.react.bridge.JavaScriptContextHolder;
import com.facebook.react.bridge.ReactApplicationContext;
import java.util.Collections;
import java.util.List;

import com.swmansion.reanimated.ReanimatedJSIModulePackage; // <-- ADD THIS
import com.ammarahmed.mmkv.RNMMKVModule; // <-- ADD THIS
import com.facebook.react.bridge.JSIModulePackage;


public class CustomMMKVJSIModulePackage extends ReanimatedJSIModulePackage { // Replace implements JSIModulePackage with extends ReanimatedJSIModulePackage 
    @Override
    public List<JSIModuleSpec> getJSIModules(ReactApplicationContext reactApplicationContext, JavaScriptContextHolder jsContext) {
        super.getJSIModules(reactApplicationContext, jsContext); // <-- ADD THIS
        reactApplicationContext.getNativeModule(RNMMKVModule.class).installLib(jsContext, reactApplicationContext.getFilesDir().getAbsolutePath() + "/mmkv");

        return Collections.emptyList();
    }
}
