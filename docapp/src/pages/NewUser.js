import React, { useState } from 'react'
import axios from 'axios'

import PhotoSnapshot from '../components/PhotoSnapshot'

import { 
    Typography, 
    Button, 
    Divider, 
    Grid, 
    TextField, 
    IconButton, 
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import PhotoCameraOutlinedIcon from '@material-ui/icons/PhotoCameraOutlined';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    input: {
      display: 'none',
    },
  }));

export default function NewUser() {
    const [username, setUsername] = useState("")
    const [file_1, setFile_1] = useState(null)
    const [file_2, setFile_2] = useState(null)

    const [showCamera, toggleCamera] = useState(0)

    const classes = useStyles()

    const resetForm = () => {
        setUsername("")
        setFile_1(null)
        setFile_2(null)
        toggleCamera(0)
    }

    const sendImage = () => {
        const
            file_1_name = `${username}_file1.${file_1.file.type.split("/")[1]}`,
            file_2_name = `${username}_file2.${file_2.file.type.split("/")[1]}`
            // file_1_name = `file1.png`,
            // file_2_name = `file2.png`

        const data = new FormData()
        data.append("imgfiles", file_1.file, file_1_name)
        data.append("imgfiles", file_2.file, file_2_name)
        data.append("uname", username)

        const resp = new Promise((resolve, reject) => {
            axios.post(`${process.env.REACT_APP_APIENDPOINT}/uploadImage`, data).then(res => {
                console.log(res.data)
                resolve(res.data)
            }).catch(err => {
                reject()
            })
        })
        console.log("promise result", resp)

        resetForm()
    }

    const inputfile = (event, inputNo) => {
        const _file = event.target.files[0]

        let inputObj = {
            file: _file,
            displayName: _file.name
        }

        var reader = new FileReader();

        reader.readAsDataURL(_file);
        reader.onload = function(e) {
            // browser completed reading file - display it
            inputObj = { 
                ...inputObj,
                previewUrl: e.target.result
            }
        };

        switch(inputNo) {
            case 1:
                setFile_1(inputObj)
                break
            case 2: 
                setFile_2(inputObj)
                break
            default: break
        }
    }

    const onCapture = (dataUrl, dataBlob, inputNo) => {
        // setImagePreviewUrl(dataUrl)
        // setFile(dataBlob)
        const inputObj = {
            file: dataBlob,
            previewUrl: dataUrl,
            displayName: "Kamera Kullanıldı"
        }

        switch(inputNo) {
            case 1:
                setFile_1(inputObj)
                break
            case 2: 
                setFile_2(inputObj)
                break
            default: break
        }

        toggleCamera(0)
    }

    // const sendData = () => {
    //     const resp = new Promise((resolve, reject) => {
    //         axios.post('http://localhost:3003/users', {
    //             username: username,
    //             photo: image
    //         }).then(res => {
    //             console.log(res.data)
    //             resolve(res.data)
    //         })
    //     })
    //     console.log(resp)

    //     // console.log(e)
    // }

    // const sendText = () => {
    //     const resp = new Promise((resolve, reject) => {
    //         axios.post('http://localhost:3003/uploadText', {
    //             fileText: username
    //         }).then(res => {
    //             console.log(res.data)
    //             resolve(res.data)
    //         }).catch(err => {
    //             reject()
    //         })
    //     })
    //     console.log("promise result", resp)
    // }

    return (
        <>
            <Grid item xs={12}>
                <Typography variant="h4">Yeni Kullanıcı</Typography>
            </Grid>
            <Grid item xs={12}>
                <Divider />
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h6">Kullanıcı Adı</Typography>
            </Grid>
            <Grid item xs={12}>
                <TextField fullWidth
                    type="text"
                    placeholder="Kullanıcı Adı"
                    onChange={ e => setUsername(e.target.value)}
                    value={username}
                    InputProps={{
                        disableUnderline: true
                    }}
                />
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h6">Belge 1</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="body1">{ file_1 ? file_1.displayName : "Dosya Ekli Değil"}</Typography>
                <input
                    accept="image/png, image/jpeg, application/pdf"
                    className={classes.input}
                    id="file-input-1"
                    multiple
                    type="file"
                    onChange={ e => inputfile(e, 1)}
                />
                <label htmlFor="file-input-1">
                    <Button variant="contained" color="primary" component="span">
                        Dosya Ekle
                    </Button>
                </label>
                <IconButton aria-label="upload picture" component="span" onClick={ () => toggleCamera(1) }>
                    <PhotoCameraOutlinedIcon />
                </IconButton>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h6">Belge 2</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="body1">{ file_2 ? file_2.displayName : "Dosya Ekli Değil"}</Typography>
                <input
                    accept="image/png, image/jpeg, application/pdf"
                    className={classes.input}
                    id="file-input-2"
                    multiple
                    type="file"
                    onChange={ e => inputfile(e, 2)}
                />
                <label htmlFor="file-input-2">
                    <Button variant="contained" color="primary" component="span">
                        Dosya Ekle
                    </Button>
                </label>
                <IconButton aria-label="upload picture" component="span" onClick={ () => toggleCamera(2) }>
                    <PhotoCameraOutlinedIcon />
                </IconButton>
            </Grid>
            <Grid item xs={12}>
                <Button fullWidth
                    variant="contained"
                    color="primary"
                    disabled={ !username || file_1 ===null || file_2===null}
                    onClick={sendImage}
                >
                    Kaydet
                </Button>
            </Grid>
            {
                showCamera ? 
                <PhotoSnapshot 
                    captureFile={showCamera}
                    onCapture={onCapture}
                    onOverlayClick={ () => toggleCamera(false) }
                />
                : ""
            }
        </>
    )
}