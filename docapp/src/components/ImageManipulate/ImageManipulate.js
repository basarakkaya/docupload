import React, { useState, useCallback, useEffect } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Slider,
  Typography,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Cropper from 'react-easy-crop';

import getImage from './cropImage';

const styles = (theme) => ({
  cropContainer: {
    position: 'relative',
    width: '100%',
    height: 200,
    background: '#333',
    [theme.breakpoints.up('sm')]: {
      height: 400,
    },
  },
  cropButton: {
    flexShrink: 0,
    marginLeft: 16,
  },
  controls: {
    padding: 16,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  },
  sliderContainer: {
    display: 'flex',
    flex: '1',
    alignItems: 'center',
  },
  sliderLabel: {
    [theme.breakpoints.down('xs')]: {
      minWidth: 65,
    },
  },
  slider: {
    padding: '22px 0px',
    marginLeft: 16,
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
      alignItems: 'center',
      margin: '0 16px',
    },
  },
  thumb: {
    backgroundColor: '#ff4500',
  },
  dialogPaper: {
    width: '100%',
  },
});

const ImageManipulate = ({
  classes,
  options: { image, onComplete, onCancel },
}) => {
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  // when image changes
  useEffect(() => {
    setZoom(1);
    setRotation(0);
    setCrop({ x: 0, y: 0 });
    setCroppedAreaPixels(null);
    setCroppedImage(null);
  }, [image]);

  const onClose = () => {
    setCroppedImage(null);
    onCancel();
  };

  const approveManipulation = useCallback(async () => {
    try {
      const img = await getImage(image, croppedAreaPixels, rotation);

      onComplete(img);
    } catch (error) {
      console.error(error);
      onClose();
    }
  });

  return (
    <Dialog
      open={Boolean(image)}
      onClose={onClose}
      classes={{ paper: classes.dialogPaper }}
    >
      <DialogTitle>Görseli Düzenle</DialogTitle>
      <DialogContent>
        <div className={classes.cropContainer}>
          <Cropper
            image={image}
            crop={crop}
            rotation={rotation}
            zoom={zoom}
            aspect={4 / 3}
            onCropChange={setCrop}
            onRotationChange={setRotation}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
        </div>
        <div className={classes.controls}>
          <Typography
            variant='overline'
            classes={{ root: classes.sliderLabel }}
          >
            Zoom
          </Typography>
          <Slider
            value={zoom}
            min={1}
            max={3}
            step={0.1}
            aria-labelledby='Zoom'
            classes={{
              root: classes.slider,
              thumb: classes.thumb,
              rail: classes.thumb,
              track: classes.thumb,
            }}
            onChange={(e, zoom) => setZoom(zoom)}
          />
          <Typography
            variant='overline'
            classes={{ root: classes.sliderLabel }}
          >
            Rotation
          </Typography>
          <Slider
            value={rotation}
            min={-180}
            max={180}
            step={1}
            aria-labelledby='Rotation'
            classes={{
              root: classes.slider,
              thumb: classes.thumb,
              rail: classes.thumb,
              track: classes.thumb,
            }}
            onChange={(e, rotation) => setRotation(rotation)}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>İptal</Button>
        <Button onClick={approveManipulation}>Onayla</Button>
      </DialogActions>
    </Dialog>
  );
};

export default withStyles(styles)(ImageManipulate);
