import React from "react";
import { Helmet } from "react-helmet";

const PageHelmet = ({ pageTitle }) => {
    return (
        <React.Fragment>
            <Helmet>
                <title>{pageTitle}</title>
                <meta name="description" content="zeevoc.com." />
            </Helmet>
        </React.Fragment>
    );
};

export default PageHelmet;
