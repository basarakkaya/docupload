import React, { useState } from 'react';
import axios from 'axios'
import './App.css';
// import CameraFeed from './camfeed'
import VideoStream from './components/VideoStream'

function App() {
    const [username, setUsername] = useState("")
    const [image, setImage] = useState(null)
    const [file, setFile] = useState(null)
    const [users, setUsers] = useState([])
    const [fileList, setFileList] = useState(null)
    const [camera, toggleCamera] = useState(false)

    const toggleCam = () => {
        toggleCamera(!camera)
    }

    const sendImage = () => {
        console.log(image)
        const data = new FormData()
        data.append("imgfile", file)
        data.append("uname", username)

        const resp = new Promise((resolve, reject) => {
            axios.post('http://localhost:3003/uploadImage', data).then(res => {
                console.log(res.data)
                resolve(res.data)
            }).catch(err => {
                reject()
            })
        })
        console.log("promise result", resp)
    }
    
    const inputfile = event => {
        const _file = event.target.files[0]
        setFile(_file)

        var reader = new FileReader();

        reader.readAsDataURL(_file);
        reader.onload = function(e) {
            // browser completed reading file - display it
            console.log(e.target.result)
            setImage(e.target.result)
        };
    }

    const getFiles = async () => {
        await axios.get('http://localhost:3003/files').then(res => {
            setFileList(res.data)
        })
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
        <div className="App">
            <input 
                name="username" 
                type="text" 
                placeholder="username" 
                onChange={e => setUsername(e.target.value)}
            />
            <input 
                name="img-file" 
                type="file" 
                id="fileinput" 
                onChange={ inputfile } 
                accept="image/*" 
            /> 
            <button 
                type="button" 
                disabled={username === "" || image === null} 
                onClick={sendImage}
            >
                Send Image
            </button>
            <button
                type="button"
                onClick={getFiles}
            >
                Get Files
            </button>
            <button
                type="button"
                onClick={toggleCam}
            >
                Toggle Camera
            </button>
            {
                camera ?
                <VideoStream 
                    id="video"
                    rearCamera={ true }
                    onCapture={ data => console.log(data)}
                /> : ""
            }
            {
                fileList ? 
                fileList.map(file => {
                    return (
                        <div key={file.key}>
                            <p>{file.Key}</p>
                            <a href={file.ObjectURL} target="_blank" rel="noopener noreferrer">Git</a>
                        </div>
                    )
                })
                : ""
            }
        </div>
    );
}

export default App;
