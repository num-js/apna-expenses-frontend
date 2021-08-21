import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SignIn from '../Components/AuthComponents/SignIn/SignIn';
// import SignUp from '../Components/AuthComponents/SignUp/SignUp';
import ErrorNotFound from '../Components/ErrorNotFound/ErrorNotFound';

const RouterComponent = () => {
    return (
        <BrowserRouter >
            <Switch>
                <Route path='/' exact>
                    <h1>Hey Numan</h1>
                </Route>
                {/* <Route path='/signup'>
                    <SignUp />
                </Route> */}
                <Route path='/signin'>
                    <SignIn />
                </Route>
                <Route>
                    <ErrorNotFound />
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default RouterComponent;