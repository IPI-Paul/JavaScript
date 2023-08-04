import App from './firebase_2_mysql/api/App'
// import firebase from 'firebase'
// import 'firebase/storage'

// const firebaseConfig = {
//   apikey: '',
//   authDomain: 'facebook-2-yt.firebase.com',
//   projectId: 'facebook-2-yt',
//   storageBucket: 'facebook-2-yt.appspot.com',
//   messagingSenderId: '',
//   appId: ''
// }

// const app = !firebase.apps.length
//   ? firebase.initializeApp(firebaseConfig)
//   : firebase.app()

// const db = app.firebase();
// const storage = firebase.storage()

// export { db, storage }

const db = App().db()

export { db }