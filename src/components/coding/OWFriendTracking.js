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
        color: 'A0F'
    }, {
        name: 'PearlRadiant',
        color: 'eae0c8'
    }, {
        name: 'pinkiemochii',
        color: 'ff83ef'
    }, {
        name: 'raider741',
        color: 'F00'
    }, {
        name: 'APlS%20I3EE',
        color: '0AF'
    }, {
        name: 'TayTheYucky',
        color: '0AF'
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
        zIndex: 1
    },
    chip: {
        margin: '5px',
    },
    playerCard: {
        background: 'rgba(221, 221, 221, .7)',
        margin: '20px',
        maxWidth: 600
    },
    header: {
        background: 'rgba(13, 13, 154, .5)',
        color: '#FFF',
        display: 'flex',
        alignItems: 'center'
    },
    playerIcon: {
        width: 150,
        height: 150
    },
    playerName: {
        fontWeight: 600,
        fontSize: 24,
        textTransform: 'uppercase',
        fontStyle: 'italic',
        fontFamily: 'sans-serif',
        margin: '0 10px'
    },
    playerLevel: {
        fontSize: 12
    },
    levelIcon: {
        height: 12
    },
    endorsementIcon: {
        width: 120,
        height: 120
    },
    endorsementLvl: {
        fontSize: '36px',
        display: 'block',
        position: 'absolute',
        top: 34,
        left: 50,
    },
    rankings: {
        color: '#333',
        fontSize: 22,
        padding: '0',
    },
    rankingItem: {
        listStyle: 'none',
        background: 'rgba(200, 200, 200, .5)',
        display: 'flex',
        justifyContent: 'space-between',
        maxWidth: 300,
        padding: 5,
        margin: '5px 20px'
    },
    roleImg: {
        height: '14px'
    },
    rankingImg: {
        height: '22px'
    },
    roleSpan: {
        fontSize: 12,
        textTransform: 'uppercase'
    },
    rankSpan: {

    }
};

class OWFriendTracking extends React.Component {
    state = {
        users: [],
        currentUser: {},
        loading: false,
        showDialog: false
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
                const groupUsers = _.groupBy(users, 'name');
                userNames.forEach(user => {
                    if(!groupUsers[user.name]) {
                        groupUsers[user.name] = {name: user.name};
                    }
                });
                this.setState({
                    users: groupUsers,
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
                const currentStats = this.state.users[user.name][this.state.users[user.name].length - 1];

                const data = {
                    name: user.name,
                    overall: user.rating,
                };

                user.ratings.forEach(rating => {
                    data[rating.role === 'damage' ? 'dps' : rating.role] = rating.level;
                });

                if (
                    !currentStats ||
                    currentStats.dps !== data.dps ||
                    currentStats.support !== data.support ||
                    currentStats.tank !== data.tank
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
            if(!this.state.users[key].length) {
                break;
            }
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
                <Grid item xs={12}>
                    <button onClick={this.onFetchUsers}>Fetch Users</button>
                    <h3>Users</h3>
                    <Grid container justify="flex-start">
                        {userNames.map(user => {
                            return (
                                <Chip
                                    onClick={() => {
                                        this.showUser(user.name);
                                    }}
                                    className={classes.chip}
                                    key={user.name}
                                    style={{backgroundColor: `#${user.color}`}}
                                    label={user.name.replace('%20', ' ')}
                                />
                            )
                        })}
                    </Grid>
                    {user.name && (
                            <Grid container justify='flex-start' className={classes.playerCard}>
                                {/* Top portion */}
                                <Grid className={classes.header} item xs={12}>
                                    <img src={user.icon} alt='player icon' className={classes.playerIcon}/>
                                    <span className={classes.playerName}>
                                        {user.name}<br/>
                                        <span className={classes.playerLevel}>
                                            lvl: {user.level} - Prestige: {user.prestige}
                                        </span>
                                    </span>
                                    <span style={{position: 'relative'}}>
                                        <img src={user.endorsementIcon} alt='endorsement level' className={classes.endorsementIcon}/>
                                        <span className={classes.endorsementLvl}>{user.endorsement}</span>
                                    </span>
                                </Grid>
                                {/* bottom Portion */}
                                <Grid item xs={12}>
                                    <ul className={classes.rankings}>
                                        {user.ratings.map(rating => {
                                            return (
                                                <li key={rating.role} className={classes.rankingItem}>
                                                    <span className={classes.roleSpan}><img className={classes.rankingImg} src={rating.roleIcon} alt='role icon'/> {rating.role}</span>
                                                    <span className={classes.rankSpan}><img className={classes.rankingImg} src={rating.rankIcon} alt='rank icon'/> {rating.level}</span>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </Grid>
                                <Grid item xs={12}>
                                    <ul className={classes.rankings}>
                                        {this.state.users[user.name].map(rating => {
                                            return (
                                                <li key={rating.created_at} className={classes.rankingItem}>
                                                    <span className={classes.rankSpan}>Tank: {rating.tank} DPS: {rating.dps} Support: {rating.support}</span>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </Grid>
                            </Grid>
                        )
                    }
                </Grid>
                <h3>Charts</h3>
                <Grid item xs={12}>
                    <h4>Oerall</h4>
                    <svg viewBox="0 0 550 550" className="chart" style={{maxWidth: 600, margin: '5px 0 30px 0', background: '#FFF'}}>
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
                <Grid item xs={12} md={4}>
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
                <Grid item xs={12} md={4}>
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
                <Grid item xs={12} md={4}>
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