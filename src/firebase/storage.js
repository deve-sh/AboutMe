// File to house the global storage ref of firebase.

import firebase from "./index";
import "firebase/storage";

const storageRef = firebase.storage();

export default storageRef;