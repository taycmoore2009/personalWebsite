import React from "react";

import { withStyles } from "@material-ui/styles";
import { PropTypes } from "prop-types";
import { Grid, Typography } from "@material-ui/core";

import MediaPlayer from "./MediaPlayer";
import ScrollSlideShow from "./ScrollSlideShow";
import YelpReviews from "./YelpReviews";

const styles = () => ({
  bg: {
    width: "100vw",
    height: "100vh",
  },
  wrapper: {
    padding: "20px 0",
  },
  videoMedia: {
    maxWidth: "calc(100% - 20px)",
    margin: "10px 0",
    maxHeight: "calc(100% - 20px)",
  },
  imgMedia: {
    width: "calc(100% - 20px)",
    height: "calc(100% - 20px)",
    "background-size": "contain",
    "background-position": "center center",
    "background-repeat": "no-repeat",
  },
  slideShowContainer: {
    position: "relative",
    width: "100%",
    height: "100%",
    overflow: "hidden",
  },
  slideshowOutsideContainer: {
      height: 'calc(100% - 300px)',
  },
  yelpReview: {
    height: 300,
    overflow: 'hidden'
  },
  innerSlideshow: {
    position: "absolute",
    top: 0,
  },
  transition: {
    transition: "1s all",
  },
  card: {
    maxWidth: 400,
    margin: "10px 0",
    transition: "0.25s all",
  },
  mediaContainer: {
    minHeight: 200,
    maxHeight: 300,
    margin: "0 auto",
  },
  media: {
    maxWidth: "100%",
    maxHeight: "100%",
    minWidth: "100%",
  },
});

class CollarAndComb extends React.Component {
  config = {};

  constructor(props) {
    super(props);

    this.state = {
      media: [],
      slideshowMedia: [],
      customSlideshow: [],
      isLoading: false,
      code: "",
      selectedFile: null,
      loading: false,
      transitionType: "",
      transitionTime: 5000,
      layout: "leftMedia",
      spacing: "2",
      instaTags: [],
      yelpReviews: [],
      instaAccount: "",
      headerText: "",
      currentColorChangeState: "",
      mediaDisplay: "",
      styles: {
        background: {
          color: "",
          img: "",
          size: "",
        },
        header: {
          color: "",
          textAlign: "",
          size: "",
        },
        card: {
          bgColor: "",
          borColor: "",
          color: "",
        },
      },
    };
    this.counter = 0;
    this.customCounter = 0;

    this.videoGridRef = React.createRef();
  }

  componentDidMount = () => {
    this.setState({ isLoading: true });
    this.getInitialData();
  };

  refreshTimer = () => {
    const timeout = 1000 * 60 * 10;

    setTimeout(() => {
      this.getInitialData();
    }, timeout);
  };

