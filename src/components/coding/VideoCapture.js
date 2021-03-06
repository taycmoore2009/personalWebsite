import React from 'react';


class VideoCapture extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            flip: false
        };

        this.videoRef = React.createRef();
        this.canvasRef = React.createRef();
        this.imgRef = React.createRef();
    }

    componentDidMount = () => {
        // this.initiateCamera();
    }

    initiateCamera = () => {
        navigator.mediaDevices.getUserMedia({
            video: {facingMode: this.state.flip ? "user" : "environment"},
            audio: false,
        })
        .then((stream) => {
            this.videoRef.current.srcObject = stream;
            this.videoRef.current.play();
        })
        .catch(function(err) {
            console.log("An error occurred: " + err);
        });
    }

    flipCamera = () => {
        this.setState({flip: !this.state.flip});
        this.initiateCamera();
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
        const navigatorUserAgent = navigator.userAgent;
        let capture = 'false';

        const isiOS = /iP(ad|hone|od)/i.test(navigatorUserAgent);
        const isChrome = /Chrome/i.test(navigatorUserAgent);
        const isMobileSafari = /Safari/i.test(navigatorUserAgent) && /AppleWebKit/i.test(navigatorUserAgent);
      
        alert(`is this safari on iPad?? Answer: ${!isiOS && !isChrome && isMobileSafari ? 'yes' : 'no'}`);

        return (
            <div>
                
                <input type="file" accept="image/*" capture={capture}></input>
                <div className="camera">
                    <video width='300px' ref={this.videoRef}>Video stream not available.</video>
                    <button onClick={this.flipCamera}>Flip Camera</button>
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
