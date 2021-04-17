import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import firebaseConfig from './firebaseConfig'

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

export default firebase
