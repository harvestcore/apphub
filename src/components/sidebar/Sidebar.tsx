import React, { useState, useEffect } from 'react';

import { Box, IconButton, Tooltip, Badge } from '@mui/material';
import appManager from '../../api/appManager';
import { App } from '../../types';

export default function Sidebar() {
    const [apps, setApps] = useState<App[]>(appManager.apps);

    useEffect(() => {
        appManager.dataChangedNotifier.addCallback(() => {
            setApps(appManager.apps);
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
                backgroundColor: '#dddddd'
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
                        invisible={appManager.isLatestVersion}
                        color="primary"
                    >
                        <IconButton size="small" onClick={handleAboutClick}>
                            <i className="fa-solid fa-at" />
                        </IconButton>
                    </Badge>
                </Tooltip>
            </Box>
        </Box>
    );
}
