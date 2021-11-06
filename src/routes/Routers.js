import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SignIn from '../Components/AuthComponents/SignIn/SignIn';
import SignUp from '../Components/AuthComponents/SignUp/SignUp';
import ErrorNotFound from '../Components/ErrorNotFound/ErrorNotFound';
import ExpensesPage from '../Components/Therapist/ExpensesPage';
import { INDEX, SIGNIN, SIGNUP } from './routesConstants';

const Routers = () => {
    return (
        <BrowserRouter >
            <Switch>
                <Route path={SIGNUP}>
                    <SignUp />
                </Route>

                <Route path={SIGNIN}>
                    <SignIn />
                </Route>

                <Route exact path={INDEX} >
                    <ExpensesPage />
                </Route>

                <Route>
                    <ErrorNotFound />
                </Route>
            </Switch>
        </BrowserRouter >
    );
}

export default Routers;