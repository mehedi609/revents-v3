import React from 'react';
import { Grid } from 'semantic-ui-react';
import ProfileHeader from './ProfileHeader';
import ProfileContent from './ProfileContent';
import { useDispatch, useSelector } from 'react-redux';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useFirestoreDoc } from '../../../app/hooks/useFirestoreDoc';
import { listenToCurrentUserProfile } from '../profileActions';
import { getUserProfile } from '../../../app/firestore/firestoreService';

const ProfilePage = ({ match }) => {
  const dispatch = useDispatch();

  const { currentUserProfile } = useSelector((state) => state.profile);
  const { loading, error } = useSelector((state) => state.async);

  useFirestoreDoc({
    query: () => getUserProfile(match.params.id),
    data: (profile) => dispatch(listenToCurrentUserProfile(profile)),
    deps: [dispatch, match.params.id],
  });

  if ((loading && !currentUserProfile) || (!currentUserProfile && !error)) {
    return <LoadingComponent content="Loading Profile" />;
  }

  return (
    <>
      <Grid>
        <Grid.Column width={16}>
          <ProfileHeader profile={currentUserProfile} />
          <ProfileContent profile={currentUserProfile} />
        </Grid.Column>
      </Grid>
    </>
  );
};

export default ProfilePage;
