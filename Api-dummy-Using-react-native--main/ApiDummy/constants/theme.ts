/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

// import { Platform } from 'react-native';

// const tintColorLight = '#0a7ea4';
// const tintColorDark = '#fff';

// export const Colors = {
//   light: {
//     text: '#11181C',
//     background: '#fff',
//     tint: tintColorLight,
//     icon: '#687076',
//     tabIconDefault: '#687076',
//     tabIconSelected: tintColorLight,
//   },
//   dark: {
//     text: '#ECEDEE',
//     background: '#151718',
//     tint: tintColorDark,
//     icon: '#9BA1A6',
//     tabIconDefault: '#9BA1A6',
//     tabIconSelected: tintColorDark,
//   },
// };

// export const Fonts = Platform.select({
//   ios: {
//     /** iOS `UIFontDescriptorSystemDesignDefault` */
//     sans: 'system-ui',
//     /** iOS `UIFontDescriptorSystemDesignSerif` */
//     serif: 'ui-serif',
//     /** iOS `UIFontDescriptorSystemDesignRounded` */
//     rounded: 'ui-rounded',
//     /** iOS `UIFontDescriptorSystemDesignMonospaced` */
//     mono: 'ui-monospace',
//   },
//   default: {
//     sans: 'normal',
//     serif: 'serif',
//     rounded: 'normal',
//     mono: 'monospace',
//   },
//   web: {
//     sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
//     serif: "Georgia, 'Times New Roman', serif",
//     rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
//     mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
//   },
// });

import type { AppSettings, FontSizeSetting } from '@/src/context/settingpagecontext';

export const Colors = {
  light: {
    text: '#1A1007',
    background: '#FAF8F5',
    surface: '#FFFFFF',
    border: '#E8E0D4',
    tint: '#01AFEE',
  },
  dark: {
    text: '#F5F0EA',
    background: '#0F0F0F',
    surface: '#1A1A1A',
    border: '#2E2E2E',
    tint: '#01AFEE',
  },
};

export const fontSizeMap: Record<FontSizeSetting, number> = {
  sm: 14,
  md: 16,
  lg: 20,
  xl: 24,
};

export function getAppColors(settings: AppSettings) {
  const mode = settings.theme === 'dark' ? 'dark' : 'light';
  const base = Colors[mode];

  return {
    ...base,
    textMuted: mode === 'dark' ? '#B7AA97' : '#7A6A54',
    surfaceAlt: mode === 'dark' ? '#242424' : '#F5F0EA',
    accent: '#F97316',
    danger: '#DC2626',
    isDark: mode === 'dark',
    border:
      settings.contrastMode === 'high'
        ? '#F97316'
        : base.border,
  };
}