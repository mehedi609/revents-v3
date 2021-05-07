import firebase from '../config/firebase';
import cuid from 'cuid';

const db = firebase.firestore();

export function dataFromSnapshot(snapshot) {
  if (!snapshot.exists) {
    return undefined;
  }

  const data = snapshot.data();

  for (const prop in data) {
    if (data.hasOwnProperty(prop)) {
      if (data[prop] instanceof firebase.firestore.Timestamp) {
        data[prop] = data[prop].toDate();
      }
    }
  }

  return {
    ...data,
    id: snapshot.id,
  };
}

const usersRef = db.collection('users');

// const eventsRef = db.collection('events');

export const listenToEventsFromFirestore = () => {
  return db.collection('events').orderBy('date');
};

export const listenToEventFromFirestore = (eventId) => {
  return db.collection('events').doc(eventId);
};

export const addEventToFirestore = (event) => {
  return db.collection('events').add({
    ...event,
    hostedBy: 'Akhi',
    hostPhotoURL: 'https://randomuser.me/api/portraits/women/20.jpg',
    attendees: firebase.firestore.FieldValue.arrayUnion({
      id: cuid(),
      name: 'Akhi',
      photoURL: 'https://randomuser.me/api/portraits/women/20.jpg',
    }),
  });
};

export const updateEventInFirestore = (event) => {
  return db.collection('events').doc(event.id).update(event);
};

export const deleteEventInFirestore = (eventId) => {
  return db.collection('events').doc(eventId).delete();
};

export const cancelEventToggle = (event) => {
  return db.collection('events').doc(event.id).update({
    isCancelled: !event.isCancelled,
  });
};

export function setUserProfileData(user) {
  return db
    .collection('users')
    .doc(user.uid)
    .set({
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL || null,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
}

export const getUserProfile = (userId) => {
  return db.collection('users').doc(userId);
};

export async function updateUserProfile(profile) {
  const user = firebase.auth().currentUser;
  try {
    if (user && user.displayName === profile.displayName) {
      await user.updateProfile({
        displayName: profile.displayName,
      });
    }
    return await usersRef.doc(user.uid).update(profile);
  } catch (e) {
    throw e;
  }
}

export async function updateUserProfilePhoto(downloadURL, filename) {
  const user = firebase.auth().currentUser;
  const userDocRef = usersRef.doc(user.uid);

  try {
    const userDoc = await userDocRef.get();
    if (!userDoc.data().photoURL) {
      await user.updateProfile({ photoURL: downloadURL });
      await userDocRef.update({ photoURL: downloadURL });
    }

    return await userDocRef.collection('photos').add({
      name: filename,
      url: downloadURL,
    });
  } catch (e) {
    throw e;
  }
}

// const user = firebase.auth().currentUser;

export function getUserPhoto(userId) {
  return getUserProfile(userId).collection('photos')
}

export async function setMainPhoto(photo) {
  const user = firebase.auth().currentUser;
  try {
    await getUserProfile(user.uid).update({ photoURL: photo.url });
    return await user.updateProfile({ photoURL: photo.url });
  } catch (e) {
    throw e;
  }
}

export function deletePhotoFromCollection(photoId) {
  const user = firebase.auth().currentUser;
  return getUserProfile(user.uid).collection('photos').doc(photoId).delete()
}
