import { AppBar, CardMedia, Grid, makeStyles, Toolbar, Typography } from '@material-ui/core'
import React from 'react'
import del from '../images/delicious.png'
import sweet from '../images/swt.png'
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: '#DBA901',
        minWidth: '1000px',

    },
    font: {
        fontFamily: 'Maven Pro',

    },
    margright: {
        cursor: 'pointer',
        marginRight: theme.spacing(5)
    },
    spacebetween: {
        padding: theme.spacing(1),
        cursor: 'pointer'
    },
    decoration: {
        textDecoration: 'none',
        color: 'white',
    }
}))

export default function () {
    const classes = useStyles()
    return (
        <>
            <AppBar position='sticky' className={classes.root}>
                <Toolbar >
                    <Grid container alignItems='center'>
                        <Grid item className={classes.margright}>
                            <Typography className={classes.font}>
                            <Link to='/' className={classes.decoration}>Home</Link>
                            </Typography>
                        </Grid>

                        <Grid item className={classes.margright}>
                            <Typography className={classes.font}>
                                <Link to='/items' className={classes.decoration}>Items</Link>
                            </Typography>
                        </Grid>
                        <Grid item className={classes.margright}>
                            <Typography className={classes.font}>
                                <Link to='/labour' className={classes.decoration}>Labours</Link>
                            </Typography>
                        </Grid>
                        <Grid item className={classes.margright}>
                            <Typography className={classes.font}>
                                <Link to='/about' className={classes.decoration}>About</Link>
                            </Typography>
                        </Grid>
                        <Grid item sm={3}></Grid>
                        <Grid >
                            <CardMedia
                                component='img'
                                image={del}
                                height='55'
                            />
                        </Grid>
                        <Grid item >
                            <CardMedia
                                component='img'
                                image={sweet}
                                height='50'
                            />
                        </Grid>
                    </Grid>
                    <Grid item className={classes.spacebetween}>
                        <ShoppingBasketIcon color='action' />
                    </Grid>
                    <Grid item className={classes.spacebetween}>
                        <AccountCircleIcon color='action' />
                    </Grid>
                </Toolbar>
            </AppBar>
        </>
    )
}
