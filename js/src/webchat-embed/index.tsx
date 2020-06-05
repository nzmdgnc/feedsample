import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { styled } from '../webchat-ui/style';
import uuid from 'uuid';
import './embedded-webchat-styles.css';

// load plugins
import '../plugins/get-started-button-input';
import '../plugins/date-picker';
import '../plugins/messenger';
import { Webchat } from '../webchat/components/Webchat';


type SocketOptions = React.ComponentProps<typeof Webchat>['options'];
type WebchatSettings = React.ComponentProps<typeof Webchat>['settings'];

type InitWebchatOptions = SocketOptions & {
    settings?: WebchatSettings;
}

const initWebchat = async (webchatConfigUrl: string, options?: InitWebchatOptions, callback?: (webchat: Webchat) => void) => {
    // @ts-ignore
    const messagePlugins = (window.cognigyWebchatMessagePlugins || [])
        .map(plugin => typeof plugin === 'function'
            ? plugin({ React, styled })
            : plugin
        )
        .map(plugin => typeof plugin.match === 'string'
            ? { ...plugin, match: ({ data }) => data && data._plugin && data._plugin.type === plugin.match }
            : plugin
        );

    // @ts-ignore
    const inputPlugins = (window.cognigyWebchatInputPlugins || [])
        .map(plugin => typeof plugin === 'function'
            ? plugin({ React, styled })
            : plugin
        );

    const disableLocalStorage = options && options.settings && options.settings.disableLocalStorage;
    const useSessionStorage = options && options.settings && options.settings.useSessionStorage;
    const browserStorage = useSessionStorage ? sessionStorage : localStorage;

    // if no specific userId is provided, try to load one from localStorage/sessionStorage, otherwise generate one and persist it in localStorage/sessionStorage
    if ((!options || !options.userId) && browserStorage) {
        let userId = browserStorage.getItem('userId');

        if (!userId) {
            userId = uuid.v4();
            if (!disableLocalStorage) browserStorage.setItem('userId', userId);
        }

        if (!options)
            options = {}

        options.userId = userId;
    }

    let settings: Partial<WebchatSettings> = {};
    if (options && options.settings) {
        settings = options.settings;
        options.settings = undefined;
    }

    const webchatRoot = document.createElement('div');
    document.body.appendChild(webchatRoot);

    let cognigyWebchat: Webchat | null = null;

    ReactDOM.render(
        (
            <Webchat
                ref={ref => cognigyWebchat = ref}
                url={webchatConfigUrl}
                options={options}
                settings={settings}
                messagePlugins={messagePlugins}
                inputPlugins={inputPlugins}
            />
        ),
        webchatRoot
    );

    // the ref call might not be executed synchronously
    while (!cognigyWebchat) {
        await new Promise(resolve => setTimeout(resolve, 500));
    }
    if (callback) {
        return callback(cognigyWebchat)
    }

    return cognigyWebchat;
};

// @ts-ignore
window.initWebchat = initWebchat;

// @ts-ignore
window.__COGNIGY_WEBCHAT = {
    React
};