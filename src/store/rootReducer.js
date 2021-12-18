
import { combineReducers } from "redux";

const replaceAsyncReducers = (rootReducers, keys, reducer) => {
    const key = keys.shift();
    if (keys.length === 0) {
        rootReducers[key] = reducer; // eslint-disable-line
        return;
    }
    if (!rootReducers[key]) rootReducers[key] = {}; // eslint-disable-line
    const nextRootReducers = rootReducers[key];
    replaceAsyncReducers(nextRootReducers, keys, reducer);
};

const combineAsyncReducers = asyncReducers => {
    if (typeof asyncReducers !== "object") return asyncReducers;
    const combineReducerObject = {};
    Object.keys(asyncReducers).forEach(prop => {
        const value = asyncReducers[prop];
        if (typeof value === "object") {
            combineReducerObject[prop] = combineAsyncReducers(value);
        } else if (typeof value === "function") {
            combineReducerObject[prop] = value;
        }
    });
    return combineReducers(combineReducerObject);
};

export const makeRootReducer = asyncReducers => {
    const newAsyncReducers = {};
    if (asyncReducers) {
        Object.keys(asyncReducers).forEach(key => {
            newAsyncReducers[key] = combineAsyncReducers(asyncReducers[key]);
        });
    }

    return combineReducers({
        ...newAsyncReducers
    });
};

export const injectReducer = (store, { key, reducer }) => {
    const keys = key.split(".");
    if (!reducer) return;
    replaceAsyncReducers(store.asyncReducers, keys, reducer);
    store.replaceReducer(makeRootReducer(store.asyncReducers));
    return reducer;
};

function canInjectEffect(store, key) {
    if (!key) return false;
    if (Object.keys(store.injectedEffects).includes(key)) {
        return false;
    }
    return true;
}

export const injectSaga = (store, { key, saga }) => {
    if (!saga) return;
    if (!canInjectEffect(store, key)) return;
    store.injectedEffects[key] = saga; // eslint-disable-line no-param-reassign
    store.attachSaga(saga);
};

/*
  function to inject saga.
*/
export const injectSideEffects = (store, { key, type, effect }) => {
    switch (type) {
        case "SAGA": {
            injectSaga(store, { key, saga: effect });
            break;
        }
        default:
            break;
    }
};

export default makeRootReducer;