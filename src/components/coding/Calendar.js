import React from 'react';
import { PropTypes } from 'prop-types';
import _ from 'lodash';

import { 
    Grid,
} from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

import Flickr from 'flickr-sdk'
import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

import envConfig from '../../envConfig';

const styles = {
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        listStyle: 'none',
        margin: 0,
        background: '#000'
    },
    slideShow: {
        width: '423px',
        height: '100%',
        padding: '10px 10px 10px 20px'
    },
    flickrImg: {
        height: 768,
        width: 453,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
    },
    calendarContainer: {
        width: '896px',
        height: '600px',
        margin: '5px auto',
        borderCollapse: 'collapse',
        color: '#FFF',
        fontSize: 12,
        tableLayout: 'fixed',
    },
    calendarElement: {
        height: 115,
        width: 128,
        verticalAlign: 'top',
        border: '1px solid #8671ce',
        overflow: 'hidden',
    },
    dateTitle: {
        color: '#8671ce',
        textAlign: 'right',
        width: '100%',
        display: 'inline-block'
    },
    currentDate: {
        border: '2px solid #FFF',
    },
    eventContainer: {
        width: '100%',
    },
    tayEvent: {
        color: '#72a3ff'
    },
    stephEvent: {
        color: '#faf'
    },
    eventItem: {
        verticalAlign: 'top',
    },
    eventDesc: {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        width: '100%',
    },
};

class Calendar extends React.Component {
    state = {
        photos: [],
        firstDate: '',
        lastDate: '',
        events: [],
        dateArr: []
    }
    
    componentDidMount = () => {
        const flickr = new Flickr('a8b1cb91cd5325d42f1f7278ed3e0e07');

        flickr.groups.pools.getPhotos({
            group_id: '14734920@N24',
            page_size: 200
        })
            .then(resp => {return resp.body.photos})
            .then(groupInfo => {
                if (groupInfo.photo && groupInfo.photo.length) {
                    const photos = [];

                    groupInfo.photo.forEach(photo => {
                        photos.push({img: `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`, title: photo.title});
                    });
                    this.setState({photos});
                }
            });
        var timer = setInterval(() => {
            var gapi = window.gapi;
            if (gapi) {
                this.gapi = gapi;
                this.gapi.load('client', this.startCalendar);
                clearInterval(timer);
            }
        }, 500)
    }

    startCalendar = () => {
        this.gapi.client.init({
            apiKey: envConfig.gaKey,
            clientId: envConfig.gaClientID,
            discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
            scope: "https://www.googleapis.com/auth/calendar.readonly"
        }).then(() => {
            // Listen for sign-in state changes.
            this.gapi.auth2.getAuthInstance().isSignedIn.listen(this.loadCalendars);
    
            // Handle the initial sign-in state.
            this.calendarSignIn(this.gapi.auth2.getAuthInstance().isSignedIn.get());
        }, function(error) {
            console.log(error);
        });
    }

    calendarSignIn = (signinStatus) => {
        if (!signinStatus) {
            this.gapi.auth2.getAuthInstance().signIn();
        } else {
            this.loadCalendars();
        }
    }

    loadCalendars = () => {
        const firstDate = this.firstDate(); //`${date.getFullYear()}-${date.getMonth() +1}-1T00:00:00Z`
        const lastDate = this.lastDate(); //`${date.getFullYear() + (date.getMonth() ==== 11 ? 1 : 0)}-${date.getMonth() ==== 11 ? 1 : date.getMonth() + 2}-1T00:00:00Z`;

        this.gapi.client.calendar.calendarList.list()
            .then(this.parseApi)
            .then(data => {
                const promiseArr = [];
                
                data.items.forEach(calendar => {
                    promiseArr.push(this.gapi.client.calendar.events.list({
                        calendarId: calendar.id,
                        timeMin: `${firstDate}Z`,
                        timeMax: `${lastDate}Z`,
                        showDeleted: false,
                        singleEvents: true
                    }).then(this.parseApi))
                });

                Promise.all(promiseArr).then(calendarArr => {
                    const dateArr = this.createDateArray(new Date(firstDate), new Date(lastDate));

                    this.setState({
                        events: this.parseList(calendarArr),
                        firstDate,
                        lastDate,
                        dateArr
                    });
                })
            });
    }

    firstDate = () => {
        const date = new Date();

        date.setDate(date.getDate() - date.getDay());
        return `${date.getFullYear()}-${('0' + (date.getMonth()+1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}T00:00:00`
    }

    lastDate = () => {
        const date = new Date();
        date.setDate(date.getDate() - date.getDay() + 21)

        return `${date.getFullYear()}-${('0' + (date.getMonth()+1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}T00:00:00`
    }

    createDateArray = (firstDate, lastDate) => {
        const dateArr = [];
        let currentDate = new Date(firstDate.toISOString());

        while(firstDate.toISOString() !== lastDate.toISOString()) {
            dateArr.push(currentDate);
            firstDate.setDate(firstDate.getDate() + 1);
            currentDate = new Date(firstDate.toISOString());
        }
        return dateArr;
    }

    parseList = (calendarArr) => {
        const list = [];
        calendarArr.forEach(calendar => {
            calendar.items.forEach(event => {
                list.push({user: calendar.summary, ...event});
            });
        });
        return _.sortBy(list, 'start.dateTime');
    }

