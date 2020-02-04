import React from 'react';

import './App.css';
import 'typeface-roboto';

import { withStyles } from '@material-ui/styles';
import { PropTypes } from 'prop-types';
import { Container, CssBaseline } from '@material-ui/core';

import Home from './components/baseScreens/Home';
import Navigation from './components/Navigation'
import Code from './components/baseScreens/Code';
import Pets from './components/baseScreens/Pets';
import Finger from './components/baseScreens/Finger';

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
    switch (this.state.currentLocation) {
      case 'Home':
        return <Home subStep={this.state.subStep}/>;
      case 'Code':
        return <Code subStep={this.state.subStep}/>;
      case 'Pets':
        return <Pets subStep={this.state.subStep}/>;
      case 'Finger':
        return <Finger subStep={this.state.subStep}/>
      default:
        return <Home subStep={this.state.subStep}/>;
    }
  }

  render = () => {
    const { classes } = this.props;
    const CurrentPage = this.getCurrentLocation;
    return (
      <React.Fragment>
        <CssBaseline />
        <Navigation
          currentLocation={this.state.currentLocation}
          updateLocation={this.updateLocation}
        />
        <Container className={classes.mainContainer} maxWidth='xl' ref={this.mainContainerRef}>
          <CurrentPage></CurrentPage>
        </Container>
      </React.Fragment>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(App);
