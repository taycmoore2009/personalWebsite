import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { HomeOutlined, Code, Pets, Fingerprint, Nature, Ballot, Instagram } from '@material-ui/icons';
import { Link } from 'react-router-dom';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: '0px',
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  header: {
    textTransform: 'capitalize'
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  link: {
    display: 'flex',
    color: '#000'
  },
  codeItem: {
    justifyContent: 'space-between'
  }
}));

export default function MiniDrawer(props) {
    const { currentLocation, updateLocation } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [openCode, setOpenCode] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
        setOpenCode(false);
    };

    const handleClick = step => () => {
        handleDrawerClose();
        setOpenCode(false);
        updateLocation(step);
    }

    const handleDropDown = () => {
        setOpenCode(!openCode);
    }

    return (
        <div className={classes.root}>
        <CssBaseline />
        <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
            })}
        >
            <Toolbar>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                className={clsx(classes.menuButton, {
                [classes.hide]: open,
                })}
            >
                <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap className={classes.header}>
                {currentLocation.split(':')[0]}
            </Typography>
            </Toolbar>
        </AppBar>
        <Drawer
            variant="permanent"
            className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
            })}
            classes={{
                paper: clsx({
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                }),
            }}
        >
            <div className={classes.toolbar}>
            <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
            </div>
            <Divider />
            <List>
              <ListItem button key='Home'onClick={handleClick('Home')}>
                <Link to='/' className={classes.link}>
                      <ListItemIcon><HomeOutlined/></ListItemIcon>
                      <ListItemText primary='Home' />
                </Link>
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem button key='Code' className={classes.codeItem}>
                <Link to="/code" className={classes.link}>
                    <ListItemIcon onClick={handleClick('Code')}><Code/></ListItemIcon>
                    <ListItemText onClick={handleClick('Code')} primary='Code' />
                </Link>
                {openCode ? <ExpandLess onClick={handleDropDown}/> : <ExpandMore onClick={handleDropDown} />}
              </ListItem>
              <Divider variant="inset" component="li" />
              <Collapse in={openCode} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItem button key='tree' onClick={handleClick('Code:Build A Tree')}>
                      <Link to="/code/tree" className={classes.link}>
                          <ListItemIcon><Nature/></ListItemIcon>
                          <ListItemText primary='Build A Tree' />
                      </Link>
                    </ListItem>
                    <Divider variant="inset" component="li" />
                    <ListItem button key='news' onClick={handleClick('Code:news')}>
                      <Link to="/code/news" className={classes.link}>
                          <ListItemIcon><Ballot/></ListItemIcon>
                          <ListItemText primary='News Feed' />
                      </Link>
                    </ListItem>
                    <Divider variant="inset" component="li" />
                    <ListItem button key='socialMediaWall'>
                      <Link to="/code/socialwall" onClick={handleClick('Code:Social Wall')} className={classes.link}>
                          <ListItemIcon><Instagram/></ListItemIcon>
                          <ListItemText primary='Social Wall' />
                      </Link>
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </List>
              </Collapse>
              <ListItem button key='Pets' onClick={handleClick('Pets')}>
                <Link to="/pets" className={classes.link}>
                      <ListItemIcon><Pets/></ListItemIcon>
                      <ListItemText primary='Pets' />
                </Link>
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem button key='Fingerprint' onClick={handleClick('Finger')}>
                <Link to="/finger" className={classes.link}>
                    <ListItemIcon><Fingerprint/></ListItemIcon>
                    <ListItemText primary='Biography' />
                </Link>
              </ListItem>
              <Divider variant="inset" component="li" />
            </List>
        </Drawer>
        </div>
    );
}
