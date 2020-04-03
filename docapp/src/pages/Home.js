import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Typography, Button, Divider, Grid } from '@material-ui/core'

function NavButton(props) {
    const { primary, to } = props;

    const renderLink = React.useMemo(
        () => React.forwardRef((itemProps, ref) => <RouterLink to={to} ref={ref} {...itemProps} />),
        [to],
    );

    return (
            <Button fullWidth
                component={renderLink}
                variant="contained"
                color="secondary"
                type="button"
            >
                { primary }
            </Button>
    );
}

export default function Home() {
    return (
        <>
            <Grid item xs={12}>
                <Typography align="center" variant="h4">SEÇ</Typography>
            </Grid>
            <Grid item xs={12}>
                <Divider />
            </Grid>
            <Grid item xs={12} md={6}>
                <NavButton to="/newuser" primary="Yeni Kullanıcı" />
            </Grid>
            <Grid item xs={12} md={6}>
                <NavButton to="/listfiles" primary="Dosyaları Listele" />
            </Grid>
        </>
    )
}