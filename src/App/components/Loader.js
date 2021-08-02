// Custom Loader Component

import React from "react";
import Icon from "./Icon";

const Loader = () => {
	return (
		<div className={"loader"}>
			<Icon className={"fas fa-spinner fa-3x fa-pulse"} />
			<div className={"loader-text"}>Loading</div>
		</div>
	);
};

export default Loader;
