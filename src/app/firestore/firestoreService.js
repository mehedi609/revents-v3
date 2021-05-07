import firebase from '../config/firebase';

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

const usersCollectionRef = db.collection('users');

const eventsCollectionRef = db.collection('events');

export const listenToEventsFromFirestore = (predicate) => {
  const user = firebase.auth().currentUser;
  let eventsRef = db.collection('events').orderBy('date');

  switch (predicate.get('filter')) {
    case 'isGoing':
      return eventsRef
        .where('attendeeIds', 'array-contains', user.uid)
        .where('date', '>=', predicate.get('startDate'));
    case 'isHosting':
      return eventsRef
        .where('hostUid', '==', user.uid)
        .where('date', '>=', predicate.get('startDate'));
    default:
      return eventsRef.where('date', '>=', predicate.get('startDate'));
  }
};

export const listenToEventFromFirestore = (eventId) => {
  return db.collection('events').doc(eventId);
};

export const addEventToFirestore = (event) => {
  const user = firebase.auth().currentUser;

  return eventsCollectionRef.add({
    ...event,
    hostUid: user.uid,
    hostedBy: user.displayName,
    hostPhotoURL: user.photoURL || null,
    attendees: firebase.firestore.FieldValue.arrayUnion({
      id: user.uid,
      name: user.displayName,
      photoURL: user.photoURL || null,
    }),
    attendeeIds: firebase.firestore.FieldValue.arrayUnion(user.uid),
  });
};

export const updateEventInFirestore = (event) => {
  return eventsCollectionRef.doc(event.id).update(event);
};

export const deleteEventInFirestore = (eventId) => {
  return eventsCollectionRef.doc(eventId).delete();
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
    return await usersCollectionRef.doc(user.uid).update(profile);
  } catch (e) {
    throw e;
  }
}

export async function updateUserProfilePhoto(downloadURL, filename) {
  const user = firebase.auth().currentUser;
  const userDocRef = usersCollectionRef.doc(user.uid);

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
  return getUserProfile(userId).collection('photos');
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
  return getUserProfile(user.uid).collection('photos').doc(photoId).delete();
}

export function addUserAttendance(event) {
  const user = firebase.auth().currentUser;
  return eventsCollectionRef.doc(event.id).update({
    attendees: firebase.firestore.FieldValue.arrayUnion({
      id: user.uid,
      name: user.displayName,
      photoURL: user.photoURL || null,
    }),
    attendeeIds: firebase.firestore.FieldValue.arrayUnion(user.uid),
  });
}

export async function cancelUserAttendance(event) {
  const user = firebase.auth().currentUser;
  const eventDocRef = eventsCollectionRef.doc(event.id);
  try {
    const eventDoc = await eventDocRef.get();
    const updatedAttendees = eventDoc.exists
      ? eventDoc.data().attendees.filter((a) => a.id !== user.uid)
      : [];
    return eventDocRef.update({
      attendees: updatedAttendees,
      attendeeIds: firebase.firestore.FieldValue.arrayRemove(user.uid),
    });
  } catch (e) {
    throw e;
  }
}
