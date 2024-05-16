// src/index.js
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
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
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import Login from './elements/login/Login';
import SignUp from './elements/signup/SignUp';
import { ThemeProvider } from './context/ThemeContext';

class Root extends Component {
  render() {
    return (
      <ThemeProvider>
        <BrowserRouter basename={'/'}>
          <PageScrollTop>
            <Switch>
              <Route exact path={`${process.env.PUBLIC_URL}/`} component={DarkMainDemo} />
              <Route exact path={`${process.env.PUBLIC_URL}/login`} component={Login} />
              <Route exact path={`${process.env.PUBLIC_URL}/signup`} component={SignUp} />
              <Route exact path={`${process.env.PUBLIC_URL}/orders`} component={Orders} />
              <Route exact path={`${process.env.PUBLIC_URL}/profile`} component={UserProfile} />
              <Route exact path={`${process.env.PUBLIC_URL}/about`} component={About} />
              <Route exact path={`${process.env.PUBLIC_URL}/contact`} component={Contact} />
              <Route exact path={`${process.env.PUBLIC_URL}/portfolio-details`} component={PortfolioDetails} />
              <Route exact path={`${process.env.PUBLIC_URL}/services`} component={Service} />
              <Route exact path={`${process.env.PUBLIC_URL}/service-details/:serviceId`} component={ServiceDetails} />
              <Route exact path={`${process.env.PUBLIC_URL}/extensions`} component={Extension} />
              <Route exact path={`${process.env.PUBLIC_URL}/extension-details/:extensionId`} component={ExtensionDetails} />
              <Route exact path={`${process.env.PUBLIC_URL}/blogs`} component={Blog} />
              <Route exact path={`${process.env.PUBLIC_URL}/blog-details/:blogId`} component={BlogDetails} />
              <Route exact path={`${process.env.PUBLIC_URL}/team`} component={Team} />
              <Route exact path={`${process.env.PUBLIC_URL}/admin`} component={Admin} />
              <Route path={`${process.env.PUBLIC_URL}/404`} component={error404} />
              <Route component={error404} />
            </Switch>
          </PageScrollTop>
        </BrowserRouter>
      </ThemeProvider>
    );
  }
}

ReactDOM.render(<Root />, document.getElementById('root'));
serviceWorker.register();