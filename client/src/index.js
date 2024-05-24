import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.scss';
import PageScrollTop from './component/PageScrollTop';
import DarkMainDemo from './home/Home';
import Service from "./elements/service/Service";
import ServiceDetails from "./elements/service/ServiceDetails";
import About from "./elements/about/About";
import Contact from "./elements/contact/Contact";
import PortfolioDetails from "./elements/portfolio/PortfolioDetails";
import ExtensionDetails from './elements/extension/ExtensionDetails';
import Blog from "./elements/blog/Blog";
import BlogDetails from "./elements/blog/BlogDetails";
import error404 from "./elements/error404";
import Team from "./blocks/Team";
import Admin from "./blocks/Admin";
import Products from "./blocks/Products";
import Orders from './elements/order/Orders';
import UserProfile from './elements/profile/Profile';
import Extension from "./blocks/Extensions";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import Login from './elements/login/Login';
import SignUp from './elements/signup/SignUp';
import { ThemeProvider } from './context/ThemeContext';
import { ToastContainer } from 'react-toastify';
import ForgotPassword from './elements/forgot-password/ForgotPassword';

const Root = () => {
  return (
    <ThemeProvider>
      <BrowserRouter basename={'/'}>
        <PageScrollTop>
          <Routes>
            <Route exact path={`${process.env.PUBLIC_URL}/`} element={<DarkMainDemo />} />
            <Route exact path={`${process.env.PUBLIC_URL}/login`} element={<Login />} />
            <Route exact path={`${process.env.PUBLIC_URL}/signup`} element={<SignUp />} />
            <Route exact path={`${process.env.PUBLIC_URL}/forgot-password`} element={<ForgotPassword />} />
            <Route exact path={`${process.env.PUBLIC_URL}/orders`} element={<Orders />} />
            <Route exact path={`${process.env.PUBLIC_URL}/profile`} element={<UserProfile />} />
            <Route exact path={`${process.env.PUBLIC_URL}/about`} element={<About />} />
            <Route exact path={`${process.env.PUBLIC_URL}/contact`} element={<Contact />} />
            <Route exact path={`${process.env.PUBLIC_URL}/portfolio-details`} element={<PortfolioDetails />} />
            <Route exact path={`${process.env.PUBLIC_URL}/services`} element={<Service />} />
            <Route exact path={`${process.env.PUBLIC_URL}/service-details/:serviceId`} element={<ServiceDetails />} />
            <Route exact path={`${process.env.PUBLIC_URL}/extensions`} element={<Extension />} />
            <Route exact path={`${process.env.PUBLIC_URL}/extension-details/:extensionId`} element={<ExtensionDetails />} />
            <Route exact path={`${process.env.PUBLIC_URL}/blogs`} element={<Blog />} />
            <Route exact path={`${process.env.PUBLIC_URL}/blog-details/:blogId`} element={<BlogDetails />} />
            <Route exact path={`${process.env.PUBLIC_URL}/team`} element={<Team />} />
            <Route exact path={`${process.env.PUBLIC_URL}/admin`} element={<Admin />} />
            <Route path={`${process.env.PUBLIC_URL}/404`} element={<error404 />} />
            <Route path="*" element={<error404 />} />
          </Routes>
        </PageScrollTop>
        <ToastContainer />
      </BrowserRouter>
    </ThemeProvider>
  );
};

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<Root />);

serviceWorker.register();