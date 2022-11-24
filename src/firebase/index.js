// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyCNbrvuvW1KajfW2v1lrlO_CTvQ8H0SnL4',
  authDomain: 'vue-todo-5e97c.firebaseapp.com',
  projectId: 'vue-todo-5e97c',
  storageBucket: 'vue-todo-5e97c.appspot.com',
  messagingSenderId: '344916837936',
  appId: '1:344916837936:web:adfc953f03b627699b0ff5'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
export {
  db
}
