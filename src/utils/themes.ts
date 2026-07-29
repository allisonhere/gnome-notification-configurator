import Shell from "gi://Shell";
import St from "gi://St";

import {
  getMessageTrayContainer,
  resolveNotificationWidgets,
} from "../shell/notification-widgets.js";
import type { NotificationTheme } from "./constants.js";
import { DEFAULT_THEME } from "./constants.js";
import type { SettingsManager } from "./settings.js";

type Color = number[];

const BLUR_EFFECT_NAME = "notification-configurator-blur";

export class ThemesManager {
  private themeSignalId?: number;

  constructor(private settingsManager: SettingsManager) {
    settingsManager.events.on("colorsEnabledChanged", (enabled) => {
      if (enabled) {
        this.enableThemes();
      } else {
        this.disableThemes();
      }
    });
    if (settingsManager.colorsEnabled) {
      this.enableThemes();
    }
  }

  dispose() {
    this.disableThemes();
  }

  private disableThemes() {
    if (typeof this.themeSignalId === "number") {
      getMessageTrayContainer()?.disconnect(this.themeSignalId);
      this.themeSignalId = undefined;
    }
  }

  private makeColorValue([red, green, blue, alpha]: Color): string {
    const redComponent = Math.round(red * 255);
    const greenComponent = Math.round(green * 255);
    const blueComponent = Math.round(blue * 255);
    return `rgba(${redComponent}, ${greenComponent}, ${blueComponent}, ${alpha})`;
  }

  private makeColorStyle(
    color: Color,
    kind: "color" | "background-color" = "color",
  ): string {
    return `${kind}: ${this.makeColorValue(color)};`;
  }

  private makeFontSizeStyle(fontSize: number): string {
    return `font-size: ${fontSize}px;`;
  }

  private makeStyle(color: Color, fontSize: number): string {
    return `${this.makeColorStyle(color)} ${this.makeFontSizeStyle(fontSize)}`;
  }

  private makeContainerStyle(theme: NotificationTheme): string {
    const [red, green, blue] = theme.backgroundColor;
    const background = [red, green, blue, theme.backgroundOpacity / 100];
    const declarations = [
      this.makeColorStyle(background, "background-color"),
      `border-radius: ${theme.cornerRadius}px;`,
    ];

    if (theme.shadowEnabled) {
      const shadowExtentBottom =
        Math.max(0, theme.shadowOffsetY) +
        theme.shadowBlur +
        theme.shadowSpread;
      const shadowExtentTop =
        Math.max(0, -theme.shadowOffsetY) +
        theme.shadowBlur +
        theme.shadowSpread;
      const shadowExtentRight =
        Math.max(0, theme.shadowOffsetX) +
        theme.shadowBlur +
        theme.shadowSpread;
      const shadowExtentLeft =
        Math.max(0, -theme.shadowOffsetX) +
        theme.shadowBlur +
        theme.shadowSpread;

      declarations.push(
        `padding-top: ${theme.padding + shadowExtentTop}px;`,
        `padding-bottom: ${theme.padding + shadowExtentBottom}px;`,
        `padding-left: ${theme.padding + shadowExtentLeft}px;`,
        `padding-right: ${theme.padding + shadowExtentRight}px;`,
        `box-shadow: ${theme.shadowOffsetX}px ${theme.shadowOffsetY}px ${theme.shadowBlur}px ${theme.shadowSpread}px ${this.makeColorValue(theme.shadowColor)};`,
      );
    } else {
      declarations.push(`padding: ${theme.padding}px;`, "box-shadow: none;");
    }

    if (theme.borderWidth > 0) {
      declarations.push(
        `border: ${theme.borderWidth}px solid ${this.makeColorValue(theme.borderColor)};`,
      );
    }
    if (theme.width > 0) {
      declarations.push(`width: ${theme.width}px;`);
    }
    if (theme.height > 0) {
      declarations.push(`height: ${theme.height}px;`);
    }
    if (theme.minHeight > 0) {
      declarations.push(`min-height: ${theme.minHeight}px;`);
    }

    return declarations.join(" ");
  }

  private applyIcon(
    icon: St.Widget | null,
    size: number,
    visible: boolean,
  ): void {
    if (!icon) return;

    icon.set_style(`icon-size: ${size}px;`);
    if (!visible) {
      icon.hide();
    }
  }

  private applyBlur(container: St.Widget, theme: NotificationTheme): void {
    const existing = container.get_effect(BLUR_EFFECT_NAME);

    if (!theme.blurEnabled) {
      if (existing) {
        container.remove_effect_by_name(BLUR_EFFECT_NAME);
      }
      return;
    }

    const scaleFactor = St.ThemeContext.get_for_stage(
      global.stage,
    ).scale_factor;
    const effect =
      (existing as Shell.BlurEffect | null) ??
      new Shell.BlurEffect({ mode: Shell.BlurMode.BACKGROUND });
    effect.set({
      radius: theme.blurRadius * scaleFactor,
      brightness: theme.blurBrightness,
    });

    if (!existing) {
      container.add_effect_with_name(BLUR_EFFECT_NAME, effect);
    }
  }

  private enableThemes() {
    const messageTrayContainer = getMessageTrayContainer();

    this.themeSignalId = messageTrayContainer?.connect("child-added", () => {
      if (!this.settingsManager.colorsEnabled) return;

      const widgets = resolveNotificationWidgets(messageTrayContainer);
      if (!widgets) return;

      const theme = this.settingsManager.getThemeFor(
        widgets.sourceName,
        widgets.titleText,
        widgets.bodyText,
      );
      if (!theme) return;

      widgets.source?.set_style(
        this.makeStyle(
          theme.appNameColor,
          theme.appNameFontSize ?? DEFAULT_THEME.appNameFontSize,
        ),
      );
      widgets.time?.set_style(
        this.makeStyle(
          theme.timeColor,
          theme.timeFontSize ?? DEFAULT_THEME.timeFontSize,
        ),
      );
      widgets.title?.set_style(
        this.makeStyle(
          theme.titleColor,
          theme.titleFontSize ?? DEFAULT_THEME.titleFontSize,
        ),
      );
      widgets.body?.set_style(
        this.makeStyle(
          theme.bodyColor,
          theme.bodyFontSize ?? DEFAULT_THEME.bodyFontSize,
        ),
      );

      this.applyIcon(
        widgets.sourceIcon,
        theme.sourceIconSize,
        theme.sourceIconVisible,
      );
      this.applyIcon(
        widgets.notificationIcon,
        theme.notificationIconSize,
        theme.notificationIconVisible,
      );

      widgets.container?.set_style(this.makeContainerStyle(theme));
      if (widgets.container) {
        widgets.container.clip_to_allocation = theme.shadowEnabled;
        this.applyBlur(widgets.container, theme);
      }
    });
  }
}
