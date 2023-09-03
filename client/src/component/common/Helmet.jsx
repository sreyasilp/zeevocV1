import React, { Component } from "react";
import {Helmet} from 'react-helmet'

class PageHelmet extends Component{
    render(){
        return(
            <React.Fragment>
                <Helmet>
                    <title>{this.props.pageTitle} || zeevoc </title>
                    <meta name="description" content="Zeevoc.com." />
                </Helmet>
            </React.Fragment>
        )
    }
}


export default PageHelmet;
