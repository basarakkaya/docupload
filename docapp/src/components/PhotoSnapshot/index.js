import React, { useCallback } from 'react'
import Webcam from 'react-webcam'

import { withStyles } from '@material-ui/core/styles';
import {
    Button,
    Dialog,
    IconButton,
    DialogActions as MuiDialogActions,
    DialogContent as MuiDialogContent,
    DialogTitle as MuiDialogTitle,
    Typography
} from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';

const styles = theme => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const DialogTitle = withStyles(styles)(props => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles(theme => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

export default function PhotoSnapshot(props) {
    const webcamRef = React.createRef()

    const dataURItoBlob = (dataURI) => {
        // convert base64 to raw binary data held in a string
        // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
        var byteString = atob(dataURI.split(',')[1]);
    
        // separate out the mime component
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    
        // write the bytes of the string to an ArrayBuffer
        var ab = new ArrayBuffer(byteString.length);
        var ia = new Uint8Array(ab);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], {type: mimeString});
    
    
    }

    const capture = useCallback(
        () => {
            const imageSrc = webcamRef.current.getScreenshot();
            const imageBlob = dataURItoBlob(imageSrc)
            props.onCapture(imageSrc, imageBlob, props.captureFile)
        },
        [webcamRef]
    );

    return (
        <>
            <Dialog onClose={props.onOverlayClick} aria-labelledby="customized-dialog-title" open={true}>
                <DialogTitle id="customized-dialog-title" onClose={props.onOverlayClick}>
                    Belge Fotoğrafla
                </DialogTitle>
                <DialogContent dividers>
                    <Webcam
                        audio={false}
                        height='100%'
                        ref={webcamRef}
                        screenshotFormat="image/png"
                        width='100%'
                        videoConstraints={{
                            facingMode: "environment"
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        color="primary"
                        type="button"
                        onClick={capture}
                    >
                        Capture
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}