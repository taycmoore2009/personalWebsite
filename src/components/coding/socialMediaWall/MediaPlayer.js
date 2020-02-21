import React from 'react';

export default class MediaPlayer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            media: props.media,
            index: 0
        }

    }

    startTimer = () => {

        const {index, media} = this.state;
        const currentMedia = media[index];

        setTimeout(() => {
            this.setState({index: index === this.state.media.length - 1 ? 0 : index + 1});
        }, Number(currentMedia.time) * 1000);
    }

    render() {
        const {classes} = this.props;
        const {index, media} = this.state;
        const currentMedia = media[index];
        const src = currentMedia.src

        if(src.includes('.jpg') || src.includes('.png') || src.includes('.gif') || src.includes('.jpeg')) {
            return (
                <img
                    onLoad={this.startTimer}
                    src={src}
                    alt='special media'
                />
            );
        }

        const regexSrc = /<iframe.*?src=['"](.*?)['"]/;
        const regexHeight = /<iframe.*?height=['"](.*?)['"]/;
        const regexWidth = /<iframe.*?width=['"](.*?)['"]/;
        
        if(this.props.outerRef.current) {
            const girdWidth = this.props.outerRef.current.offsetWidth;
            const iframeHeight = Number(regexHeight.exec(src)[1] || 1);
            const iframeWidth = Number(regexWidth.exec(src)[1] || 1);
            const height = (iframeHeight / iframeWidth) * girdWidth;
            return (
                <iframe
                    onLoad={this.startTimer}
                    title='dogs' 
                    className={classes.videoMedia} 
                    src={`${regexSrc.exec(src)[1] || ''}?autoplay=1`}
                    width={`${girdWidth - 20}px`}
                    height={`${height}px`} 
                    allow="autoplay; fullscreen"
                    frameBorder="0"
                ></iframe>
            );
        }
        return (
            <div></div>
        );
    }
}