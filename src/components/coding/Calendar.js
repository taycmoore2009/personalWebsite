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
        background: '#2d2e30',
        fontFamily: 'sans-serif'
    },
    slideShow: {
        width: 'calc(100% - 30px)',
        padding: '10px 20px 10px 10px',
        '& *': {
            height: '100%'
        },
    },
    flickrImg: {
        width: 453,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
    },
    calendarContainer: {
        width: '98%',
        height: '500px',
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
    infoContainer: {
        padding: '0 10px'
    },
    weather: {
        height: 190,
        '& iframe': {
            height: '190px !important'
        }
    },
    quotesContainer: {
        width: '660px',
        margin: 'auto 0',
        color: '#a7a8aa',
        height: '268px',
        fontSize: '24px',
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

        /** Load flicker api */
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
        
        /* Load google api */
        var timer = setInterval(() => {
            var gapi = window.gapi;
            if (gapi) {
                this.gapi = gapi;
                this.gapi.load('client', this.startCalendar);
                clearInterval(timer);
            }
        }, 500)
        this.startRefresher();
        
        /** Load stock api */
        const tag = document.createElement('script');
        tag.async = true;
        tag.src = 'https://s3.tradingview.com/tv.js';
        const body = document.getElementsByTagName('body')[0];
        body.appendChild(tag);

        var timer2 = setInterval(() => {
            var tradingView = window.TradingView;
            if (tradingView) {
                new tradingView.widget(
                    {
                        "width": 325,
                        "height": 240,
                        "symbol": "BITSTAMP:ETHUSD",
                        "interval": "30",
                        "timezone": "America/Los_Angeles",
                        "theme": "dark",
                        "style": "2",
                        "locale": "en",
                        "toolbar_bg": "#f1f3f6",
                        "enable_publishing": false,
                        "hide_top_toolbar": true,
                        "save_image": false,
                        "container_id": "tradingview_84d39"
                      }
                )
                clearInterval(timer2);
            }
        }, 500);

        /** load weather api */
        const script = document.createElement('script');
        script.type = "text/javascript";
        script.src = "https://www.theweather.com/wid_loader/b4cb224432e2946a056553aaee7ab682"
        script.onload = function(t) {window.test = this; console.log(t); console.log('loaded')};
        document.body.appendChild(script);
    }
    
    startRefresher = () => {
        var timer = setInterval(() => {
            if (this.gapi && !this.gapi.auth2.getAuthInstance().isSignedIn.get()) {
                alert('You have been signed out?!');
                clearInterval(timer);
                return
            }
            this.loadCalendars();
        }, 1800000)
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
                <Grid item container xs={12} justify='space-between' className={classes.infoContainer}>
                    <Grid item xs={3} container justify='flex-start'>
                        <div id="cont_b4cb224432e2946a056553aaee7ab682" className={classes.weather}></div>
                    </Grid>
                    <Grid item container xs={6} justify='center'>
                        <div className={`slide-container ${classes.quotesContainer}`}>
                            <Fade
                                indicators={false}
                                arrows={false}
                            >
                                <div className='each-fade'>
                                    <p>Convince yourself that you have the power to be all what you wish to be. It is YOU who could generate in you a huge power of motivation to push you forward and ignite you to think and to do.<br/>—<strong>Unknown</strong></p>
                                </div>
                                <div className='each-fade'>
                                    <p>You can’t go back and change the beginning, but you can start where you are and change the ending.<br/>—<strong>C. S. Lewis</strong></p>
                                </div>
                                <div className='each-fade'>
                                    <p>Happiness is not the absence of problems, it’s the ability to deal with them.<br/>—<strong>Steve Maraboli</strong></p>
                                </div>
                                <div className='each-fade'>
                                    <p>The most precious gift we can offer others is our presence. When our mindfulness embr/aces those we love, they will bloom like flowers.<br/>—<strong>Thich Nhat Hanh</strong></p>
                                </div>
                                <div className='each-fade'>
                                    <p>Miracles start to happen when you give as much energy to your dreams as you do to your fears.<br/>—<strong>Richard Wilkins</strong></p>
                                </div>
                                <div className='each-fade'>
                                    <p>If you are not willing to learn, no one can help you. If you are determined to learn, no one can stop you.<br/>—<strong>Zig Ziglar</strong></p>
                                </div>
                                <div className='each-fade'>
                                    <p>Don’t&nbsp;be upset with people and situations in your life, because both are powerless without your reaction.<br/>—<strong>Unknown</strong></p>
                                </div>
                                <div className='each-fade'>
                                    <p>Be patient. Empires are not built in a day<br/>—<strong>Unknown</strong></p>
                                </div>
                                <div className='each-fade'>
                                    <p>Never perceive anything as being inevitable or predestined. The only absolute is uncertainty.<br/>—<strong>Lionel Suggs</strong></p>
                                </div>
                                <div className='each-fade'>
                                    <p>Love is a fruit in season at all times and within reach of every hand.<br/>—<strong>Mother Teresa</strong></p>
                                </div>
                                <div className='each-fade'>
                                    <p>The truest indication of gratitude is to return what you are grateful for.<br/>—<strong>Richard Paul Evans</strong></p>
                                </div>
                                <div className='each-fade'>
                                    <p>There’s no need to rush. What’s meant for you always arrives right on time.<br/>—<strong>Unknown</strong></p>
                                </div>
                                <div className='each-fade'>
                                    <p>Happiness lies in the joy of achievement and the thrill of creative effort.<br/>—<strong>Franklin D. Roosevelt</strong></p>
                                </div>
                                <div className='each-fade'>
                                    <p>Find the sweetness in your own heart so that you may find the sweetness in every Heart!<br/>—<strong>Rumi</strong></p>
                                </div>
                                <div className='each-fade'>
                                    <p>Open your eyes to the beauty around you, Open your mind to the wonders of life, Open your heart to those who love you, And always be true to yourself.<br/>—<strong>Maya Angelou</strong></p>
                                </div>
                                <div className='each-fade'>
                                    <p>For everything you have lost, you have gained something else.<br/>—<strong>Unknown</strong></p>
                                </div>
                                <div className='each-fade'>
                                    <p>A failure establishes only this, that our determination to succeed was not strong enough.<br/>—<strong>John Christian Bovee</strong></p>
                                </div>
                                <div className='each-fade'>
                                    <p>Doing what you like is freedom. Liking what you do is happiness.<br/>—<strong>Frank Tyger</strong></p>
                                </div>
                                <div className='each-fade'>
                                    <p>The universe will often give you what you truly desire, even when you didn’t realize it was what you were truly wanting.<br/>—<strong>Unknown</strong></p>
                                </div>
                                <div className='each-fade'>
                                    <p>We have a ‘strategic’ plan. It’s called doing things.<br/>—<strong>Herb Kelleher</strong></p>
                                </div>
                                <div className='each-fade'>
                                    <p>Your future is created by what you do today, not tomorrow.<br/>—<strong>Unknown</strong></p>
                                </div>
                                <div className='each-fade'>
                                    <p>The happiest people don’t have the best of everything, they make the best of everything.<br/>—<strong>Unknown</strong><br/></p>
                                </div>
                                <div className='each-fade'>
                                    <p>In&nbsp;life, you’ll meet two kinds of people. The ones who build you up and the ones who tear you down. In the end, you’ll thank them both.<br/>—<strong>Unknown</strong></p>
                                </div>
                                <div className='each-fade'>
                                    <p>I thank all those who laughed at my dreams; you taught me to grow respecting other people’s struggles<br/>—<strong>Paulo Coelho</strong></p>
                                </div>
                                <div className='each-fade'>
                                    <p>Always stay true to yourself and never sacrifice who you are for anyone.<br/>—<strong>Unknown</strong></p>
                                </div>
                                <div className='each-fade'>
                                    <p>You can’t change what’s going on around you until you start changing what’s going on within you.<br/>—<strong>Unknown</strong></p>
                                </div>
                                <div className='each-fade'>
                                    <p>The price of inaction is far greater than the cost of making a mistake.<br/>—<strong>Meister Eckhart</strong></p>
                                </div>
                                <div className='each-fade'>
                                    <p>Never give anyone the power to take away your joy.<br/>—<strong>Jeanette Jenkins</strong></p>
                                </div>
                                <div className='each-fade'>
                                    <p>Love is like the wind. You can’t see it, but you can feel it.<br/>—<strong>Nicholas Sparks.</strong></p>
                                </div>
                                <div className='each-fade'>
                                    <p>If you paint in your mind a picture of br/ight and happy expectations, you put yourself into a condition conducive to your goals.<br/>—<strong>Norman Vincent Peale</strong></p>
                                </div>
                                <div className='each-fade'>
                                    <p>Don’t be scared to walk alone. Don’t be scared to like it.<br/>—<strong>John Mayer</strong></p>
                                </div>
                                <div className='each-fade'>
                                    <p>To be a champ, you have to believe in yourself when nobody else will.<br/>—<strong>Sugar Ray Robinson</strong></p>
                                </div>
                                <div className='each-fade'>
                                    <p>Nobody is superior, nobody is inferior, but nobody is equal either. People are simply unique, incomparable.<br/>—<strong>Osho</strong></p>
                                </div>
                                <div className='each-fade'>
                                    <p>Some people feel the rain. Others just get wet.<br/>—<strong>Bob Marley</strong></p>
                                </div>
                                <div className='each-fade'>
                                    <p>Good things come to those who go get them.<br/>—<strong>Unknown</strong></p>
                                </div>
                                <div className='each-fade'>
                                    <p>You are searching the world for treasure, but the real treasure is Yourself.<br/>—<strong>Rumi</strong></p>
                                </div>
                                <div className='each-fade'>
                                    <p>The greatest mistake we make is living in constant fear that we will make one.<br/>—<strong>Unknown</strong></p>
                                </div>
                                <div className='each-fade'>
                                    <p>If you think you can win, you can win. Faith is necessary to victory.<br/>—<strong>William Hazlitt</strong></p>
                                </div>
                                <div className='each-fade'>
                                    <p>You are the universe, expressing itself as a human for a little while.<br/>—<strong>Eckhart Tolle</strong></p>
                                </div>
                                <div className='each-fade'>
                                    <p>To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.<br/>—<strong>Ralph Waldo Emerson</strong></p>
                                </div>
                                <div className='each-fade'>
                                    <p>Love is the big booming beat which covers up the noise of hate.<br/>—<strong>Margaret Cho</strong></p>
                                </div>
                                <div className='each-fade'>
                                    <p>When you find peace within yourself, you become the kind of person who can live at peace with others.<br/>—<strong>Peace Pilgrim</strong></p>
                                </div>
                                <div className='each-fade'>
                                    <p>The Universe is not punishing you or blessing you. The Universe is responding to the vibr/ational attitude that you are emitting.<br/>—<strong>LOA</strong></p>
                                </div>
                                <div className='each-fade'>
                                    <p>Once you carry your own water, you will learn the value of every drop.<br/>—<strong>Unknown</strong></p>
                                </div>
                                <div className='each-fade'>
                                    <p>Don’t compare yourself to others. Keep playing the competitive game between you and you.<br/>—<strong>Unknown</strong></p>
                                </div>
                                <div className='each-fade'>
                                    <p>He who lives in harmony with himself lives in harmony with the universe.<br/>—<strong>Marcus Aurelius</strong></p>
                                </div>
                                <div className='each-fade'>
                                    <p>We should all start to live before we get too old. Fear is stupid. So are regrets.<br/>—<strong>Marilyn Monroe</strong></p>
                                </div>
                                <div className='each-fade'>
                                    <p>I cannot do all the good that the world needs. But the world needs all the good that I can do.<br/>—<strong>J. Stanfield</strong></p>
                                </div>
                                <div className='each-fade'>
                                    <p>Don’t chase people. Be you, do your own thing and work hard. The right people who belong in your life will come to you, and stay.<br/>—<strong>Unknown</strong></p>
                                </div>
                                <div className='each-fade'>
                                    <p>The great man is he who does not lose his child’s-heart.<br/>—<strong>Mencius</strong></p>
                                </div>
                                <div className='each-fade'>
                                    <p>He who lives in harmony with himself lives in harmony with the universe.<br/>—<strong>Marcus Aurelius</strong></p>
                                </div>
                                <div className='each-fade'>
                                    <p>What you become is the result of what you do today. In other words, you are preparing for something.<br/>—<strong>John C. Maxwell</strong></p>
                                </div>
                                <div className='each-fade'>
                                    <p>Be who you are and say what you feel because those who mind don’t matter and those who matter don’t mind.<br/>—<strong>Dr Seuss</strong><br/></p>
                                </div>
                                <div className='each-fade'>
                                    <p>How people treat you is their karma; how you react is yours.<br/>—<strong>Wayne W. Dyer</strong></p>
                                </div>
                                <div className='each-fade'>
                                    <p>Good things come to those who believe, better things come to those who are patient, and the best things come to those who don’t give up.<br/>—<strong>Unknown</strong></p>
                                </div>
                                <div className='each-fade'>
                                    <p>Gratitude can transform common days into thanksgivings, turn routine jobs into joy, &amp; change ordinary opportunities into blessings.<br/>—<strong>Unknown</strong></p>
                                </div>
                                <div className='each-fade'>
                                    <p>Men are not prisoners of fate, but prisoners of their own minds.<br/>—<strong>Franklin D. Roosevelt</strong></p>
                                </div>
                                <div className='each-fade'>
                                    <p>People rarely succeed unless they have fun in what they are doing.<br/>—<strong>Dale Carnegie</strong></p>
                                </div>
                                <div className='each-fade'>
                                    <p>The Universe has a plan for you, and it’s Good.<br/>—<strong>Russell Kyle</strong></p>
                                </div>
                                <div className='each-fade'>
                                    <p>Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle.<br/>—<strong>Christian D. Larson</strong></p>
                                </div>
                                <div className='each-fade'>
                                    <p>You don’t have to be great to get started, but you have to get started to be great.<br/>—<strong>Les Br/own</strong></p>
                                </div>
                                <div className='each-fade'>
                                    <p>When we strive to become better than we are, everything around us becomes better, too.<br/>—<strong>Paulo Coelho</strong></p>
                                </div>
                                <div className='each-fade'>
                                    <p>The person who says it cannot be done should not interrupt the person doing it.<br/>—<strong>Chines Proverb</strong></p>
                                </div>
                                <div className='each-fade'>
                                    <p>Don’t ever give up on what makes you truly happy.<br/>—<strong>Jonathan Landsman</strong></p>
                                </div>
                                <div className='each-fade'>
                                    <p>Healing always involves facing truths we’d rather not face, and accepting responsibility we’d rather not accept.<br/>—<strong>Dr. David Hawkins</strong></p>
                                </div>
                                <div className='each-fade'>
                                    <p>Most people find change difficult to accept, sometimes for good reasons, sometimes because of plain old inertia. <br/>—<strong>Andrew Hunt</strong></p>
                                </div>
                                <div className='each-fade'>
                                    <p>An investment in knowledge always pays the best interest.<br/>—<strong>Benjamin Franklin</strong></p>
                                </div>
                                <div className='each-fade'>
                                    <p>There is one technique that you must use if you want people to listen to you: listen to them.<br/>—<strong>Andrew Hunt</strong></p>
                                </div>
                                <div className='each-fade'>
                                    <p>Attitude is a choice. Think positive thoughts daily. Believe in yourself.<br/>—<strong>Pat Summitt</strong></p>
                                </div>
                                <div className='each-fade'>
                                    <p>The minute you get away from fundamentals – proper technique, work ethic or mental prep – the bottom can fall out of your game.<br/>—<strong>Michael Jordan</strong></p>
                                </div>
                                <div className='each-fade'>
                                    <p>Never give up! Failure and rejection are only the first step to succeeding.<br/>—<strong>Jim Valvano</strong></p>
                                </div>
                                <div className='each-fade'>
                                    <p>If you want help, help others. If you want love, give it. If you want respect, show it. Whatever you want more of, start giving more of.<br/>—<strong>Unknown</strong></p>
                                </div>
                                <div className='each-fade'>
                                    <p>Can you remember who you were, before the world told you who you should be?<br/>—<strong>Charles Bukowski</strong></p>
                                </div>
                                <div className='each-fade'>
                                    <p>Tell everyone what you want to do and someone will want to help you do it.<br/>—<strong>W. Clement Stone</strong></p>
                                </div>
                                <div className='each-fade'>
                                    <p>Learn to say ‘no’ to the good so you can say ‘yes’ to the best. <br/>—<strong>John C. Maxwell</strong></p>
                                </div>
                                <div className='each-fade'>
                                    <p>The world is full of magic things, patiently waiting for our senses to grow sharper.<br/>—<strong>W.B. Yeats</strong></p>
                                </div>
                                <div className='each-fade'>
                                    <p>Magic is believing in yourself, if you can do that, you can make anything happen.<br/>—<strong>Johann Wolfgang von Goethe</strong></p>
                                </div>
                                <div className='each-fade'>
                                    <p>We have to do the best we are capable of. This is our sacred human responsibility.<br/>—<strong>Albert Einstein</strong></p>
                                </div>
                                <div className='each-fade'>
                                    <p>When you have confidence, you can have a lot of fun. And when you have fun, you can do amazing things.<br/>—<strong>Joe Namath</strong></p>
                                </div>
                                <div className='each-fade'>
                                    <p>Great things never came from comfort zones.<br/>—<strong>Neil Strauss</strong></p>
                                </div>
                                <div className='each-fade'>
                                    <p>The first to apologize is the br/avest. The first to forgive is the strongest. The first to forget is the happiest.<br/>—<strong>Unknown</strong></p>
                                </div>
                                <div className='each-fade'>
                                    <p>Don’t worry about failures, worry about the chances you miss when you don’t even try.<br/>—<strong>Jack Canfield</strong></p>
                                </div>
                                <div className='each-fade'>
                                    <p>Always bear in mind that your own resolution to succeed is more important than any other one thing.<br/>—<strong>Abr/aham Lincoln</strong></p>
                                </div>
                                <div className='each-fade'>
                                    <p>The past has no power over the present moment.<br/>—<strong>Eckhart Tolle</strong></p>
                                </div>
                                <div className='each-fade'>
                                    <p>If you want something you never had, you have to do something you’ve never done.<br/>—<strong>Thomas Jefferson</strong></p>
                                </div>
                                <div className='each-fade'>
                                    <p>Luck is a dividend of sweat. The more you sweat, the luckier you get.<br/>—<strong>Ray Kroc</strong></p>
                                </div>
                                <div className='each-fade'>
                                    <p>It is not the strongest of the species that survive, nor the most intelligent, but the one most responsive to change.<br/>—<strong>Charles Darwin</strong></p>
                                </div>
                                <div className='each-fade'>
                                    <p>It takes as much energy to wish as it does to plan.<br/>—<strong>Eleanor Roosevelt</strong></p>
                                </div>
                                <div className='each-fade'>
                                    <p>The greatest crime in the world is not developing your potential. When you do what you do best, you are helping not only yourself but the world.<br/>—<strong>Roger Williams</strong></p>
                                </div>
                                <div className='each-fade'>
                                    <p>Once you replace negative thoughts with positive ones, you’ll start having positive results.<br/>—<strong>Willie Nelson</strong></p>
                                </div>
                                <div className='each-fade'>
                                    <p>Education is the key to unlock the golden door of freedom.<br/>—<strong>George Washington Carve</strong></p>
                                </div>
                                <div className='each-fade'>
                                    <p>It’s not your job to like me, it’s mine.<br/>—<strong>Byron Katie</strong></p>
                                </div>
                                <div className='each-fade'>
                                    <p>We must never be afraid to go too far, for success lies just beyond.<br/>—<strong>Marcel Proust</strong></p>
                                </div>
                                <div className='each-fade'>
                                    <p>Embr/ace what you don’t know, especially in the beginning, because what you don’t know can become your greatest asset. It ensures that you will absolutely be doing things different from everybody else.<br/>—<strong>Sara Blakely</strong></p>
                                </div>
                                <div className='each-fade'>
                                    <p>We are what we repeatedly do. Excellence, then, is not an act but a habit.<br/>—<strong>Aristotle</strong></p>
                                </div>
                                <div className='each-fade'>
                                    <p>Even if I knew that tomorrow the world would go to pieces, I would still plant my apple tree.<br/>—<strong>Martin Luther King Jr.</strong></p>
                                </div>
                                <div className='each-fade'>
                                    <p>Education is the key to unlock the golden door of freedom.<br/>—<strong>George Washington Carve</strong></p>
                                </div>
                                <div className='each-fade'>
                                    <p>En la vida algunas veces se gana, otras veces se aprende.<br/>—<strong>John Maxwell</strong></p>
                                </div>
                                <div className='each-fade'>
                                    <p>Happiness comes from WHAT we do. Fulfillment comes from WHY we do it.<br/>—<strong>Simon Sinek</strong></p>
                                </div>
                                <div className='each-fade'>
                                    <p>Build your own dreams, or someone else will hire you to build theirs.<br/>—<strong>Farrah Gray</strong></p>
                                </div>
                                <div className='each-fade'>
                                    <p>The limits of the possible can only be defined by going beyond them into the impossible.<br/>—<strong>Arthur C. Clarke</strong></p>
                                </div>
                                <div className='each-fade'>
                                    <p>All we have is what we do right now. That’s all we’ll ever have.   Life is a series of moments. And if you show up authentically in more and more moments, you start to patch together a beautiful life.<br/>—<strong>Unknown</strong></p>
                                </div>
                                <div className='each-fade'>
                                    <p>A good traveler has no fixed plans, and is not intent on arriving.<br/>—<strong>Lao Tzu</strong></p>
                                </div>
                                <div className='each-fade'>
                                    <p>I don’t know what your destiny will be, but one thing I know: The only ones among you who will be truly happy are those who have sought and found how to serve.<br/>—<strong>Albert Schweitzer</strong></p>
                                </div>
                                <div className='each-fade'>
                                    <p>Build something 100 people love, not something one million people kind of like.<br/>—<strong>Br/ian Chesky</strong></p>
                                </div>
                                <div className='each-fade'>
                                    <p>Tough times never last, but tough people do.<br/>—<strong>Dr. Robert Schuller</strong></p>
                                </div>
                                <div className='each-fade'>
                                    <p>Take chances, make mistakes. That’s how you grow. Pain nourishes your courage. You have to fail in order to practice being br/ave.<br/>—<strong>Mary Tyler Moore</strong></p>
                                </div>
                                <div className='each-fade'>
                                    <p>Do not indulge in dreams of having what you have not, but reckon up the chief of the blessings you do possess, and then thankfully remember how you would crave for them if they were not yours.<br/>—<strong>Marcus Aurelius</strong></p>
                                </div>
                                <div className='each-fade'>
                                    <p>Everything you’ve ever wanted is on the other side of fear.<br/>—<strong>George Addair</strong></p>
                                </div>
                                <div className='each-fade'>
                                    <p>Success is walking from failure to failure with no loss of enthusiasm.<br/>—<strong>Winston Churchil</strong></p>
                                </div>
                                <div className='each-fade'>
                                    <p>Always make a total effort, even when the odds are against you.<br/>—<strong>Arnold Palmer</strong></p>
                                </div>
                                <div className='each-fade'>
                                    <p>Always forgive your enemies. Nothing annoys them more.<br/>—<strong>Oscar Wilde</strong></p>
                                </div>
                                <div className='each-fade'>
                                    <p>Start making your own happiness a priority.<br/>—<strong>LOA</strong></p>
                                </div>
                                <div className='each-fade'>
                                    <p>I have not failed. I’ve just found 10,000 ways that won’t work.<br/>—<strong>Thomas Edison</strong></p>
                                </div>
                                <div className='each-fade'>
                                    <p>Try to be a rainbow in someone’s cloud.<br/>—<strong>Maya Angelou</strong></p>
                                </div>
                                <div className='each-fade'>
                                    <p>Conditions are never perfect. ‘Someday’ is a disease that will take your dreams to the grave with you…. If it’s important to you and you want to do it ‘eventually,’ just do it and correct course along the way.<br/>—<strong>Tim Ferriss</strong></p>
                                </div>
                                <div className='each-fade'>
                                    <p>Be happy now. Feel good now. That’s the only thing you have to do.<br/>—<strong>Unknown</strong></p>
                                </div>
                            </Fade>
                        </div>
                    </Grid>
                    <Grid item xs={3}>
                        <div class="tradingview-widget-container">
                            <div id="tradingview_84d39"></div>
                        </div>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

Calendar.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Calendar);