import React from 'react';
import { Grid, Typography, Link, Hidden, Card, CardContent, CardActions } from '@material-ui/core';
import { Email } from '@material-ui/icons';
import { withStyles } from '@material-ui/styles';

const styles = () => ({
    header: {
        fontSize: '26px',
        margin: '50px 0px'
    },
    name: {
        fontSize: '2em',
        fontWeight: '900'
    },
    leftSide: {
        paddingTop: '32px;'
    },
    email: {
        margin: '30px 0 0'
    },
    puppies: {
        background: 'url(/imgs/puppies.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '100%'
    },
    maxHeight: {
        height: '100%'
    },
    socialMediaItem: {
        height: '33%',
        overflow: 'hidden',
        position: 'relative',
        transition: '1s all'
    },
    expanded: {
        height: '70%',
        '& img': {
            top: '0'
        }
    },
    shrink: {
        height: '15%'
    },
    socialMediaImg: {
        width: '100%',
        height: 'auto',
        position: 'absolute',
        top: '-65px',
        transition: 'all 1s'
    },
    socialNavContainerLeft: {
        display: 'none',
        height: '434px',
        width: '100%'
    },
    socialNavContainerRight: {
        display: 'block'
    },
    '@media (max-width: 600px)': {
        socialNavContainerLeft: {
            display: 'block'
        }
    },
    '@media (min-width: 600px) and (max-width: 960px)': {
        socialContainer: {
            height: '320px'
        },
    },
    '@media (min-width: 960px) and (max-width: 1280px)': {
        socialNavContainerLeft: {
            display: 'block'
        },
        socialNavContainerRight: {
            display: 'none'
        },
        socialContainer: {
            height: '555px'
        },
    },
    '@media (min-width: 1280px) and (max-width: 1600px)': {
        socialContainer: {
            height: '380px'
        },
    },
    '@media (min-width: 1600px) and (max-width: 1920px)': {
        socialContainer: {
            height: '485px'
        },
    },
    '@media (min-width: 1920px)': {
        socialContainer: {
            height: '596px'
        },
    },
    photo: {
        width: '100%',
        display: 'block'
    }
});

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          expanded: false
        }
    
        // References
        this.refEls = {
            mobileFB: React.createRef(),
            mobileInsta: React.createRef(),
            mobileLink: React.createRef(),
            facebook: React.createRef(),
            instagram: React.createRef(),
            linkedin: React.createRef()
        }
    }

    expandLink = refEl => (event, isExpanded) => {
        const { classes } = this.props;
        debugger;
        for (var key in this.refEls) {
            this.refEls[key].current.classList.remove(classes.expanded);
            this.refEls[key].current.classList.add(classes.shrink);
        }
        refEl.current.classList.add(classes.expanded);
        refEl.current.classList.remove(classes.shrink);
    }

    shrinkLinks = () => {
        const { classes } = this.props;
        for (var key in this.refEls) {
            this.refEls[key].current.classList.remove(classes.expanded, classes.shrink);
        }
    }

    render = () => {
        const { classes } = this.props;

        return (
            <Grid container ref={this.props.refer} spacing={1}>
                <Grid item md={6} sm={12}>
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography
                                component='h1'
                                align='left'
                                gutterBottom
                                className={classes.header}
                            >
                                Hello World! I'm,<br/><span className={classes.name}>TAY MOORE.</span>
                            </Typography>
                            <Typography
                            component='p'
                            align='left'
                            gutterBottom
                            >
                                LA based web engineer extraordinaire. I believe in letting my work talk for me. So here you will find some of my fun creations. I've also included a Bio in case you're curious about my life. It also has a section that specifically breaks down my career life. To get started, select anything from the menu on the left. You're currently on the Home Page
                            </Typography>
                        </Grid>
                        <Grid item md={12} className={classes.socialNavContainerLeft}>
                            <Grid container className={classes.maxHeight} onMouseLeave={this.shrinkLinks}>
                                <Grid 
                                    ref={this.refEls.mobileFB}
                                    item xs={12} 
                                    className={classes.socialMediaItem}
                                    onMouseEnter={this.expandLink(this.refEls.mobileFB)}
                                >
                                    <Link 
                                        target='_blank' 
                                        rel='noopener' 
                                        href='https://www.facebook.com/tay.moore.71'
                                    >
                                        <img className={classes.socialMediaImg} src='/imgs/facebook-icon.png' alt='link to facebook'/>
                                    </Link>
                                </Grid>
                                <Grid 
                                    ref={this.refEls.mobileInsta}
                                    item xs={12} 
                                    className={classes.socialMediaItem}
                                    onMouseEnter={this.expandLink(this.refEls.mobileInsta)}
                                >
                                    <Link 
                                        target='_blank' 
                                        rel='noopener' 
                                        href='https://www.instagram.com/taythemighty/'
                                    >
                                        <img className={classes.socialMediaImg} src='/imgs/instagram.png' alt='link to instagram'/>
                                    </Link>
                                </Grid>
                                <Grid 
                                    ref={this.refEls.mobileLink}
                                    item xs={12} 
                                    className={classes.socialMediaItem}
                                    onMouseEnter={this.expandLink(this.refEls.mobileLink)}
                                >
                                    <Link 
                                        target='_blank'
                                        rel='noopener' 
                                        href='https://www.linkedin.com/in/tay-moore-333b2514/'
                                    >
                                        <img className={classes.socialMediaImg} src='/imgs/linkedin.png' alt='link to linkedin'/>
                                    </Link>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item md={6} sm={12} className={classes.leftSide}>
                    <Grid container>
                        <Grid item xs={12} className={classes.email}>
                            <Card className={classes.card} raised={true}>
                                <CardContent>
                                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                                    Word of the Day
                                    </Typography>
                                    <Typography variant="h5" component="h2">
                                    <Email/> Email
                                    </Typography>
                                    <Typography className={classes.pos} color="textSecondary">
                                    Noun
                                    </Typography>
                                    <Typography variant="body2" component="p">
                                    Messages distributed by electronic means from one computer user to one or more recipients via a network.
                                    <br />
                                    {'"I sent Tay an email to talk about computers and his dogs"'}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Link size="small" href='mailto:taycmoore2009@gmail.com'>Learn More</Link>
                                </CardActions>
                            </Card>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container className={classes.socialContainer}>
                                <Hidden only={['sm', 'md', 'lg', 'xl']}>
                                <Grid item xs={12} className={classes.maxHeight}>
                                    <img className={classes.photo} alt='puppies' src='/imgs/puppies.jpg'/>
                                </Grid>
                                </Hidden>
                                <Hidden only='xs'>
                                    <Grid item xs={12} sm={6} md={12} lg={6} className={classes.puppies}/>
                                </Hidden>
                                <Grid item xs={12} sm={6} className={classes.socialNavContainerRight}>
                                    <Grid container className={classes.maxHeight} onMouseLeave={this.shrinkLinks}>
                                        <Grid 
                                            ref={this.refEls.facebook}
                                            item xs={12} 
                                            className={classes.socialMediaItem}
                                            onMouseEnter={this.expandLink(this.refEls.facebook)}
                                        >
                                            <Link 
                                                target='_blank' 
                                                rel='noopener' 
                                                href='https://www.facebook.com/tay.moore.71'
                                            >
                                                <img className={classes.socialMediaImg} src='/imgs/facebook-icon.png' alt='link to facebook'/>
                                            </Link>
                                        </Grid>
                                        <Grid 
                                            ref={this.refEls.instagram}
                                            item xs={12} 
                                            className={classes.socialMediaItem}
                                            onMouseEnter={this.expandLink(this.refEls.instagram)}
                                        >
                                            <Link 
                                                target='_blank' 
                                                rel='noopener' 
                                                href='https://www.instagram.com/taythemighty/'
                                            >
                                                <img className={classes.socialMediaImg} src='/imgs/instagram.png' alt='link to instagram'/>
                                            </Link>
                                        </Grid>
                                        <Grid 
                                            ref={this.refEls.linkedin}
                                            item xs={12} 
                                            className={classes.socialMediaItem}
                                            onMouseEnter={this.expandLink(this.refEls.linkedin)}
                                        >
                                            <Link 
                                                target='_blank'
                                                rel='noopener' 
                                                href='https://www.linkedin.com/in/tay-moore-333b2514/'
                                            >
                                                <img className={classes.socialMediaImg} src='/imgs/linkedin.png' alt='link to linkedin'/>
                                            </Link>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

export default withStyles(styles)(HomePage);