import {Navigate, createBrowserRouter} from 'react-router-dom';
import Login from './assets/views/Login';
import Signup from './assets/views/Signup';
import Users from './assets/views/Users';
import NotFound from './assets/views/NotFound';
import DefaultLayout from './assets/components/DefaultLayout';
import GuestLayout from './assets/components/GuestLayout';
import Dashboard from './assets/views/Dashboard';

const router = createBrowserRouter([
    {
        path: '/',
        element : <DefaultLayout/>,
        children:[
            {
                path: '/',
                element : <Navigate to = "/users" />
            },
            {
                path: '/dashboard',
                element : <Dashboard/>
            },
            {
                path: '/users',
                element : <Users/>
            },
        ]
    },
    {
        path: '/',
        element : <GuestLayout/>,
        children : [
            {
                path: '/login',
                element : <Login/>
            },
            {
                path: '/signup',
                element : <Signup/>
            }
        ]
    },
    {
        path: '*',
        element : <NotFound/>
    }
])

export default router;
