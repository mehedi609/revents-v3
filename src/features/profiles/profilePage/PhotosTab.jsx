import React, { useState } from 'react';
import { Button, Card, Grid, Header, Image, Tab } from 'semantic-ui-react';
import PhotoUploadWidget from '../../../app/common/photos/PhotoUploadWidget';
import { useDispatch, useSelector } from 'react-redux';
import { useFirestoreCollection } from '../../../app/hooks/useFirestoreCollection';
import { getUserPhoto } from '../../../app/firestore/firestoreService';
import { listenToUserPhotos } from '../profileActions';

const PhotosTab = ({ profile, isCurrentUser }) => {
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const { loading } = useSelector((state) => state.async);
  const { photos }  = useSelector((state) => state.profile)

  useFirestoreCollection({
    query: () => getUserPhoto(profile.id),
    data: (data) => dispatch(listenToUserPhotos(data)),
    deps: [profile.id, dispatch]
  })

  /*useEffect(() => {
    dispatch(asyncActionStart());
    const unsubscribe = getUserPhoto(profile.id).onSnapshot((snapshot) => {
      const photos = snapshot.docs.map((doc) => dataFromSnapshot(doc))
      dispatch(listenToUserPhotos(photos))
      dispatch(asyncActionFinish())
    }, error => dispatch(asyncActionError(error)))
    return () => {
      unsubscribe();
    };
  }, []);*/



  return (
    <>
      <Tab.Pane loading={loading}>
        <Grid>
          <Grid.Column width={16}>
            <Header floated="left" icon="user" content={`Photos`} />
            {isCurrentUser && (
              <Button
                onClick={() => setEditMode(!editMode)}
                floated="right"
                basic
                content={editMode ? 'Cancel' : 'Add Photo'}
              />
            )}
          </Grid.Column>

          <Grid.Column width={16}>
            {editMode ? (
              <PhotoUploadWidget setEditMode={setEditMode}/>
            ) : (
              <>
                <Card.Group itemsPerRow={5}>
                  {photos.map((photo) => (
                  <Card key={photo.id}>
                    <Image src={photo.url || '/assets/user.png'} />
                    <Button.Group fluid widths={2}>
                      <Button
                        name={photo.id}
                        /*loading={
                            updating.isUpdating && updating.target === photo.id
                          }*/
                        onClick={(e) => console.log('photo, e.target.name')}
                        // disabled={`photo.url === profile.photoURL`}
                        basic
                        color="green"
                        content="Main"
                      />
                      <Button
                        name={photo.id}
                        onClick={(e) => console.log('onClick')}
                        // loading={deleting.isDeleting && deleting.target === photo.id}
                        // disabled={`photo.url === profile.photoURL`}
                        basic
                        color="red"
                        icon="trash"
                      />
                    </Button.Group>
                  </Card>
                   ))}
                </Card.Group>
              </>
            )}
          </Grid.Column>
        </Grid>
      </Tab.Pane>
    </>
  );
};

export default PhotosTab;
