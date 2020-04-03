import React, { useState } from 'react';
import { Link as RouterLink, useRouteMatch } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import {
    AppBar,
    Container,
    Drawer,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Paper,
    Toolbar,
    Typography 
} from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';
import MenuIcon from '@material-ui/icons/Menu';

const drawerWidth = 290;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1200,
    },
    container: {
        height: 'calc(100% - 48px)',
        overflow: 'auto'
    },
    content: {
        borderRadius: 0,
        flexGrow: 1,
        padding: theme.spacing(3),
        height: 'calc(100vh - 48px)',
    },
    contentPaper: {
        width: '100%',
        padding: theme.spacing(3),
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    gridContainer: {
        height: '100%'
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    toolbar: theme.mixins.toolbar,
    versionText: {
        color: '#ffffff55',
        fontSize: '0.8rem'
    }
}));

function NavButton(props) {
    const { icon, onClick, primary, to } = props;
    const selected = useRouteMatch(to)
    
    const renderLink = React.useMemo(
        () => React.forwardRef((itemProps, ref) => <RouterLink to={to} ref={ref} {...itemProps} />),
        [to],
    );

    return (
        <li>
            <ListItem button component={renderLink} onClick={onClick} selected={selected}>
                {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
                <ListItemText primary={primary} />
            </ListItem>
        </li>
    );
}

export default function PageLayout(props) {
    const classes = useStyles();
    const [sidebar, toggleSidebar] = useState(false)

    return (
        <>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={() => toggleSidebar(!sidebar)}>
                        {sidebar ? <CloseIcon /> : <MenuIcon />}
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        <b>Doc</b>Upload
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer open={sidebar} onClose={() => toggleSidebar(false)} className={classes.drawer} classes={{ paper: classes.drawerPaper }}>
                <div className={classes.toolbar} />
                <List>
                    <NavButton to="/newuser" primary="Yeni Kullanıcı" onClick={() => {toggleSidebar(false)}} />
                    <NavButton to="/listfiles" primary="Dosyalar" onClick={() => {toggleSidebar(false)}} />
                </List>
            </Drawer>
            <Paper elevation={0} className={classes.content}>
                <div className={classes.toolbar} />
                <Container className={classes.container} maxWidth="md">
                    <Grid container alignItems="center" className={classes.gridContainer}>
                        <Paper className={classes.contentPaper}>
                            <Grid container spacing={2}>
                                {props.children}    
                            </Grid>
                        </Paper>
                    </Grid>
                </Container>
            </Paper>
        </>
    )
}