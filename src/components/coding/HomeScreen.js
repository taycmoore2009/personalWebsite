import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {Tab, Tabs, Grid} from '@material-ui/core';
import {PhotoCamera, Cloud, TrendingUp, Event, Comment, FormatQuote} from '@material-ui/icons';

import PhotoReel from './calendar/PhotoReel';
import Stocks from './calendar/Stocks';
import Weather from './calendar/Weather';
import Calendar from './calendar/Calendar';
import Quotes from './calendar/Quote';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <div style={{height: "100%"}}>{children}</div>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
    root: {
        background: '#2d2e30',
        color: '#FFF',
        fontFamily: 'sans-serif'
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
    },
    tabsWrapper: {
        padding: '30px',
    },
    tab: {
        height: '100vh',
    },
}));

export default function VerticalTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Grid container className={classes.root}>
        <Grid item xs={2}>
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                className={classes.tabs}
            >
                <Tab className={classes.tabsWrapper} icon={<PhotoCamera style={{ fontSize: 40 }}/>} {...a11yProps(0)} />
                <Tab className={classes.tabsWrapper} icon={<Event style={{ fontSize: 40 }}/>} {...a11yProps(1)} />
                <Tab className={classes.tabsWrapper} icon={<TrendingUp style={{ fontSize: 40 }}/>} {...a11yProps(2)} />
                <Tab className={classes.tabsWrapper} icon={<FormatQuote style={{ fontSize: 40 }}/>} {...a11yProps(3)} />
                <Tab className={classes.tabsWrapper} icon={<Cloud style={{ fontSize: 40 }}/>} {...a11yProps(4)} />
            </Tabs>
        </Grid>
        <Grid item xs={10}>
            <TabPanel className={classes.tab} value={value} index={0}>
                <PhotoReel/>
            </TabPanel>
            <TabPanel className={classes.tab} value={value} index={1}>
                <Calendar/>
            </TabPanel>
            <TabPanel className={classes.tab} value={value} index={2}>
                <Stocks/>
            </TabPanel>
            <TabPanel className={classes.tab} value={value} index={3}>
                <Quotes/>
            </TabPanel>
            <TabPanel className={classes.tab} value={value} index={4}>
                <Weather/>
            </TabPanel>
        </Grid>
    </Grid>
  );
}
