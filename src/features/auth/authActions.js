import { SIGN_IN_USER, SIGN_OUT_USER } from './authConstants';
import firebase from '../../app/config/firebase';
import { APP_LOADED } from '../../app/async/asyncReducer';
import {
  dataFromSnapshot,
  getUserProfile,
} from '../../app/firestore/firestoreService';
import { listenToCurrentUserProfile } from '../profiles/profileActions';

// export const signInUser = (creds) => async (dispatch) => {
//   const result = await firebase
//     .auth()
//     .signInWithEmailAndPassword(creds.email, creds.password);
//   console.log(result);
//   dispatch({
//     type: SIGN_IN_USER,
//     payload: result.user,
//   });
// };

export function signInUser(user) {
  return {
    type: SIGN_IN_USER,
    payload: user,
  };
}

export const verifyAuth = () => (dispatch) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      dispatch(signInUser(user));
      const profileRef = getUserProfile(user.uid);
      profileRef.onSnapshot((snapshot) => {
        dispatch(listenToCurrentUserProfile(dataFromSnapshot(snapshot)));
        dispatch({ type: APP_LOADED });
      });
    } else {
      dispatch(signOutUser());
      dispatch({ type: APP_LOADED });
    }
  });
};

export function signOutUser() {
  return {
    type: SIGN_OUT_USER,
  };
}
