import firebase from 'firebase/app'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyDSDQTfXlHHMC4u1P6kMkIjbmJVjiO546o',
  authDomain: 'reactzzaria-a1669.firebaseapp.com',
  databaseURL: 'https://reactzzaria-a1669.firebaseio.com',
  projectId: 'reactzzaria-a1669',
  storageBucket: 'reactzzaria-a1669.appspot.com',
  messagingSenderId: '293008164336',
  appId: '1:293008164336:web:533e4bbe47841063fec935',
  measurementId: 'G-1PPWBXC6H9'
}
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

export default firebase
