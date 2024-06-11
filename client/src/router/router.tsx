import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/Layout";
import ErrorPage from "../pages/ErrorPage";
import Profile from "../pages/Profile";
import Auth from "../pages/Auth";
import Home from "../pages/Home";
import Posts from "../pages/Posts";
import Files from "../pages/Files";

export const router = createBrowserRouter([
    {
       path: '/',
       element: <Layout />,
       errorElement: <ErrorPage />,
       children: [
        {
            index: true,
            element: <Home />
        },
        {
            path: 'auth',
            element: <Auth />
        },
        {
            path: 'profile',
            element: <Profile />
        },
        {
            path: 'files',
            element: <Files />
        },
        {
            path: 'posts',
            element: <Posts />
        }
       ]
    }
])