import type { NotificationTheme } from "./constants.js";
import { DEFAULT_THEME } from "./constants.js";

export type NotificationAction = "hide" | "close";
export type Position = "fill" | "left" | "right" | "center";
export type VerticalPosition = "fill" | "top" | "center" | "bottom";
export type Margins = {
  top: number;
  bottom: number;
  left: number;
  right: number;
};

export function normalizeAction(
  value: unknown,
  fallback: NotificationAction = "hide",
): NotificationAction {
  if (value === "close" || value === "hide") {
    return value;
  }
  return fallback;
}

export function normalizePosition(value: unknown): Position {
  return value === "fill" || value === "left" || value === "right"
    ? value
    : "center";
}

export function normalizeVerticalPosition(value: unknown): VerticalPosition {
  return value === "fill" || value === "center" || value === "bottom"
    ? value
    : "top";
}

export function normalizeBoolean(
  candidate: unknown,
  fallback: boolean,
): boolean {
  return typeof candidate === "boolean" ? candidate : fallback;
}

export function normalizeString(candidate: unknown, fallback: string): string {
  return typeof candidate === "string" ? candidate : fallback;
}

export function normalizeNumber(candidate: unknown, fallback: number): number {
  return typeof candidate === "number" && Number.isFinite(candidate)
    ? candidate
    : fallback;
}

export function normalizeInteger(candidate: unknown, fallback: number): number {
  return Math.trunc(normalizeNumber(candidate, fallback));
}

export function normalizeColor(
  candidate: unknown,
  fallback: number[],
): number[] {
  if (!Array.isArray(candidate) || candidate.length !== 4) {
    return [...fallback];
  }
  const normalized: number[] = [];
  for (const [index, value] of candidate.entries()) {
    normalized.push(normalizeNumber(value, fallback[index]));
  }
  return normalized;
}

export function normalizeMargins(candidate: unknown): Margins {
  const object = (candidate ?? {}) as Partial<Margins>;
  return {
    top: normalizeNumber(object.top, 0),
    bottom: normalizeNumber(object.bottom, 0),
    left: normalizeNumber(object.left, 0),
    right: normalizeNumber(object.right, 0),
  };
}

export function normalizeTheme(theme: unknown): NotificationTheme {
  const candidate = (theme ?? {}) as Partial<NotificationTheme>;
  return {
    appNameColor: normalizeColor(
      candidate.appNameColor,
      DEFAULT_THEME.appNameColor,
    ),
    timeColor: normalizeColor(candidate.timeColor, DEFAULT_THEME.timeColor),
    backgroundColor: normalizeColor(
      candidate.backgroundColor,
      DEFAULT_THEME.backgroundColor,
    ),
    titleColor: normalizeColor(candidate.titleColor, DEFAULT_THEME.titleColor),
    bodyColor: normalizeColor(candidate.bodyColor, DEFAULT_THEME.bodyColor),
    appNameFontSize: normalizeNumber(
      candidate.appNameFontSize,
      DEFAULT_THEME.appNameFontSize,
    ),
    timeFontSize: normalizeNumber(
      candidate.timeFontSize,
      DEFAULT_THEME.timeFontSize,
    ),
    titleFontSize: normalizeNumber(
      candidate.titleFontSize,
      DEFAULT_THEME.titleFontSize,
    ),
    bodyFontSize: normalizeNumber(
      candidate.bodyFontSize,
      DEFAULT_THEME.bodyFontSize,
    ),
    borderColor: normalizeColor(
      candidate.borderColor,
      DEFAULT_THEME.borderColor,
    ),
    borderWidth: normalizeNumber(
      candidate.borderWidth,
      DEFAULT_THEME.borderWidth,
    ),
    cornerRadius: normalizeNumber(
      candidate.cornerRadius,
      DEFAULT_THEME.cornerRadius,
    ),
    padding: normalizeNumber(candidate.padding, DEFAULT_THEME.padding),
    width: normalizeNumber(candidate.width, DEFAULT_THEME.width),
    height: normalizeNumber(candidate.height, DEFAULT_THEME.height),
    minHeight: normalizeNumber(candidate.minHeight, DEFAULT_THEME.minHeight),
    backgroundOpacity: normalizeNumber(
      candidate.backgroundOpacity,
      DEFAULT_THEME.backgroundOpacity,
    ),
    shadowEnabled: normalizeBoolean(
      candidate.shadowEnabled,
      DEFAULT_THEME.shadowEnabled,
    ),
    shadowColor: normalizeColor(
      candidate.shadowColor,
      DEFAULT_THEME.shadowColor,
    ),
    shadowOffsetX: normalizeNumber(
      candidate.shadowOffsetX,
      DEFAULT_THEME.shadowOffsetX,
    ),
    shadowOffsetY: normalizeNumber(
      candidate.shadowOffsetY,
      DEFAULT_THEME.shadowOffsetY,
    ),
    shadowBlur: normalizeNumber(candidate.shadowBlur, DEFAULT_THEME.shadowBlur),
    shadowSpread: normalizeNumber(
      candidate.shadowSpread,
      DEFAULT_THEME.shadowSpread,
    ),
    blurEnabled: normalizeBoolean(
      candidate.blurEnabled,
      DEFAULT_THEME.blurEnabled,
    ),
    blurRadius: normalizeNumber(candidate.blurRadius, DEFAULT_THEME.blurRadius),
    blurBrightness: normalizeNumber(
      candidate.blurBrightness,
      DEFAULT_THEME.blurBrightness,
    ),
    sourceIconSize: normalizeNumber(
      candidate.sourceIconSize,
      DEFAULT_THEME.sourceIconSize,
    ),
    sourceIconVisible: normalizeBoolean(
      candidate.sourceIconVisible,
      DEFAULT_THEME.sourceIconVisible,
    ),
    notificationIconSize: normalizeNumber(
      candidate.notificationIconSize,
      DEFAULT_THEME.notificationIconSize,
    ),
    notificationIconVisible: normalizeBoolean(
      candidate.notificationIconVisible,
      DEFAULT_THEME.notificationIconVisible,
    ),
  };
}
