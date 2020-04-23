import React from 'react';


class VideoCapture extends React.Component {

    constructor(props) {
        super(props);
        this.videoRef = React.createRef();
        this.canvasRef = React.createRef();
        this.imgRef = React.createRef();
    }

    componentDidMount = () => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then((stream) => {
            this.videoRef.current.srcObject = stream;
            this.videoRef.current.play();
        })
        .catch(function(err) {
            console.log("An error occurred: " + err);
        });
    }

    takePhoto = (event) => {
        const video = this.videoRef.current;
        const canvas = this.canvasRef.current;
        const photo = this.imgRef.current;
        const width = 300;
        const height = video.videoHeight / (video.videoWidth/width);
        const context = canvas.getContext('2d');
        canvas.width = 300;
        canvas.height = height;
        context.drawImage(video, 0, 0, width, height);
        
        var data = canvas.toDataURL('image/png');
        photo.setAttribute('src', data);
    }

    render = () => {
        return (
            <div>
                <div className="camera">
                    <video width='300px' ref={this.videoRef}>Video stream not available.</video>
                    <button onClick={this.takePhoto}>Take photo</button>
                </div>
                <canvas ref={this.canvasRef}>
                </canvas>
                <div className="output">
                    <img ref={this.imgRef} alt="The screen capture will appear in this box."/>
                </div>
            </div>
        )
    }
}
export default VideoCapture
