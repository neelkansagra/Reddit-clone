import {createContext, useContext, useState} from 'react';

export const Page = {
    LOGIN: 'login',
    FORGOTPASSWORD: 'forgotpassword',
    SIGNUP: 'signup',
    CONTINUE: 'continue',
    CHECKEMAIL: 'checkemail'
};

export const StatusContext = createContext();
export const emailContext = createContext();