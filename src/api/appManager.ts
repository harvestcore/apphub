import { getSettings } from './settings';
import { getLatestVersion, getCurrentVersion } from './version';
import Notifier from './notifier';
import { App } from '../types';

/**
 * AppHub app manager.
 */
class AppManager {
    // AppHub versions.
    private _latestVersion: string = '';
    private _currentVersion: string = '';

    // Configured applications.
    private _apps: App[] = [];

    // App settings.
    private _settings: any = {};

    // Current displayed app.
    private _currentApp: App | null = null;

    // Notifiers.
    private _appChangedNotifier: Notifier = new Notifier();
    private _settingsChangedNotifier: Notifier = new Notifier();

    constructor() {
        // Get the latest version from GitHub.
        getLatestVersion((version: string) => {
            if (version) {
                this._latestVersion = version;
                this.settingsChangedNotifier.executeCallbacks();
            }
        });

        // Get the current version.
        getCurrentVersion((version: string) => {
            if (version) {
                this._currentVersion = version;
                this.settingsChangedNotifier.executeCallbacks();
            }
        });

        // Setup settings.
        getSettings((settings: any) => {
            this._settings = settings;

            this.setAppSettings();
            this.settingsChangedNotifier.executeCallbacks();
        });
    }

    /**
     * Set the application settings.
     */
    private setAppSettings() {
        // Set the app title
        document.title = this.appName;

        // Favicon URL.
        const appFaviconEl = document.getElementById('app-favicon');
        if (appFaviconEl && this.extraSettings.faviconURL) {
            appFaviconEl.setAttribute('href', this.extraSettings.faviconURL);
        }

        // Configured apps.
        this._apps = this._settings.apps || [];
    }

    /**
     * Returns the app name.
     */
    get appName(): string {
        return this._settings.name || 'Unnamed';
    }

    /**
     * Returns the version of AppHub.
     */
    get currentVersion() {
        return this._currentVersion || '0.0.0';
    }

    /**
     * Returns the latest version.
     */
    get latestVersion() {
        return this._latestVersion || '0.0.0';
    }

    /**
     * Returns whether the current version is the latest version or not.
     */
    get isLatestVersion(): boolean {
        if (!this._latestVersion) {
            return true;
        }

        return this._currentVersion === this._latestVersion;
    }

    /**
     * Returns the configured apps.
     */
    get apps(): App[] {
        return this._apps || [];
    }

    /**
     * Returns the current app.
     */
    get currentApp(): App | null {
        return this._currentApp;
    }

    /**
     * Returns the appChangedNotifier, which triggers when the selected application changes.
     */
    get appChangedNotifier(): Notifier {
        return this._appChangedNotifier;
    }

    /**
     * Returns the settingsChangedNotifier, which triggers when the settings change.
     */
    get settingsChangedNotifier(): Notifier {
        return this._settingsChangedNotifier;
    }

    /**
     * Returns the extra settings.
     */
    get extraSettings(): any {
        return this._settings?.extra || {};
    }

    /**
     * Changes the current app.
     * @param app The app to set as the current app.
     */
    public changeApp(app: App | null): void {
        this._currentApp = app;
        this._appChangedNotifier.executeCallbacks();
    }
}

export default new AppManager();
