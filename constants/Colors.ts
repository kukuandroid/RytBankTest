/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const primaryColor = '#0101e5';
const tintColorLight = '#0F172A';
const subColor = '#5050acff';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#0F172A',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    subColor: subColor,
    primaryColor: primaryColor,
  },
  dark: {
    text: '#ECEDEE',
    background: '#0F172A',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    subColor: subColor,
    primaryColor: primaryColor,
  },
};
