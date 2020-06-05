import { Middleware } from "redux";
import { getOptionsKey } from "./options";
import { StoreState } from "../store";
import { SetOptionsAction } from "./options-reducer";
import { resetState } from "../reducer";

type Actions = SetOptionsAction

export const optionsMiddleware: Middleware<{}, StoreState> = store => next => (action: Actions) => {
    const key = getOptionsKey(store.getState().options);
    const { active } = store.getState().config; // Actual settings are loaded
    const { disableLocalStorage, disablePersistentHistory, useSessionStorage } = store.getState().config.settings;
    const browserStorage = useSessionStorage ? window.sessionStorage : window.localStorage;

    switch (action.type) {
        case 'SET_OPTIONS': {
            if (browserStorage) {
                const key = getOptionsKey(action.options);
                const persistedString = browserStorage.getItem(key);

                if (persistedString) {
                    try {
                        const persisted = JSON.parse(persistedString);

                        return next(resetState(persisted));
                    } catch (e) { }
                }
            }
        }
    }

    if (browserStorage && active && !(disablePersistentHistory || disableLocalStorage)) {
        browserStorage.setItem(key, JSON.stringify(store.getState()));
    }

    return next(action);
}