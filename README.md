<h1 align="center">
	<img style="width:64px" src="./assets/logo.png" alt="Logo"><br>
  GNOME Notification Configurator<br>
  <img style="width:512px" src="./assets/preview.png" alt="Screenshot">
</h1>
<p align="center"><strong>Advanced GNOME notification capabilities including rate limiting, custom color theming per application, and notification positioning</strong></p>

> **Note:** This is a modified fork of
> [gnome-notification-configurator](https://github.com/ExposedCat/gnome-notification-configurator)
> by [ExposedCat](https://github.com/ExposedCat), forked July 2026 and
> maintained by [@allisonhere](https://github.com/allisonhere). Changes in this
> fork: GNOME Shell 50 support, and an Appearance page adding border, corner
> radius, padding, explicit sizing, background opacity, drop shadow, background
> blur, and icon size/visibility controls — globally and per pattern.
>
> If you find this extension useful, please support the original author:
> [ExposedCat on GitHub](https://github.com/ExposedCat).

<br>

## Features

- **Global and Pattern-Based Rules** - Configure default behavior globally or
  create enabled/disabled per-pattern overrides matched by case-insensitive
  regular expressions for app name, title, and body text
- **Notification Filtering** - Hide or close matching notifications before they
  appear
- **Notification Rate Limiting** - Hide or close frequent notifications from the
  same application within a configurable time threshold
- **Notification Center Controls** - Disable stacking for matching
  notifications and set how many notifications are kept per source
- **Notification Timeout** - Configure auto-dismiss timing, keep notifications
  visible while idle, or set timeout to `0` to keep notifications until dismissed
- **Urgency Control** - Force notifications to normal urgency when needed
- **Window Attention Handling** - Activate attention-requesting windows instead
  of showing a notification
- **Fullscreen Notifications** - Enable or disable notifications while
  applications are running in fullscreen mode
- **Notification Positioning** - Set horizontal alignment (fill, left, center,
  right) and vertical alignment (fill, top, center, bottom)
- **Custom Appearance** - Hide the app title/time row, customize background,
  title, body, app name, and time colors, and adjust text sizes
- **Shape and Sizing** - Set corner radius, border color and width, inner
  padding, explicit width/height, and a minimum height
- **Drop Shadow** - Toggle a shadow and tune its color, X/Y offset, blur, and
  spread
- **Background Blur** - Blur what sits behind a notification, with adjustable
  radius and brightness
- **Icon Controls** - Resize or hide the app source icon and the notification
  icon independently
- **Custom Margins** - Add top, bottom, left, and right notification margins
- **Test Notifications** - Send sample notifications from the preferences window
  to preview matching and styling changes

## Installation

### Extension Manager (Recommended)

- Install
  [Extension Manager](https://flathub.org/apps/com.mattjakeman.ExtensionManager)

### Manual Installation

If latest version of the extension is not yet available on the GNOME Extensions
website, you can install it manually:

1. Clone this repository:
   ```bash
   git clone https://github.com/allisonhere/gnome-notification-configurator.git
   cd gnome-notification-configurator
   ```

   (Replace with
   [the original repository](https://github.com/ExposedCat/gnome-notification-configurator)
   if you want upstream rather than this fork. Note that this fork keeps the
   `notification-configurator@exposedcat` UUID, so it installs over the upstream
   extension rather than alongside it.)

2. Install the extension:
   ```bash
   npm run install:local
   ```

   This will build the extension and install it to your local GNOME Shell
   extensions directory (`~/.local/share/gnome-shell/extensions/`).

3. Restart GNOME Shell:
   - Log out and log back in

4. Enable the extension:
   ```bash
   gnome-extensions enable notification-configurator@exposedcat
   ```

   Or use Extensions Manager app to enable "Notification Configurator".

## Development

### Development Workflow

1. **Setup development environment:**
   ```bash
   npm install
   ```

2. **Start development session:**
   ```bash
   npm start
   # Or in a container
   npm run start:container
   ```
   This will:
   - Compile TypeScript sources
   - Install to extensions directory
   - Launch nested GNOME Shell session for testing

3. **Debug the extension:**
   - Check terminal output for logs in the nested shell session
   - Access Looking Glass debugger with `Alt+F2` → `lg` for interactive
     debugging

## Translations

To add translations for the extension:

1. **Create a new translation file:**
   ```bash
   cp po/main.pot po/langcode.po
   ```
   Replace `langcode` with your language code (e.g., `po/uk.po` for Ukrainian).

2. **Edit the translation file:** Use
   [Gtranslator](https://flathub.org/apps/details/org.gnome.Gtranslator) or
   [POEdit](https://flathub.org/apps/details/net.poedit.Poedit) to edit the
   created file and make translations.

3. **Update translations when needed:** In case new labels were added or
   original labels changed, run:
   ```bash
   npm run translate
   ```
   Then update your translations if needed.

## License

This project is licensed under the GNU General Public License v3.0 or later
(GPL-3.0-or-later).

This fork is distributed under the same terms as the original project and does
not alter its license notices. Note that upstream declares `GPL-3.0-or-later`
here and `LGPL-3.0-or-later` in `package.json`; that discrepancy is the original
author's to resolve.

## Contributing

Contributions are welcome! Please feel free to submit pull requests or open
issues on the
[GitHub repository](https://github.com/ExposedCat/gnome-shell-notification-cleaner).
