import React, { useEffect } from "react";
import { useLocation } from 'react-router-dom';

const PageScrollTop = (props) => {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    return props.children;
};
export default PageScrollTop;