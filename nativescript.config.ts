import { NativeScriptConfig } from '@nativescript/core';

export default {
  id: 'org.nativescript.airbncoproject',
  appResourcesPath: 'App_Resources',
  ios: {
    discardUncaughtJsExceptions: true,
    codeCache: true
  },
  android: {
    discardUncaughtJsExceptions: true,
    v8Flags: '--nolazy --expose_gc',
    markingMode: 'none',
    suppressCallJSMethodExceptions: false,
    codeCache: true
  }
} as NativeScriptConfig;