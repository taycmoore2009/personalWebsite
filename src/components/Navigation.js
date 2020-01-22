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
import { HomeOutlined, Code, Pets, Fingerprint, Nature, Ballot } from '@material-ui/icons';

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
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
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
            <Typography variant="h6" noWrap>
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
              <ListItem button key='Home' onClick={handleClick('Home')}>
                  <ListItemIcon><HomeOutlined/></ListItemIcon>
                  <ListItemText primary='Home' />
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem button key='Code'>
                  <ListItemIcon onClick={handleClick('Code')} ><Code/></ListItemIcon>
                  <ListItemText onClick={handleClick('Code')} primary='Code' />
                  {openCode ? <ExpandLess onClick={handleDropDown}/> : <ExpandMore onClick={handleDropDown} />}
              </ListItem>
              <Divider variant="inset" component="li" />
              <Collapse in={openCode} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItem button key='tree' onClick={handleClick('Code:tree')}>
                        <ListItemIcon><Nature/></ListItemIcon>
                        <ListItemText primary='Build A Tree' />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                    <ListItem button key='news' onClick={handleClick('Code:news')}>
                        <ListItemIcon><Ballot/></ListItemIcon>
                        <ListItemText primary='News Feed' />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </List>
              </Collapse>
              <ListItem button key='Pets' onClick={handleClick('Pets')}>
                  <ListItemIcon><Pets/></ListItemIcon>
                  <ListItemText primary='Pets' />
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem button key='Fingerprint' onClick={handleClick('Finger')}>
                  <ListItemIcon><Fingerprint/></ListItemIcon>
                  <ListItemText primary='Biography' />
              </ListItem>
              <Divider variant="inset" component="li" />
            </List>
        </Drawer>
        </div>
    );
}
