import React, { useState, useEffect } from 'react';

import { Box, IconButton, Tooltip, Badge } from '@mui/material';
import appManager from '../../api/appManager';
import { App } from '../../types';

function getSettings() {
    return {
        backgroundColor:
            appManager.extraSettings?.backgroundColor?.sidebar || '#dddddd',
        showAbout: appManager.extraSettings?.showAbout,
        aboutIconColor: appManager.extraSettings?.aboutIconColor || 'default',

        showReset: appManager.extraSettings?.showReset,
        resetIconColor: appManager.extraSettings?.resetIconColor || 'default',

        isLatestVersion: appManager.isLatestVersion
    };
}

export default function Sidebar() {
    const [apps, setApps] = useState<App[]>(appManager.apps);
    const [settings, setSettings] = useState<any>(getSettings());

    useEffect(() => {
        appManager.settingsChangedNotifier.addCallback(() => {
            setApps(appManager.apps);
            setSettings(getSettings());
        });
    }, []);

    const handleAboutClick = () => {
        if (window !== null) {
            window.open(
                'https://github.com/harvestcore/apphub/releases',
                '_blank',
                'noopener,noreferrer'
            );
        }
    };

    const handleResetClick = () => {
        appManager.changeApp(null);
    };

    const getAboutTitle = () => {
        if (!appManager.isLatestVersion) {
            return `${appManager.appName} - New version ${appManager.latestVersion} available!`;
        }

        return `${appManager.appName} (v${appManager.currentVersion})`;
    };

    const handleAppClick = (app: App) => {
        appManager.changeApp(app);
    };

    return (
        <Box
            sx={{
                width: '50px',
                minWidth: '50px',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: settings.backgroundColor
            }}
        >
            <Box
                sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    alignContent: 'center'
                }}
            >
                {apps.map((app: App, index: number) => (
                    <Box sx={{ marginTop: '15px' }} key={index}>
                        <Tooltip title={app.name} placement="right">
                            <IconButton
                                size="small"
                                onClick={() => handleAppClick(app)}
                                sx={{
                                    color: app.iconColor || 'default'
                                }}
                            >
                                <i className={app.icon} />
                            </IconButton>
                        </Tooltip>
                    </Box>
                ))}
            </Box>

            {settings.showAbout && (
                <Box
                    sx={{
                        height: '50px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        alignContent: 'center'
                    }}
                >
                    <Tooltip title="Reset hub" placement="right">
                        <IconButton
                            size="small"
                            onClick={handleResetClick}
                            sx={{
                                color: settings.resetIconColor
                            }}
                        >
                            <i className="fa-solid fa-rotate-right" />
                        </IconButton>
                    </Tooltip>
                </Box>
            )}

            {settings.showAbout && (
                <Box
                    sx={{
                        height: '50px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        alignContent: 'center'
                    }}
                >
                    <Tooltip title={getAboutTitle()} placement="right">
                        <Badge
                            variant="dot"
                            invisible={settings.isLatestVersion}
                            color="primary"
                        >
                            <IconButton
                                size="small"
                                onClick={handleAboutClick}
                                sx={{
                                    color: settings.aboutIconColor
                                }}
                            >
                                <i className="fa-solid fa-at" />
                            </IconButton>
                        </Badge>
                    </Tooltip>
                </Box>
            )}
        </Box>
    );
}
