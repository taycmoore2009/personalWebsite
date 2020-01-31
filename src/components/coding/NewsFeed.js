import React from 'react';

import _ from 'lodash'

import { withStyles } from '@material-ui/styles';
import { PropTypes } from 'prop-types';
import { 
  Grid, 
  Typography, 
  ButtonGroup, 
  Backdrop, 
  CircularProgress, 
  Avatar,
  List, 
  ListItem, 
  ListItemAvatar,
  ListItemText,
  ExpansionPanel, 
  ExpansionPanelSummary, 
  ExpansionPanelDetails,
  Link
} from '@material-ui/core';

import { Error } from '@material-ui/icons';

import InputButton from '../forms/Button';

import xmlConverter from './newsFeed/xmlConverter';

const styles = () => ({
  newsSelector: {
    padding: '20px 0',
  },
  buttonGroup: {
    flexWrap: 'wrap'
  },
  button: {
    color: '#FFF',
    textDecoration: 'underline'
  },
  listItem: {
    maxWidth: '700px'
  },
  expansionPanel: {
    width: '100%'
  },
  expansionContent: {
    flexDirection: 'column'
  },
  backdrop: {
    zIndex: '1'
  }
});


class NewsFeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openBackdrop: false,
      feed: [],
      checkedNewsOutlet: [],
      shownNewsOutlet: [],
      expanded: false
    }

    this.newsArea = React.createRef();
  }

  postData = async (url = '') => {
    // Default options are marked with *
    const response = await fetch(url);
    return await response.text(); // parses JSON response into native JavaScript objects
  }

  selectFeed = (outlet) => {
    const parsedOutlet = outlet.toLowerCase().replace(' ', '');
    const currentNewsOutlets = this.state.shownNewsOutlet;
    const currentCheckedOutlets = this.state.checkedNewsOutlet;

    this.setState({openBackdrop: true});
    if(currentCheckedOutlets.indexOf(outlet) !== -1) {
      if(currentNewsOutlets.indexOf(outlet) === -1) {
        currentNewsOutlets.push(outlet);
        this.setState({
          shownNewsOutlet: currentNewsOutlets,
          openBackdrop: false,
          expanded: false
        });
      } else {
        currentNewsOutlets.splice(currentNewsOutlets.indexOf(outlet), 1);
        this.setState({
          shownNewsOutlet: currentNewsOutlets,
          openBackdrop: false,
          expanded: false
        });
      }
    } else {
      this.postData(`https://dxk3dp2ts2.execute-api.us-east-2.amazonaws.com/personal/news?site=${parsedOutlet}`)
      .then((data) => {
        this.addNewsFeed(outlet, data);
      });
    }
  }

  addNewsFeed = (outlet, feedData) => {
    const currentFeed = this.state.feed;
    const processedFeed = this.processFeed(feedData, outlet);
    const newFeed = _.orderBy(_.concat(currentFeed, processedFeed), 'pubDate', 'desc');

    const currentNewsOutlets = this.state.shownNewsOutlet;
    const currentCheckedOutlets = this.state.checkedNewsOutlet;

    currentNewsOutlets.push(outlet);
    currentCheckedOutlets.push(outlet);

    this.setState({
      feed: newFeed,
      openBackdrop: false,
      shownNewsOutlet: currentNewsOutlets,
      checkedNewsOutlet: currentCheckedOutlets,
      expanded: false
    });
  }

  processFeed = (rawFeed, outlet) => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(rawFeed,"text/xml");
    const jsonRSSFeed = xmlConverter(xmlDoc);

    const processedFeed = jsonRSSFeed.rss.channel.item.map((item) => {
      let newObj = {}
      if(item['media:group'] !== undefined) {
        const mediaGroup = Array.isArray(item['media:group']) ? item['media:group'] : item['media:group']['media:content'];
        mediaGroup.forEach((media) => {
          if(media.attributes.url && media.attributes.url.indexOf('com/') !== -1 && media.attributes.medium === 'image') {
            newObj.avatarURL = media.attributes.url;
          }
        })
      }
      if(item['media:content'] !== undefined) {
        newObj.avatarURL = item['media:content'].attributes.url;
      }
      if(item['dc:creator'] !== undefined) {
        newObj.creator = item['dc:creator'];
      }
      newObj.title = item.title;
      newObj.description = _.isEmpty(item.description) ? undefined : item.description;
      newObj.outlet = outlet;
      newObj.pubDate = item.pubDate ? new Date(item.pubDate) : new Date('Jan 1 2020');
      newObj.link = item.link;
      return newObj;
    });
    return processedFeed;
  }

  closeBackdrop = () => {
    this.setState({openBackdrop: false});
  }

  handlePanelChange = panel => (event, isExpanded) => {
    this.setState({expanded: isExpanded ? panel : false});
  }

  render = () => {
    const { classes } = this.props;

    return (
      <Grid item md={12}>
        <Grid container justify="center">
          <Backdrop
            open={this.state.openBackdrop}
            onClick={this.closeBackdrop}
            classes={{'root': classes.backdrop}}
          >
            <CircularProgress/>
          </Backdrop>
          <Grid item md={12} className={classes.newsSelector}>
            <Grid container justify="center">
              <Grid item md={12}>
                <Typography variant="h2">Select a News Feed</Typography>
              </Grid>
              <Grid item md={12}>
                <ButtonGroup variant='text' aria-label='select news feed to read' className={classes.buttonGroup}>
                {['BBC', 'Fox', 'CNN', 'Huffington', 'New York'].map((outlet, i) => {
                  return (
                      <InputButton
                        key={i}
                        classes={classes.button}
                        variant='text'
                        label={outlet}
                        onClick={() => {this.selectFeed(outlet)}}
                      />
                  )
                })}
                </ButtonGroup>
              </Grid>
            </Grid>
          </Grid>
          <Grid ref={this.newsArea}>
            <List>
              {this.state.feed.map((item, i) => {
                if (this.state.shownNewsOutlet.indexOf(item.outlet) !== -1) {
                  return (
                    <ListItem key={i} alignItems="flex-start" className={classes.listItem}>
                      <ExpansionPanel 
                        expanded={this.state.expanded === `panel${i}`} 
                        onChange={this.handlePanelChange(`panel${i}`)}
                        className={classes.expansionPanel}
                      >
                        <ExpansionPanelSummary>
                            <ListItemAvatar>
                              <Avatar alt={item.outlet} src={item.avatarURL}>
                                <Error/>
                              </Avatar>
                            </ListItemAvatar>
                          <ListItemText>
                            <Typography variant='body2'>
                              {item.creator ? item.creator : item.outlet}
                            </Typography>
                            <Typography variant='caption'>
                              {item.pubDate.toLocaleDateString()} {item.pubDate.toLocaleTimeString()}
                            </Typography>
                            <Typography variant='subtitle1'>{item.title}</Typography>
                          </ListItemText>
                        </ExpansionPanelSummary>
                        
                        <ExpansionPanelDetails>
                          { item.description && <Typography variant='body2'>{item.description }</Typography>}
                          { item.link && <Link href={item.link} target='_blank'>Read More!</Link>}
                        </ExpansionPanelDetails>
                      </ExpansionPanel>
                    </ListItem>
                  );
                }
                return false;
              })}
            </List>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

NewsFeed.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(NewsFeed);
