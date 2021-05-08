import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


import { withStyles } from '@material-ui/styles';
import { PropTypes } from 'prop-types';
import { Container, CssBaseline } from '@material-ui/core';

import Home from './components/baseScreens/Home';
import Navigation from './components/Navigation'
import Code from './components/baseScreens/Code';
import Pets from './components/baseScreens/Pets';
import Finger from './components/baseScreens/Finger';

import DisplayWall from './components/coding/socialMediaWall/DisplayScreen';
import CollarAndCombAdmin from './components/coding/socialMediaAdmin/CollarAndCombAdmin.js';
import CollarAndComb from './components/coding/socialMediaWall/CollarAndComb';
import HomeScreen from './components/coding/HomeScreen';

const styles = theme => ({
  '@media (min-width: 600px)': {
    mainContainer: {
      paddingLeft: '106px'
    }
  },
  mainContainer: {
    backgroundImage: 'url(/imgs/glasses.png)',
    backgroundColor: '#282c34',
    backgroundPosition: 'center',
    color: '#FFF',
    width: '100%',
    height: '100%',
    position: 'fixed',
    overflow: 'auto',
    paddingTop: '64px'
  }
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLocation: 'Home',
      subStep: ''
    }

    // References
    this.mainContainerRef = React.createRef();
    this.HomeRef = React.createRef();
    this.CodeRef = React.createRef();
    this.PetsRef = React.createRef();
    this.FingerRef = React.createRef();
  }

  componentDidMount = () => {
    const loc = window.location.pathname.split('/');
    if(loc.length > 1 && loc[1] !== '') {
      this.updateLocation(loc[1]);
    }
  }

  updateLocation = (step) => {
    const steps = step.split(':');
    const currentStep = steps[0];
    if(currentStep !== this.state.currentLocation && steps.length === 1) {
      this.setState({
        currentLocation: step,
        subStep: ''
      });
    } else {
      this.setState({
        currentLocation: currentStep,
        subStep: steps[1]
      });
    }
  }

  getCurrentLocation = () => {
    return (
        <Switch>
          <Route path='/code'>
            <Code subStep={this.state.subStep}/>
          </Route>
          <Route path='/pets'>
            <Pets subStep={this.state.subStep}/>
          </Route>
          <Route path='/finger'>
            <Finger subStep={this.state.subStep}/>
          </Route>
          <Route path='/'>
            <Home subStep={this.state.subStep}/>
          </Route>
        </Switch>
    );
  }

  render = () => {
    const { classes } = this.props;
    const CurrentPage = this.getCurrentLocation;
    return (
      <Router>
        <Switch>
          <Route path='/mediaWall'>
            <DisplayWall/>
          </Route>
          <Route path='/collarandcomb/admin'>
            <CollarAndCombAdmin/>
          </Route>
          <Route path='/collarandcomb'>
            <CollarAndComb/>
          </Route>
          <Route path='/homescreen'>
            <HomeScreen/>
          </Route>
          <Route>
            <CssBaseline />
            <Navigation
              currentLocation={this.state.currentLocation}
              updateLocation={this.updateLocation}
            />
            <Container className={classes.mainContainer} maxWidth='xl' ref={this.mainContainerRef}>
              <CurrentPage></CurrentPage>
            </Container>
          </Route>
        </Switch>
      </Router>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(App);
