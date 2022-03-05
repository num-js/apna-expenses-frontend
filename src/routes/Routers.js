import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AccountPage from '../Components/Account/AccountPage';
import SignIn from '../Components/AuthComponents/SignIn/SignIn';
import SignUp from '../Components/AuthComponents/SignUp/SignUp';
import ErrorNotFound from '../Components/ErrorNotFound/ErrorNotFound';
import ExpensesPage from '../Components/Expenses/ExpensesPage';
import { ACCOUNT, INDEX, SIGNIN, SIGNUP } from './routesConstants';

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

                <Route exact path={ACCOUNT} >
                    <AccountPage />
                </Route>

                <Route>
                    <ErrorNotFound />
                </Route>
            </Switch>
        </BrowserRouter >
    );
}

export default Routers;