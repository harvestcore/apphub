import React, { useEffect, useState } from 'react';

import { Box, Typography } from '@mui/material';
import appManager from '../../api/appManager';
import { App } from '../../types';

function getSettings() {
    return {
        backgroundColor:
            appManager.extraSettings?.backgroundColor?.canvas || '#dddddd',
        noOfApps: appManager.apps.length || 0
    };
}

function EmptyPage({ noOfApps }: { noOfApps: number }) {
    const zeroApps = noOfApps === 0;

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem'
            }}
        >
            <Typography>
                {zeroApps
                    ? 'No apps found were found'
                    : 'Select an app from the sidebar'}
            </Typography>
            <i
                className={
                    zeroApps
                        ? 'fa-solid fa-face-frown'
                        : 'fa-solid fa-arrow-left-long'
                }
            />
        </Box>
    );
}

export default function Canvas() {
    const [app, setApp] = useState<App | null>(appManager.currentApp);
    const [settings, setSettings] = useState<any>(getSettings());

    useEffect(() => {
        appManager.appChangedNotifier.addCallback(() => {
            setApp(appManager.currentApp);
        });

        appManager.settingsChangedNotifier.addCallback(() => {
            setSettings(getSettings());
        });
    }, []);

    return (
        <Box
            sx={{
                width: '100%',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: settings.backgroundColor
            }}
        >
            {!app && <EmptyPage noOfApps={settings.noOfApps} />}
            {app && (
                <iframe
                    width="100%"
                    height="100%"
                    title={app.name}
                    src={app.url}
                    style={{ border: 'none' }}
                />
            )}
        </Box>
    );
}
