import React from "react";

import Navigation from './../components/Navigation';
import './LayoutLanding.css';

const LayoutLanding = ({children}) => (
	<div>
		<div className="background"></div>
    	<Navigation />
    	{children}
    </div>
)

export { LayoutLanding };