  getInitialData = async () => {
    const url = new URL(
      "https://dxk3dp2ts2.execute-api.us-east-2.amazonaws.com/personal/socialData"
    );
    url.searchParams.append("code", "collarandcomb");
    const promise = await fetch(url);
    const response = await promise.json();

    this.setState(response);
    this.getInstaFeed()
      .then((instaFeed) => {
        this.setState({ slideshowMedia: instaFeed, isLoading: false });
        this.refreshTimer();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getInstaFeed = async () => {
    const promise = await fetch(
      `https://dxk3dp2ts2.execute-api.us-east-2.amazonaws.com/personal/instaFeed?wallCode=${this.state.code}`
    );
    return await promise.json();
  };
  getNewData = () => {
    if (this.state.slideshowMedia.length === 0) return false;
    const params = this.state.slideshowMedia[this.counter];
    if (this.counter === this.state.slideshowMedia.length - 1) {
      this.counter = 0;
    } else {
      this.counter = this.counter + 1;
    }

    return params;
  };

  getNewCustomData = () => {
    if (this.state.customSlideshow.length === 0) return false;

    const params = this.state.customSlideshow[this.customCounter];
    if (this.customCounter === this.state.customSlideshow.length - 1) {
      this.customCounter = 0;
    } else {
      this.customCounter = this.customCounter + 1;
    }
    return params;
  };

  generateSlideshows = () => {
    const { classes } = this.props;
    const slideshowArray =
      this.state.slideshowMedia.length === 0
        ? []
        : [
            <Grid item container direction='row' spacing={1} xs={12} md={3} key={1}>
              <Grid
                item
                container
                xs={6}
                direction='column'
                justify='center'
                className={classes.slideshowOutsideContainer}
              >
                <ScrollSlideShow
                  getNextCard={this.getNewData}
                  classes={classes}
                  startTimeout={2500}
                  slideDelay={((this.state.transitionTime * 1000) / 2) * 1}
                  transitionTime={this.state.transitionTime * 1000}
                  cardStyles={this.state.styles.card}
                />
              </Grid>
              <Grid
                item
                container
                xs={6}
                direction='column'
                justify='center'
                className={classes.slideshowOutsideContainer}
              >
                <ScrollSlideShow 
                  getNextCard={this.state.customSlideshow.length !== 0 ? this.getNewCustomData : this.getNewData}
                  classes={classes}
                  startTimeout={2500}
                  slideDelay={(this.state.transitionTime * 1000/2) * 2}
                  transitionTime={this.state.transitionTime * 1000}
                  cardStyles={this.state.styles.card}
                  customSlide={this.state.customSlideshow.length !== 0}
                />
              </Grid>
              <Grid
                container
                direction='column'
                justify='flex-start'
                className={classes.yelpReview}
              >
                <YelpReviews
                  reviews={this.state.yelpReviews}
                />
              </Grid>
            </Grid>,
          ];
    return slideshowArray;
  };

  render = () => {
    const { classes, refer } = this.props;

    const slideShowArray = this.generateSlideshows();
    const hasHeaderText = this.state.headerText && this.state.headerText !== "";
    const headerStyle = this.state.styles.header;

    return (
      <Grid
        container
        ref={refer}
        className={classes.bg}
        style={{
          backgroundColor: this.state.styles.background.color || "#FFF",
          backgroundImage: this.state.styles.background.img
            ? `url('${this.state.styles.background.img}')`
            : "",
          backgroundSize: this.state.styles.background.size || "contain",
        }}
        direction="row"
        wrap="wrap"
      >
        {hasHeaderText && (
          <Grid
            item
            xs={12}
            style={{
              height: `calc(${headerStyle.fontSize} + 1rem)`,
            }}
          >
            <Typography
              variant="h1"
              className={classes.header}
              style={{
                color: headerStyle.color || "#000",
                textAlign: headerStyle.textAlign || "center",
                fontSize: headerStyle.fontSize || "6rem",
              }}
            >
              {this.state.headerText}
            </Typography>
          </Grid>
        )}
        <Grid
          item
          container
          xs={12}
          spacing={0}
          style={{
            height: hasHeaderText
              ? `calc(100% - ${headerStyle.fontSize} - 1rem)`
              : "100%",
            margin: "0 8px",
          }}
        >
          {this.state.layout === "mediaBox" ? (
            <Grid
              item
              container
              xs={12}
              ref={this.videoGridRef}
              alignItems="center"
              justify="center"
            >
              <MediaPlayer
                media={this.state.media}
                classes={classes}
                outerRef={this.videoGridRef}
              />
            </Grid>
          ) : (
            ["leftMedia", "rightMedia"].map((media, index) => {
              return this.state.layout === media ? (
                <Grid
                  key={0}
                  item
                  container
                  xs={12}
                  md={9}
                  ref={this.videoGridRef}
                  alignItems="center"
                  justify="center"
                >
                  <MediaPlayer
                    media={this.state.media}
                    classes={classes}
                    outerRef={this.videoGridRef}
                  />
                </Grid>
              ) : (
                slideShowArray.map((Slideshow) => {
                  return Slideshow;
                })
              );
            })
          )}
        </Grid>
      </Grid>
    );
  };
}

CollarAndComb.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CollarAndComb);
