import firebase from 'firebase';

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
    return await result.user.updateProfile({ displayName: creds.displayName });
  } catch (e) {
    throw e;
  }
}
