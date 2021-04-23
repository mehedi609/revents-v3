import firebase from 'firebase';

export function signInWithEmail(creds) {
  return firebase
    .auth()
    .signInWithEmailAndPassword(creds.email, creds.password);
}
