import React from 'react';
import { PropTypes } from 'prop-types';
import _ from 'lodash';

import { 
    Grid,
} from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

import Flickr from 'flickr-sdk'
import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'

import envConfig from '../../envConfig'
import calendarConfig from './calendar/calendarConfig';

const gapi = window.gapi;

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
        width: '413px',
        height: '100%',
        padding: '10px 20px 10px 0px'
    },
    flickrImg: {
        height: 550,
        width: 453,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
    },
    calendarContainer: {
        width: '896px',
        height: '100%',
        margin: '5px auto',
        borderCollapse: 'collapse',
        color: '#FFF',
        fontSize: 12,
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
        padding: 2,
        margin: 0,
        width: 122
    },
    eventItem: {
        listStyle: 'none',
        width: '126px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'hidden'
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
        gapi.load('client', this.startCalendar);
    }

    startCalendar = () => {
        gapi.client.init({
            apiKey: envConfig.gaKey,
            clientId: envConfig.gaClientID,
            discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
            scope: "https://www.googleapis.com/auth/calendar.readonly"
        }).then(() => {
            // Listen for sign-in state changes.
            gapi.auth2.getAuthInstance().isSignedIn.listen(this.loadCalendars);
    
            // Handle the initial sign-in state.
            this.calendarSignIn(gapi.auth2.getAuthInstance().isSignedIn.get());
        }, function(error) {
            console.log(error);
        });
    }

    calendarSignIn = (signinStatus) => {
        if (!signinStatus) {
            gapi.auth2.getAuthInstance().signIn();
        } else {
            this.loadCalendars();
        }
    }

    loadCalendars = () => {
        const firstDate = this.firstDate(); //`${date.getFullYear()}-${date.getMonth() +1}-1T00:00:00Z`
        const lastDate = this.lastDate(); //`${date.getFullYear() + (date.getMonth() === 11 ? 1 : 0)}-${date.getMonth() === 11 ? 1 : date.getMonth() + 2}-1T00:00:00Z`;

        gapi.client.calendar.calendarList.list()
            .then(this.parseApi)
            .then(data => {
                const promiseArr = [];
                
                data.items.forEach(calendar => {
                    promiseArr.push(gapi.client.calendar.events.list({
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
        const numOfDaysToSubtract = (new Date(`${date.getFullYear()}-${('0' + (date.getMonth()+1)).slice(-2)}-01T00:00:00-08:00`)).getDay();

        date.setDate(1 - numOfDaysToSubtract);

        return `${date.getFullYear()}-${('0' + (date.getMonth()+1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}T00:00:00`
    }

    lastDate = () => {
        const date = new Date();
        const numOfDaysInMonth = calendarConfig.daysInMonths[date.getMonth()]
        const numOfDaysToAdd = (new Date(`${date.getFullYear()}-${('0' + (date.getMonth()+1)).slice(-2)}-${numOfDaysInMonth}T00:00:00-08:00`)).getDay();

        date.setDate(numOfDaysInMonth + 7 - numOfDaysToAdd);

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
                                let time = dayEvent.start.dateTime.split('T')[1];
                                if(time.split(':')[0] > 12) {
                                    const timeTail = time.split(':')[1] == '00' ? 'pm': ':' + time.split(':')[1] + 'pm';
                                    time = (time.split(':')[0] -12) + timeTail;
                                } else {
                                    const timeTail = time.split(':')[1] == '00' ? 'am': ':' + time.split(':')[1] + 'am';
                                    time = Number(time.split(':')[0]) + timeTail;
                                }
                                return {
                                    ...dayEvent,
                                    startTime: time
                                }
                            });
                            return {
                                ...day,
                                events: dayEvents.splice(0, 5)
                            }
                        });

                        return this.generateDates(dayArr, index);
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
                <td 
                    className={`${classes.calendarElement} ${dayArr[0].date.getDate() == today.getDate() && dayArr[0].date.getMonth() == today.getMonth() ? classes.currentDate : ''}`}
                >
                    <span className={classes.dateTitle}>{dayArr[0].date.getDate()}</span>
                    <ul className={classes.eventContainer}>
                        {dayArr[0].events.map((event) => {
                            return (
                                <li key={event.id} className={classes.eventItem}>{event.startTime} {event.summary || 'no summary'}</li>
                            )
                        })}
                    </ul>
                </td>
                <td 
                    className={`${classes.calendarElement} ${dayArr[1].date.getDate() == today.getDate() && dayArr[1].date.getMonth() == today.getMonth() ? classes.currentDate : ''}`}
                >
                    <span className={classes.dateTitle}>{dayArr[1].date.getDate()}</span>
                    <ul className={classes.eventContainer}>
                        {dayArr[1].events.map((event) => {
                            return (
                                <li key={event.id} className={classes.eventItem}>{event.startTime} {event.summary || 'no summary'}</li>
                            )
                        })}
                    </ul>
                </td>
                <td 
                    className={`${classes.calendarElement} ${dayArr[2].date.getDate() == today.getDate() && dayArr[2].date.getMonth() == today.getMonth() ? classes.currentDate : ''}`}
                >
                    <span className={classes.dateTitle}>{dayArr[2].date.getDate()}</span>
                    <ul className={classes.eventContainer}>
                        {dayArr[2].events.map((event) => {
                            return (
                                <li key={event.id} className={classes.eventItem}>{event.startTime} {event.summary || 'no summary'}</li>
                            )
                        })}
                    </ul>
                </td>
                <td 
                    className={`${classes.calendarElement} ${dayArr[3].date.getDate() == today.getDate() && dayArr[3].date.getMonth() == today.getMonth() ? classes.currentDate : ''}`}
                >
                    <span className={classes.dateTitle}>{dayArr[3].date.getDate()}</span>
                    <ul className={classes.eventContainer}>
                        {dayArr[3].events.map((event) => {
                            return (
                                <li key={event.id} className={classes.eventItem}>{event.startTime} {event.summary || 'no summary'}</li>
                            )
                        })}
                    </ul>
                </td>
                <td 
                    className={`${classes.calendarElement} ${dayArr[4].date.getDate() == today.getDate() && dayArr[4].date.getMonth() == today.getMonth() ? classes.currentDate : ''}`}
                >
                    <span className={classes.dateTitle}>{dayArr[4].date.getDate()}</span>
                    <ul className={classes.eventContainer}>
                        {dayArr[4].events.map((event) => {
                            return (
                                <li key={event.id} className={classes.eventItem}>{event.startTime} {event.summary || 'no summary'}</li>
                            )
                        })}
                    </ul>
                </td>
                <td 
                    className={`${classes.calendarElement} ${dayArr[5].date.getDate() == today.getDate() && dayArr[5].date.getMonth() == today.getMonth() ? classes.currentDate : ''}`}
                >
                    <span className={classes.dateTitle}>{dayArr[5].date.getDate()}</span>
                    <ul className={classes.eventContainer}>
                        {dayArr[5].events.map((event) => {
                            return (
                                <li key={event.id} className={classes.eventItem}>{event.startTime} {event.summary || 'no summary'}</li>
                            )
                        })}
                    </ul>
                </td>
                <td 
                    className={`${classes.calendarElement} ${dayArr[6].date.getDate() == today.getDate() && dayArr[6].date.getMonth() == today.getMonth() ? classes.currentDate : ''}`}
                >
                    <span className={classes.dateTitle}>{dayArr[6].date.getDate()}</span>
                    <ul className={classes.eventContainer}>
                        {dayArr[6].events.map((event) => {
                            return (
                                <li key={event.id} className={classes.eventItem}>{event.summary || 'no summary'}</li>
                            )
                        })}
                    </ul>
                </td>
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