import { types } from "../types/types"

export const setError = (error) => ({
    type: types.uiSetError,
    payload: error
});

export const removeError = () => ({
    type: types.uiRemoveError
});

export const startLoading = () => ({
    type: types.uiStartLoading,
    payload: true
});

export const stopLoading = () => ({
    type: types.uiStopLoading,
    payload: false
});