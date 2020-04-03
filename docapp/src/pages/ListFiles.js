import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { 
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Grid, 
    Link,
    Typography, 
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 140,
    },
  });

export default function ListFiles() {
    const [fileList, setFileList] = useState([])

    const classes = useStyles()

    const fetchFiles = async () => {
        await axios.get('http://localhost:3003/files').then(res => {
            setFileList(res.data)
        })
    }

    useEffect(() => {
        fetchFiles()
    }, [])

    // const getUsers = () => {
    //     const resp = new Promise((resolve, reject) => {
    //         axios.get('http://localhost:3003/users').then(res => {
    //             console.log(res.data)
    //             setUsers(res.data)
    //             resolve(res.data)
    //         })
    //     })
    // }

    return (
        <>
            <Grid item xs={12}>
                <Typography variant="h4">Dosyalar</Typography>
            </Grid>
            {
                fileList.length > 0 ?
                fileList.map((file, index) => {
                    return (
                        <Grid item xs={12} sm={4} md={3} key={index}>
                            <Card className={classes.root}>
                                <CardActionArea>
                                    <CardMedia
                                        className={classes.media}
                                        image={file.ObjectURL}
                                        title={file.Key}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            { file.Key}
                                        </Typography>
                                        { 
                                        file.Size > 1024 * 1024 ? 
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            {`${(file.Size / (1024*1024)).toFixed(2)} MB`}
                                        </Typography>
                                        : 
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            {`${(file.Size / 1024).toFixed(2)} KB`}
                                        </Typography>
                                        }
                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                                    <Link href={file.ObjectURL} rel="noopener noreferrer" target="_blank" variant="body2">
                                        İndir
                                    </Link>
                                </CardActions>
                            </Card>
                        </Grid>
                    )
                })
                :
                <Grid item xs={12}>
                    <Typography variant="h5" align="center">
                        Dosya bulunamadı.
                    </Typography>
                </Grid>
            }
        </>
    )
}