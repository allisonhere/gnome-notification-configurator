type Color = number[];

export type NotificationTheme = {
  appNameColor: Color;
  timeColor: Color;
  backgroundColor: Color;
  titleColor: Color;
  bodyColor: Color;
  appNameFontSize: number;
  timeFontSize: number;
  titleFontSize: number;
  bodyFontSize: number;
  borderColor: Color;
  borderWidth: number;
  cornerRadius: number;
  padding: number;
  width: number;
  height: number;
  minHeight: number;
  backgroundOpacity: number;
  shadowEnabled: boolean;
  shadowColor: Color;
  shadowOffsetX: number;
  shadowOffsetY: number;
  shadowBlur: number;
  shadowSpread: number;
  blurEnabled: boolean;
  blurRadius: number;
  blurBrightness: number;
  sourceIconSize: number;
  sourceIconVisible: boolean;
  notificationIconSize: number;
  notificationIconVisible: boolean;
};

export const DEFAULT_THEME: NotificationTheme = {
  appNameColor: [0.6, 0.6, 0.607843137, 1],
  timeColor: [0.6, 0.6, 0.607843137, 1],
  backgroundColor: [0.329411765, 0.329411765, 0.352941176, 1],
  titleColor: [0.992156863, 0.992156863, 0.992156863, 1],
  bodyColor: [0.992156863, 0.992156863, 0.992156863, 1],
  appNameFontSize: 18,
  timeFontSize: 14,
  titleFontSize: 18,
  bodyFontSize: 18,
  borderColor: [1, 1, 1, 0.1],
  borderWidth: 0,
  cornerRadius: 16,
  padding: 6,
  width: 499,
  height: 0,
  minHeight: 64,
  backgroundOpacity: 100,
  shadowEnabled: true,
  shadowColor: [0, 0, 0, 0.2],
  shadowOffsetX: 0,
  shadowOffsetY: 2,
  shadowBlur: 4,
  shadowSpread: 2,
  blurEnabled: false,
  blurRadius: 24,
  blurBrightness: 1,
  sourceIconSize: 16,
  sourceIconVisible: true,
  notificationIconSize: 48,
  notificationIconVisible: true,
};
