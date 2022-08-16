import { getData, getSettings } from './data';
import { getLatestTag } from './gh';
import Notifier from './notifier';
import { App } from '../types';

class AppManager {
    private _latestVersion: string = '';
    private _currentVersion: string = '';
    private _apps: App[] = [];
    private _settings: any = {};

    private _appName: string = '';

    private _currentApp: App | null = null;
    private _appChangedNotifier: Notifier = new Notifier();
    private _dataChangedNotifier: Notifier = new Notifier();

    constructor() {
        getLatestTag((version: string) => {
            this._latestVersion = version;
        });

        getData((data: any) => {
            this._apps = data;
            this.dataChangedNotifier.executeCallbacks();
        });

        getSettings((settings: any) => {
            this._settings = settings;
            this.setAppSettings();
        });
    }

    private setAppSettings() {
        this._currentVersion = this._settings.version;
        this._appName = this._settings.name;

        document.title = this.appName;

        const appFaviconEl = document.getElementById('app-favicon');
        if (appFaviconEl && this._settings.faviconURL) {
            appFaviconEl.setAttribute('href', this._settings.faviconURL);
        }
    }

    get appName(): string {
        return this._appName || 'Unnamed';
    }

    get currentVersion() {
        return this._currentVersion || '0.0.0';
    }

    get latestVersion() {
        return this._latestVersion || '0.0.0';
    }

    get isLatestVersion(): boolean {
        if (!this._latestVersion) {
            return true;
        }

        return this._currentVersion === this._latestVersion;
    }

    get apps(): App[] {
        return this._apps || [];
    }

    get currentApp(): App | null {
        return this._currentApp;
    }

    get frameChangedNotifier(): Notifier {
        return this._appChangedNotifier;
    }

    get dataChangedNotifier(): Notifier {
        return this._dataChangedNotifier;
    }

    public changeApp(app: App): void {
        this._currentApp = app;
        this._appChangedNotifier.executeCallbacks();
    }
}

export default new AppManager();
