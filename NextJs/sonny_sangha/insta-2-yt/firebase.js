import App from './firebase9_2_mysql/api/App'
// import { modalState } from '@/atoms/modalAtom'
// import { useRecoilState } from 'recoil'
// Import the functions you need from the SDKs you need
// import { initializeApp, getApps, getApp } 'firebase/app'
// import { getFirestore } 'firebase/firestore'
// import { getStorage } 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apikey: '',
//   authDomain: 'insta-2-yt.firebase.com',
//   projectId: 'insta-2-yt',
//   storageBucket: 'insta-2-yt.appspot.com',
//   messagingSenderId: '',
//   appId: ''
// }

// const app = !getApps.length
//   ? initializeApp(firebaseConfig)
//   : getApp()

// const db = getFirestore();
// const storage = getStorage()

// export { app, db, storage }

// const appState = () => {
//   const [open, setOpen] = useRecoilState(modalState)
//   return open
// }

let db = App().db()
const validateLogin = db.validateLogin
// db = {...db, appState}

export { db, validateLogin }