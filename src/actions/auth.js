import Swal from 'sweetalert2';

import { types } from '../types/types';
import { firebase, googleAuthProvider } from '../firebase/firebase-config';
import { startLoading, stopLoading } from './ui';
import { notesLogout } from './notes';

// Async actions
export const startLoginEmailPassword = (email, password) => 
    (dispatch) => {
        dispatch( startLoading() );

        firebase.auth().signInWithEmailAndPassword( email, password )
            .then(({ user }) => {
                dispatch( login(user.uid, user.displayName) );

                dispatch( stopLoading() );
            }).catch( error => {
                Swal.fire('Error', error.message, 'error');
                dispatch( stopLoading() );
            });
    }

export const startGoogleLogin = () => 
    ( dispatch ) => {  
        firebase.auth().signInWithPopup( googleAuthProvider )
            .then( ({ user }) => { dispatch( login(user.uid, user.displayName) ) })
    }
    
export const startRegisterWithEmailPasswordName = (email, password, name) => 
    ( dispatch ) => {
        firebase.auth().createUserWithEmailAndPassword( email, password )
        .then( async ({ user }) => { 
            await user.updateProfile({ displayName: name });
            
            dispatch( login(user.uid, user.displayName) ) 
        }).catch( error => {
            Swal.fire('Error', error.message, 'error');
        })
    }

export const makeLogout = () => 
    async ( dispatch ) => {
        await firebase.auth().signOut();

        dispatch( logout() );
        dispatch( notesLogout() );
    }

// Sync actions
export const login = (uid, displayName) => ({
    type: types.login,
    payload: {
        uid,
        displayName
    } 
});

export const logout = () => ({
    type: types.logout
});