/*
 * Filename: AuthGuard.js
 * Path: c:\zCodes\therapiest project\nick-fury
 * Created Date: Sunday, June 13th 2021, 9:01:25 am
 * Author: Numan Ahmed
 * Description: Get Authenticated User
 * Developed with ❤️
 * Copyright (c) 2021 Numan
 */


import { Auth } from "../firebase";

/**
 * Get Authenticated User
 * @returns Object || Null - if User Authenticated, returns User object, else null
 */
const AuthGuard = async () => {
    try {
        Auth.onAuthStateChanged(user => {
            console.log('user: ', user);
            return user;
        });
    } catch (error) {
        return null;
    }
}

export default AuthGuard;