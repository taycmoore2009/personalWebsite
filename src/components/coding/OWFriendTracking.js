import React from 'react';
import { PropTypes } from 'prop-types';

import _ from 'lodash'

import { 
    Grid,
    Chip,
    Backdrop,
    CircularProgress,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    DialogTitle
} from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

const userNames = [
    {
        name: 'TayTheMighty',
        color: Math.floor(Math.random()*16777215).toString(16)
    }, {
        name: 'PearlRadiant',
        color: Math.floor(Math.random()*16777215).toString(16)
    }, {
        name: 'pinkiemochii',
        color: Math.floor(Math.random()*16777215).toString(16)
    }, {
        name: 'raider741',
        color: Math.floor(Math.random()*16777215).toString(16)
    }, {
        name: 'APlS%20I3EE',
        color: Math.floor(Math.random()*16777215).toString(16)
    }
]

const styles = {
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        listStyle: 'none',
        margin: 0,
    },
    backdrop: {
        color: '#fff',
    },
    chip: {
        margin: '5px',
    },
    li: {
        listStyle: 'none'
    }
};

class OWFriendTracking extends React.Component {
    state = {
        users: [],
        currentUser: {},
        loading: false
    }

    componentDidMount = () => {
        this.fetchList();
    }

    fetchList = () => {
        this.setState({loading: true});
        return fetch('https://dxk3dp2ts2.execute-api.us-east-2.amazonaws.com/personal/OWTracker')
            .then((response) => {
                return response.json();
            })
            .then(users => {
                this.setState({
                    users: _.groupBy(users, 'name'),
                    loading: false
                });
            });
    }

    showUser = (name) => {
        this.setState({loading: true});
        fetch(`https://ow-api.com/v1/stats/xbl/us/${name}/profile`)
        .then((response) => {
            return response.json();
        }).then(currentUser => {
            this.setState({
                currentUser,
                loading: false
            });
        });
    }

    fetchNewStats = () => {
        const promises = [];

        userNames.forEach(user => {
            promises.push(fetch(`https://ow-api.com/v1/stats/xbl/us/${user.name}/profile`));
        });

        return Promise.all(promises).then(responses => {
            return Promise.all(responses.map((response) => {
                return response.json();
            }));
        });
    }

    onFetchUsers = () => {
        const promises = [];
        this.setState({loading: true});

        this.fetchNewStats().then(users => {
            users.forEach(user => {
                const currentStats = this.state.users[user.name];

                const data = {
                    name: user.name,
                    overall: user.rating,
                };

                user.ratings.forEach(rating => {
                    data[rating.role === 'damage' ? 'dps' : rating.role] = rating.level;
                });

                if (
                    currentStats.dps !== user.dps ||
                    currentStats.support !== user.support ||
                    currentStats.tank !== user.tank
                ) {
                    promises.push(fetch('https://dxk3dp2ts2.execute-api.us-east-2.amazonaws.com/personal/OWTracker', {
                        body: JSON.stringify(data),
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }));
                }

                if (promises.length) {
                    Promise.all(promises).then(() => {
                        this.fetchList();
                    });
                } else {
                    this.setState({
                        loading: false,
                        showDialog: true,
                        dialogHeader: 'No new changes in SR',
                        dialogText: 'No changes in SR detected for any user. This could happen for a number of reason (Tracking service is down, OW has yet to update SR online, no one is currently playing). Please wait an hour and try again if you know someone is playing'
                    });
                }
            });
        });
        
    }

    generateDataPoints = (stat) => {
        const lines = [];
        for(var key in this.state.users) {
            const name = this.state.users[key][0].name;
            const userPoints = [];
            const numOfPoints = this.state.users[key].length;

            this.state.users[key].forEach((point, index) => {
                const pointSpacing = 1/numOfPoints;
                userPoints.push(`${50 + (500 * index * pointSpacing)} ${500 - ((point[stat] * .2) - 300)}`);
            });

            lines.push((
                <polyline
                    key={name}
                    fill="none"
                    stroke={`#${_.find(userNames, {name: name.replace(' ', '%20')}).color}`}
                    strokeWidth="2"
                    points={userPoints}
                />
            ))
        }

        /**
         * 500 * index * (1/numofpoints)
         * 500 * 2 * .3
         */

        return [lines]
    }

