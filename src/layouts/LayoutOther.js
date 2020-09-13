import React from "react";

import Navigation from './../components/Navigation';
import './LayoutOther.css';

const LayoutOther = ({children}) => (
	<div>
		<div className="background-other"></div>
    	<Navigation layout="LayoutOther"/>
    	{children}
    </div>
)

export { LayoutOther };