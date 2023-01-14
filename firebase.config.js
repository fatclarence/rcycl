import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyD9NNOnZl09CEus7kseE92lnt3F-uOAJNg",
    authDomain: "rcycl-374705.firebaseapp.com",
    projectId: "rcycl-374705",
    storageBucket: "rcycl-374705.appspot.com",
    messagingSenderId: "620959697984",
    appId: "1:620959697984:web:c493763bf44799cfd963a5",
    measurementId: "G-HLLKG868CF"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export {firebase};