    render = () => {
        const { classes } = this.props;
        const user = this.state.currentUser;
        const graphDataOverall = this.generateDataPoints('overall');
        const graphDataTank = this.generateDataPoints('tank');
        const graphDataDPS = this.generateDataPoints('dps');
        const graphDataSupport = this.generateDataPoints('support');

        return (
            <Grid container justify="center" className={classes.root}>
                <Grid item md={12}>
                    <button onClick={this.onFetchUsers}>Fetch Users</button>
                    <h3>Users</h3>
                    <Grid container justify="flex-start">
                        {userNames.map(user => {
                            return (
                                <Chip
                                    onClick={() => {
                                        this.showUser(user.name);
                                    }}
                                    key={user.name}
                                    style={{backgroundColor: `#${user.color}`}}
                                    label={user.name.replace('%20', ' ')}
                                />
                            )
                        })}
                    </Grid>
                    {user.name && (
                            <div key={user.name}>
                                <span><img src={user.icon} alt='userIcon'/></span><br/>
                                <span>Name: {user.name}</span><br/>
                                <span>Rating overall: <img height='30px' src={user.ratingIcon} alt='ranking'/>{user.rating}</span><br/>
                                {user.ratings.map(rating => {
                                    return (<div key={rating.role}><img height='30px' src={rating.roleIcon} alt='role'/>{rating.role}: <img height='30px' src={rating.rankIcon} alt='ranking'/>{rating.level}</div>);
                                })}
                            </div>
                        )
                    }
                </Grid>
                <h3>Charts</h3>
                <Grid item md={12}>
                    <h4>Oerall</h4>
                    <svg viewBox="0 0 550 550" className="chart" style={{minWidth: 500, margin: '5px 0 30px 0', background: '#FFF'}}>
                        <g className="grid x-grid">
                            <line stroke="#0F0" x1="50" y1="500" x2="550" y2="500"></line>
                        </g>
                        <g className="grid y-grid">
                            <line stroke="#F0F" x1="50" y1="0" x2="50" y2="500"></line>
                        </g>
                        <g className="labels x-labels">
                            <text x="50" y="515">Jan</text>
                            <text x="150" y="515">Feb</text>
                            <text x="250" y="515">Mar</text>
                            <text x="350" y="515">Apr</text>
                            <text x="450" y="515">May</text>
                            <text x="200" y="530" className="label-title">Months</text>
                        </g>
                        <g className="labels y-labels">
                            <text x="10" y="12">4000</text>
                            <text x="10" y="106">3500</text>
                            <text x="10" y="206">3000</text>
                            <text x="10" y="306">2500</text>
                            <text x="10" y="406">2000</text>
                            <text x="10" y="500">1500</text>
                            <text x="0" y="250" className="label-title">SR</text>
                        </g>
                        {graphDataOverall.map(point => {
                            return point;
                        })}
                    </svg>
                </Grid>
                <Grid item sm={12} md={4}>
                    <h4>Tank</h4>
                    <svg viewBox="0 0 550 550" className="chart" style={{minWidth: 500, margin: '5px 0 30px 0', background: '#FFF'}}>
                        <g className="grid x-grid">
                            <line stroke="#0F0" x1="50" y1="500" x2="550" y2="500"></line>
                        </g>
                        <g className="grid y-grid">
                            <line stroke="#F0F" x1="50" y1="0" x2="50" y2="500"></line>
                        </g>
                        <g className="labels x-labels">
                            <text x="50" y="515">Jan</text>
                            <text x="150" y="515">Feb</text>
                            <text x="250" y="515">Mar</text>
                            <text x="350" y="515">Apr</text>
                            <text x="450" y="515">May</text>
                            <text x="200" y="530" className="label-title">Months</text>
                        </g>
                        <g className="labels y-labels">
                            <text x="10" y="12">4000</text>
                            <text x="10" y="106">3500</text>
                            <text x="10" y="206">3000</text>
                            <text x="10" y="306">2500</text>
                            <text x="10" y="406">2000</text>
                            <text x="10" y="500">1500</text>
                            <text x="0" y="250" className="label-title">SR</text>
                        </g>
                        {graphDataTank.map(point => {
                            return point;
                        })}
                    </svg>
                </Grid>
                <Grid item sm={12} md={4}>
                    <h4>DPS</h4>
                    <svg viewBox="0 0 550 550" className="chart" style={{minWidth: 500, margin: '5px 0 30px 0', background: '#FFF'}}>
                        <g className="grid x-grid">
                            <line stroke="#0F0" x1="50" y1="500" x2="550" y2="500"></line>
                        </g>
                        <g className="grid y-grid">
                            <line stroke="#F0F" x1="50" y1="0" x2="50" y2="500"></line>
                        </g>
                        <g className="labels x-labels">
                            <text x="50" y="515">Jan</text>
                            <text x="150" y="515">Feb</text>
                            <text x="250" y="515">Mar</text>
                            <text x="350" y="515">Apr</text>
                            <text x="450" y="515">May</text>
                            <text x="200" y="530" className="label-title">Months</text>
                        </g>
                        <g className="labels y-labels">
                            <text x="10" y="12">4000</text>
                            <text x="10" y="106">3500</text>
                            <text x="10" y="206">3000</text>
                            <text x="10" y="306">2500</text>
                            <text x="10" y="406">2000</text>
                            <text x="10" y="500">1500</text>
                            <text x="0" y="250" className="label-title">SR</text>
                        </g>
                        {graphDataDPS.map(point => {
                            return point;
                        })}
                    </svg>
                </Grid>
                <Grid item sm={12} md={4}>
                    <h4>Support</h4>
                    <svg viewBox="0 0 550 550" className="chart" style={{minWidth: 500, margin: '5px 0 30px 0', background: '#FFF'}}>
                        <g className="grid x-grid">
                            <line stroke="#0F0" x1="50" y1="500" x2="550" y2="500"></line>
                        </g>
                        <g className="grid y-grid">
                            <line stroke="#F0F" x1="50" y1="0" x2="50" y2="500"></line>
                        </g>
                        <g className="labels x-labels">
                            <text x="50" y="515">Jan</text>
                            <text x="150" y="515">Feb</text>
                            <text x="250" y="515">Mar</text>
                            <text x="350" y="515">Apr</text>
                            <text x="450" y="515">May</text>
                            <text x="200" y="530" className="label-title">Months</text>
                        </g>
                        <g className="labels y-labels">
                            <text x="10" y="12">4000</text>
                            <text x="10" y="106">3500</text>
                            <text x="10" y="206">3000</text>
                            <text x="10" y="306">2500</text>
                            <text x="10" y="406">2000</text>
                            <text x="10" y="500">1500</text>
                            <text x="0" y="250" className="label-title">SR</text>
                        </g>
                        {graphDataSupport.map(point => {
                            return point;
                        })}
                    </svg>
                </Grid>
                <Backdrop className={classes.backdrop} open={this.state.loading}>
                    <CircularProgress color="inherit" />
                </Backdrop>
                <Dialog
                    open={this.state.showDialog}
                    onClose={() => {
                        this.setState({showDialog: false});
                    }}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{this.state.dialogHeader}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {this.state.dialogText}
                        </DialogContentText>
                        <DialogActions>
                            <Button onClick={() => {
                                    this.setState({showDialog: false});
                                }} color="primary">
                                OK
                            </Button>
                        </DialogActions>
                    </DialogContent>
                </Dialog>
            </Grid>
        );
    }
}

OWFriendTracking.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(OWFriendTracking);