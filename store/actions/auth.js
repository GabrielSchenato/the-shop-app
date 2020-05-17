import { API_AUTH_SIGNUP_FIREBASE, API_KEY, API_AUTH_SIGNIN_FIREBASE } from "../../constants/Env";

export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';

export const signup = (email, password) => {
    return async dispatch => {

        const response = await fetch(`${API_AUTH_SIGNUP_FIREBASE}${API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password,
                returnSecureToken: true
            })
        });

        if (!response.ok) {
            const errorResData = await response.json();
            const errorId = errorResData.error.message;

            let message = 'Something went wrong!';
            if (errorId === 'EMAIL_EXISTS') {
                message = 'This email exists already!';
            }
            throw new Error(message);
        }


        const resData = await response.json();

        dispatch({
            type: SIGNUP,
            token: resData.idToken,
            userId: resData.localId
        });
    };
};

export const login = (email, password) => {
    return async dispatch => {

        const response = await fetch(`${API_AUTH_SIGNIN_FIREBASE}${API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password,
                returnSecureToken: true
            })
        });

        if (!response.ok) {
            const errorResData = await response.json();
            const errorId = errorResData.error.message;

            let message = 'Something went wrong!';
            if (errorId === 'EMAIL_NOT_FOUND') {
                message = 'This email could not be found!';
            } else if (errorId === 'INVALID_PASSWORD') {
                message = 'This password is not valid!';
            }
            throw new Error(message);
        }

        const resData = await response.json();

        dispatch({
            type: LOGIN,
            token: resData.idToken,
            userId: resData.localId
        });
    };
};