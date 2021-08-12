// Clone of useSelector hook

import { useEffect, useRef, useState } from "react";
import { store } from "../App/store";

const useSelector = (callback) => {
	const [storeState, setStoreState] = useState({});
	const unsubscribe = useRef(null);

	const handleStoreStateChange = () => setStoreState(store.getState());

	useEffect(() => {
		unsubscribe.current = store.subscribe(handleStoreStateChange);

		return () => unsubscribe.current();
	}, []);

	return callback(storeState);
};

export default useSelector;
