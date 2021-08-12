// Clone of useDispatch hook

import { store } from "../App/store";

const useDispatch = (action) => {
	return store.dispatch(action);
};

export default useDispatch;
