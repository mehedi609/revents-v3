import firebase from 'firebase';
import { setUserProfileData } from './firestoreService';
import { toast } from 'react-toastify';

export function firebaseObjectToArray(snapshot) {
  return Object.entries(snapshot).map((e) =>
    Object.assign({}, { id: e[0] }, { ...e[1] }),
  );
}

export function signInWithEmail(creds) {
  return firebase
    .auth()
    .signInWithEmailAndPassword(creds.email, creds.password);
}

export const signOutFirebase = () => firebase.auth().signOut();

export async function registerInFirebase(creds) {
  try {
    const result = await firebase
      .auth()
      .createUserWithEmailAndPassword(creds.email, creds.password);
    await result.user.updateProfile({ displayName: creds.displayName });
    return await setUserProfileData(result.user);
  } catch (e) {
    throw e;
  }
}

export async function socialLogin(selectedProvider) {
  let provider;
  if (selectedProvider === 'facebook')
    provider = new firebase.auth.FacebookAuthProvider();

  if (selectedProvider === 'google')
    provider = new firebase.auth.GoogleAuthProvider();

  try {
    const result = await firebase.auth().signInWithPopup(provider);
    console.log(result);
    if (result.additionalUserInfo.isNewUser) {
      return await setUserProfileData(result.user);
    }
  } catch (e) {
    toast.error(e.message);
  }
}

const storageRef = firebase.storage().ref();
export function getAuthUser() {
  return firebase.auth().currentUser;
}
// const user = firebase.auth().currentUser;

export function updateUserPassword(creds) {
  // const user = firebase.auth().currentUser;
  const user = getAuthUser();
  return user.updatePassword(creds.newPassword1);
}

export function uploadToFirebaseStorage(file, filename) {
  // const user = firebase.auth().currentUser;
  // const storageRef = firebase.storage().ref();
  const user = getAuthUser();
  return storageRef.child(`${user.uid}/user_images/${filename}`).put(file);
}

export function deletePhotoFromFirebaseStorage(photo) {
  // const user = firebase.auth().currentUser;
  // const storageRef = firebase.storage().ref();
  const user = getAuthUser();
  return storageRef.child(`${user.uid}/user_images/${photo.name}`).delete();
}

// const database = firebase.database();
const rootRef = firebase.database().ref();

export function addEventChatComment(eventId, { comment, parentId }) {
  const user = getAuthUser();
  const { uid, displayName, photoURL } = user;
  const newComment = {
    displayName,
    photoURL,
    uid,
    text: comment,
    date: Date.now(),
    parentId,
  };
  return rootRef.child(`chat/${eventId}`).push(newComment);
}

export function getEventChatRef(eventId) {
  return rootRef.child(`chat/${eventId}`).orderByKey();
}
