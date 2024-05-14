// React Required
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// Create Import File
import './index.scss';

import PageScrollTop from './component/PageScrollTop';

// Dark Home Layout 
import DarkMainDemo from './home/Home';

// Element Layout
import Service from "./elements/Service";
import ServiceDetails from "./elements/ServiceDetails";
import About from "./elements/About";
import Contact from "./elements/Contact";
import PortfolioDetails from "./elements/PortfolioDetails";
import ExtensionDetails from './elements/ExtensionDetails';
import Blog from "./elements/Blog";
import BlogDetails from "./elements/BlogDetails";
import error404 from "./elements/error404";


// Blocks Layout

import Team from "./blocks/Team";
import Admin from "./blocks/Admin";
import Products from "./blocks/Products";
import Extension from "./blocks/Extensions";
import { BrowserRouter, Switch, Route  } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import Login from './elements/Login';
import SignUp from './elements/SignUp';

class Root extends Component{
    render(){
        return(
            <BrowserRouter basename={'/'}>
                <PageScrollTop>
                    <Switch>
                        <Route exact path={`${process.env.PUBLIC_URL}/`} component={DarkMainDemo}/>
                        {/* Element Layout */}
                        <Route exact path={`${process.env.PUBLIC_URL}/login`} component={Login}/>
                        <Route exact path={`${process.env.PUBLIC_URL}/signup`} component={SignUp}/>

                        <Route exact path={`${process.env.PUBLIC_URL}/about`} component={About}/>
                        <Route exact path={`${process.env.PUBLIC_URL}/contact`} component={Contact}/>

                        <Route exact path={`${process.env.PUBLIC_URL}/portfolio-details`} component={PortfolioDetails}/>
                        <Route exact path={`${process.env.PUBLIC_URL}/services`} component={Service}/>
                        <Route exact path={`${process.env.PUBLIC_URL}/service-details/:serviceId`} component={ServiceDetails}/>
                        <Route exact path={`${process.env.PUBLIC_URL}/extensions`} component={Extension}/>                    
                        <Route exact path={`${process.env.PUBLIC_URL}/extension-details/:extensionId`} component={ExtensionDetails}/>
                        <Route exact path={`${process.env.PUBLIC_URL}/blog`} component={Blog}/>
                        <Route exact path={`${process.env.PUBLIC_URL}/blog-details/:blogId`} component={BlogDetails}/>

                        {/* Blocks Elements  */}
                        <Route exact path={`${process.env.PUBLIC_URL}/team`} component={Team}/>
                        <Route exact path={`${process.env.PUBLIC_URL}/admin`} component={Admin}/>
                        <Route path={`${process.env.PUBLIC_URL}/404`} component={error404}/>
                        <Route component={error404}/>

                    </Switch>
                </PageScrollTop>
            </BrowserRouter>
        )
    }
}

ReactDOM.render(<Root/>, document.getElementById('root'));
serviceWorker.register();