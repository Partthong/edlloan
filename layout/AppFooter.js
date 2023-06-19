import getConfig from 'next/config';
import React, { useContext } from 'react';
import { LayoutContext } from './context/layoutcontext';

const AppFooter = () => {
    const { layoutConfig } = useContext(LayoutContext);
    const contextPath = getConfig().publicRuntimeConfig.contextPath;

    return (
        <div className="layout-footer">

            <img src={`${contextPath}/layout/images/ets.png`} width="25px" height={'22px'}  widt={'true'} alt="logo"/>
            by
            <span className="font-medium ml-2">EDL Technology Solution</span>
        </div>
    );
};

export default AppFooter;
