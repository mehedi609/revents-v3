import React, { useState } from 'react';
import { Button, Card, Grid, Header, Image, Tab } from 'semantic-ui-react';
import PhotoUploadWidget from '../../../app/common/photos/PhotoUploadWidget';

const PhotosTab = ({ profile, isCurrentUser }) => {
  const [editMode, setEditMode] = useState(true);
  return (
    <>
      <Tab.Pane>
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
              <PhotoUploadWidget />
            ) : (
              <>
                <Card.Group itemsPerRow={5}>
                  {/*{photos.map((photo) => (*/}
                  <Card key={`photo.id`}>
                    <Image src={`/assets/user.png`} />
                    <Button.Group fluid widths={2}>
                      <Button
                        name={`photo.id`}
                        /*loading={
                            updating.isUpdating && updating.target === photo.id
                          }*/
                        onClick={(e) => console.log('photo, e.target.name')}
                        disabled={`photo.url === profile.photoURL`}
                        basic
                        color="green"
                        content="Main"
                      />
                      <Button
                        name={`photo.id`}
                        onClick={(e) => console.log('onClick')}
                        // loading={deleting.isDeleting && deleting.target === photo.id}
                        disabled={`photo.url === profile.photoURL`}
                        basic
                        color="red"
                        icon="trash"
                      />
                    </Button.Group>
                  </Card>
                  {/* ))}*/}
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
