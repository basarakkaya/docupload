import React from 'react'
import { BrowserRouter, Switch, Route, Redirect, } from 'react-router-dom'

import PageLayout from './components/PageLayout'

import Home from './pages/Home'
import ListFiles from './pages/ListFiles'
import NewUser from './pages/NewUser'

import { ThemeProvider } from '@material-ui/core';
import theme from './theme'
import './App.css';

export default function App() {
    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <PageLayout>
                    <Switch>
                        <Route exact path="/listfiles" component={ListFiles} />
                        <Route exact path="/newuser" component={NewUser} />
                        <Route exact path="/" component={Home} />
                        <Route path="*"><Redirect to="/" /></Route>
                    </Switch>
                </PageLayout>
            </BrowserRouter>
        </ThemeProvider>
    )
}