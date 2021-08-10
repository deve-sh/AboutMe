import { useEffect, useRef, useState } from "react";
import db from "../firebase/database";

const useFirestoreRealTime = (doc) => {
	let [docData, setDocData] = useState({ fetching: true, data: null });
	let subscriptionRef = useRef(null);

	useEffect(() => {
		let ref = db.doc(doc);
		ref.onSnapshot((doc) => {
			const newDocData = { fetching: false, data: doc.data() };
			setDocData(newDocData);
		});

		return () => {
			if (subscriptionRef.current instanceof Function)
				subscriptionRef.current(); // Unsubscribe from the document.
		};
	}, []);

	return docData;
};

export default useFirestoreRealTime;
