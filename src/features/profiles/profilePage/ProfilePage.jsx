import React from 'react';
import { Grid } from 'semantic-ui-react';
import ProfileHeader from './ProfileHeader';
import ProfileContent from './ProfileContent';
import { useDispatch, useSelector } from 'react-redux';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useFirestoreDoc } from '../../../app/hooks/useFirestoreDoc';
import {
  listenToCurrentUserProfile,
  listenToSelectedUserProfile,
} from '../profileActions';
import { getUserProfile } from '../../../app/firestore/firestoreService';

const ProfilePage = ({ match }) => {
  const dispatch = useDispatch();

  const { selectedUserProfile } = useSelector((state) => state.profile);
  const { currentUser } = useSelector((state) => state.auth);
  const { loading, error } = useSelector((state) => state.async);

  useFirestoreDoc({
    query: () => getUserProfile(match.params.id),
    data: (profile) => dispatch(listenToSelectedUserProfile(profile)),
    deps: [dispatch, match.params.id],
  });

  if ((loading && !selectedUserProfile) || (!selectedUserProfile && !error)) {
    return <LoadingComponent content="Loading Profile" />;
  }

  return (
    <>
      <Grid>
        <Grid.Column width={16}>
          <ProfileHeader
            profile={selectedUserProfile}
            isCurrentUser={currentUser.uid === selectedUserProfile.id}
          />
          <ProfileContent
            profile={selectedUserProfile}
            isCurrentUser={currentUser.uid === selectedUserProfile.id}
          />
        </Grid.Column>
      </Grid>
    </>
  );
};

export default ProfilePage;
