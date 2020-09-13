import React, { Component } from "react";
import './ResultsPage.css';

import ResultsRecord from './ResultsRecord';

const ResultsPage = (props) => {
	return (
		<div className="results-page">
			<ResultsRecord />
			<ResultsRecord />
			<ResultsRecord />
			<ResultsRecord />
		</div>
	)

}

export default ResultsPage;