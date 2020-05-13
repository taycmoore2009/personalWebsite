import React from 'react';

export default class MediaPlayer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            index: 0
        }

    }

    startTimer = () => {
        const {media} = this.props;
        const {index} = this.state;
        const currentMedia = media[index];

        setTimeout(() => {
            this.setState({index: index === this.props.media.length - 1 ? 0 : index + 1});
        }, Number(currentMedia.length) * 1000);
    }

    render() {
        const {classes, media} = this.props;
        const {index} = this.state;
        if (media.length) {
            const currentMedia = media[index];
            const src = currentMedia.link

            if(
                src.includes('.jpg') ||
                src.includes('.png') ||
                src.includes('.gif') ||
                src.includes('.jpeg') ||
                src.includes('personalwebsitefiles')
            ) {
                return (
                    <img
                        onLoad={this.startTimer}
                        src={src}
                        alt='special media'
                        className={classes.videoMedia}
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
        } else {
            return (
                <div></div>
            )
        }
    }
}