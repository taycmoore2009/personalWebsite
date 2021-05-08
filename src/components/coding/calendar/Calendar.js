import React, { useState, useEffect } from 'react'
import envConfig from '../../../envConfig';

import _ from 'lodash';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    calendarContainer: {
        width: '100%',
        height: '100%',
        margin: '5px auto 5px 10px',
        borderCollapse: 'collapse',
        color: '#a7a8aa',
        fontSize: 12,
        tableLayout: 'fixed',
    },
    calendarElement: {
        height: 115,
        width: 128,
        verticalAlign: 'top',
        border: '1px solid #484a50',
        background: '#202225',
        overflow: 'hidden',
    },
    dateTitle: {
        color: '#a7a8aa',
        textAlign: 'right',
        width: '100%',
        display: 'inline-block'
    },
    currentDate: {
        border: '2px solid #89b4f7',
    },
    eventContainer: {
        width: '100%',
        borderCollapse: 'collapse',
    },
    tayEvent: {
        background: '#2c9ed6',
        borderRadius: '2px',
        color: '#000',
        border: '1px solid #000',
    },
    stephEvent: {
        background: '#4aba86',
        borderRaidus: '2px',
        color: '#000',
        border: '1px solid #000',
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
}));

export default () => {
    const startCalendar = () => {
        window.gapi.client.init({
            apiKey: envConfig.gaKey,
            clientId: envConfig.gaClientID,
            discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
            scope: "https://www.googleapis.com/auth/calendar.readonly"
        }).then(() => {
            // Listen for sign-in state changes.
            window.gapi.auth2.getAuthInstance().isSignedIn.listen(loadCalendars);

            // Handle the initial sign-in state.
            calendarSignIn(window.gapi.auth2.getAuthInstance().isSignedIn.get());
        }, function(error) {
            console.log(error);
        });
    }

    const calendarSignIn = (signinStatus) => {
        if (!signinStatus) {
            window.gapi.auth2.getAuthInstance().signIn();
        } else {
            loadCalendars();
        }
    };

    const loadCalendars = () => {
        const firstDate = getFirstDate();
        
        const lastDate = getLastDate();
        window.gapi.client.calendar.calendarList.list()
            .then(parseApi)
            .then(data => {
                const promiseArr = [];
                
                data.items.forEach(calendar => {
                    promiseArr.push(window.gapi.client.calendar.events.list({
                        calendarId: calendar.id,
                        timeMin: `${firstDate}Z`,
                        timeMax: `${lastDate}Z`,
                        showDeleted: false,
                        singleEvents: true
                    }).then(parseApi))
                });
    
                Promise.all(promiseArr).then(calendarArr => {
                    const dateArr = createDateArray(new Date(firstDate), new Date(lastDate));

                    updateEvents(parseList(calendarArr));
                    updateDateArr(dateArr);
                })
            });
    };

    const getFirstDate = () => {
        const date = new Date();
    
        date.setDate(date.getDate() - date.getDay());
        return `${date.getFullYear()}-${('0' + (date.getMonth()+1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}T00:00:00`
    }
    
    const getLastDate = () => {
        const date = new Date();
        date.setDate(date.getDate() - date.getDay() + 28)
    
        return `${date.getFullYear()}-${('0' + (date.getMonth()+1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}T00:00:00`
    }
    
    const createDateArray = (firstDate, lastDate) => {
        const dateArr = [];
        let currentDate = new Date(firstDate.toISOString());
    
        while(firstDate.toISOString() !== lastDate.toISOString()) {
            dateArr.push(currentDate);
            firstDate.setDate(firstDate.getDate() + 1);
            currentDate = new Date(firstDate.toISOString());
        }
        return dateArr;
    }
    
    const parseList = (calendarArr) => {
        const list = [];
        calendarArr.forEach(calendar => {
            calendar.items.forEach(event => {
                list.push({user: calendar.summary, ...event});
            });
        });
        return _.sortBy(list, 'start.dateTime');
    }
    
    const parseApi = (resp) => {
        return JSON.parse(resp.body);
    }
    
    const generateTable = (dateArr, events) => {
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
                                if (event.start.dateTime) {
                                    return event.start.dateTime.split('T')[0] === day.date.toISOString().split('T')[0];
                                } else if (event.start.date){
                                    return event.start.date === day.date.toISOString().split('T')[0];
                                }
                            }).map((dayEvent) => {
                                let startTime = dayEvent.start.dateTime ? dayEvent.start.dateTime.split('T')[1] : '00:00:00';
                                let endTime = dayEvent.end.dateTime ? dayEvent.end.dateTime.split('T')[1] : '23:59:99';
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
    
                        return generateDates(dayArr, index);
                    })}
                </tbody>
            </table>
        )
    }
    
    const generateEvents = (events) => {
        return (
            <table className={classes.eventContainer}>
                <tbody>
                {events.map(event => {
                    return (
                        <tr key={event.id} className={`${classes.eventItem} ${event.user.indexOf('tay') !== -1 ? classes.tayEvent : classes.stephEvent}`}>
                            <td>
                                {event.startTime}-{event.endTime}<br/>
                                <div className={classes.eventDesc}>{event.summary || 'no summary'}</div>
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        )
    }
    
    const generateDates = (dayArr, index) => {
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
                            {generateEvents(day.events)}
                        </td>
                    );
                })}
            </tr>
        )
    }

    
    const classes = useStyles();
    const [events, updateEvents] = useState([]);
    const [dateArr, updateDateArr] = useState([]);

    
    useEffect(() => {
        window.gapi.load('client', startCalendar);
    }, [])

    return dateArr.length ? (
        generateTable(dateArr, events)
    ) : (
        <div></div>
    );
}