    parseApi = (resp) => {
        return JSON.parse(resp.body);
    }

    generateTable = (dateArr, events) => {
        const {classes} = this.props;
        const counter = new Array(dateArr.length / 7).fill(undefined);

        return (
            <table className={classes.calendarContainer}>
                <thead>
                    <tr className={classes.calendarHeader}>
                        <th>Sunday</th>
                        <th>Monday</th>
                        <th>Tuesday</th>
                        <th>Wednesday</th>
                        <th>Thursday</th>
                        <th>Friday</th>
                        <th>Saturday</th>
                    </tr>
                </thead>
                <tbody>
                    {counter.map((count, index) => {
                        const multiplier = index * 7;
                        let dayArr = [
                            {
                                date: dateArr[0 + multiplier],
                            },
                            {
                                date: dateArr[1 + multiplier],
                            },
                            {
                                date: dateArr[2 + multiplier],
                            },
                            {
                                date: dateArr[3 + multiplier],
                            },
                            {
                                date: dateArr[4 + multiplier],
                            },
                            {
                                date: dateArr[5 + multiplier],
                            },
                            {
                                date: dateArr[6 + multiplier],
                            },
                        ];

                        dayArr = dayArr.map((day) => {
                            const dayEvents = _.filter(events, (event) => {
                                return event.start.dateTime.split('T')[0] === day.date.toISOString().split('T')[0];
                            }).map((dayEvent) => {
                                let startTime = dayEvent.start.dateTime.split('T')[1];
                                let endTime = dayEvent.end.dateTime.split('T')[1];
                                const startHour = startTime.split(':')[0];
                                const endHour = endTime.split(':')[0];

                                if (startHour === '12') {
                                    startTime= Number(startHour) + (startTime.split(':')[1] === '00' ? 'pm': ':' + startTime.split(':')[1] + 'pm');
                                } else if(startHour > 11) {
                                    startTime= (startHour -12) + (startTime.split(':')[1] === '00' ? 'pm': ':' + startTime.split(':')[1] + 'pm');
                                } else {
                                    startTime= Number(startHour) + (startTime.split(':')[1] === '00' ? 'am': ':' + startTime.split(':')[1] + 'am');
                                }

                                if (endHour === '12') {
                                    endTime= Number(endHour) + (endTime.split(':')[1] === '00' ? 'pm': ':' + endTime.split(':')[1] + 'pm');
                                } else if(endHour > 11) {
                                    endTime= (endHour -12) + (endTime.split(':')[1] === '00' ? 'pm': ':' + endTime.split(':')[1] + 'pm');
                                } else {
                                    endTime= Number(endHour) + (endTime.split(':')[1] === '00' ? 'am': ':' + endTime.split(':')[1] + 'am');
                                }

                                return {
                                    ...dayEvent,
                                    startTime,
                                    endTime
                                }
                            });
                            return {
                                ...day,
                                events: dayEvents
                            }
                        });

                        return this.generateDates(dayArr, index);
                    })}
                </tbody>
            </table>
        )
    }

    generateEvents = (events) => {
        const {classes} = this.props;
        return (
            <table className={classes.eventContainer}>
                <tbody>
                {events.map(event => {
                    return (
                        <tr key={event.id} className={`${classes.eventItem} ${event.user.indexOf('tay') !== -1 ? classes.tayEvent : classes.stephEvent}`}>
                            <td>{event.startTime}<br/>{event.endTime}</td>
                            <td><div className={classes.eventDesc}>{event.summary || 'no summary'}</div></td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        )
    }

    generateDates = (dayArr, index) => {
        const {classes} = this.props;
        const today = new Date();

        return (
            <tr key={`week ${index +1}`}>
                {dayArr.map(day => {
                    return (
                        <td
                            key={day.date.getDate()}
                            className={`${classes.calendarElement} ${day.date.getDate() === today.getDate() && day.date.getMonth() === today.getMonth() ? classes.currentDate : ''}`}
                        >
                            <span className={classes.dateTitle}>{day.date.getDate()}</span>
                            {this.generateEvents(day.events)}
                        </td>
                    );
                })}
            </tr>
        )
    }

    render = () => {
        const { classes } = this.props;
        const {dateArr, events} = this.state;

        return (
            <Grid container justify="flex-start" className={classes.root}>
                <Grid item xs={8}>
                    <Grid item xs={12}>
                        {dateArr.length && this.generateTable(dateArr, events)}
                    </Grid>
                </Grid>
                <Grid item container xs={4}>
                    <div className={`${classes.slideShow} slide-container`}>
                        <Fade
                            indicators={false}
                            arrows={false}
                        >
                            {this.state.photos.map(photo => {
                                return (
                                <div key={photo.title} className="each-fade">
                                    <div className="image-container">
                                        <div className={classes.flickrImg} style={{backgroundImage: `url(${photo.img})`}} alt={photo.title}></div>
                                    </div>
                                    <h2>{photo.title.indexOf('IMG') === -1 && photo.title.indexOf('PXL') === -1 ? photo.title : ''}</h2>
                                </div>
                                )
                            })}
                        </Fade>
                    </div>
                </Grid>
            </Grid>
        );
    }
}

Calendar.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Calendar);