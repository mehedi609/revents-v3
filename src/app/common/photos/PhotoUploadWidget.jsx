import React, { useState } from 'react';
import { Button, Grid, Header } from 'semantic-ui-react';
import PhotoWidgetDropzone from './PhotoWidgetDropzone';
import PhotoWidgetCropper from './PhotoWidgetCropper';

const PhotoUploadWidget = () => {
  const [files, setFiles] = useState([]);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Grid>
        <Grid.Column width={4}>
          <Header color="teal" sub content="Step 1 - Add Photo" />
          <PhotoWidgetDropzone setFiles={setFiles} />
        </Grid.Column>
        <Grid.Column width={1} />
        <Grid.Column width={4}>
          <Header color="teal" sub content="Step 2 - Resize" />
          {files.length > 0 && (
            <PhotoWidgetCropper
              setImage={setImage}
              imagePreview={files[0].preview}
            />
          )}
        </Grid.Column>
        <Grid.Column width={1} />
        <Grid.Column width={4}>
          <Header color="teal" sub content="Step 3 - Preview & upload" />
          {files.length > 0 && (
            <>
              <div
                className="img-preview"
                style={{ minHeight: 200, minWidth: 200, overflow: 'hidden' }}
              />
              <Button.Group>
                {/*<Button loading={loading} onClick={handleUploadImage} style={{ width: 100 }} positive icon='check' />*/}
                {/*<Button disabled={loading} onClick={handleCancelCrop} style={{ width: 100 }} icon='close' />*/}
              </Button.Group>
            </>
          )}
        </Grid.Column>
      </Grid>
    </>
  );
};

export default PhotoUploadWidget;
