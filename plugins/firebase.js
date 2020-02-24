import firebase from 'firebase/app'
import 'firebase/firestore'

if (!firebase.apps.length) {
  firebase
    .initializeApp({ projectId: 'fast-daily' })
    .firestore({ timestampsInSnapshots: true })
}

export const db = firebase.firestore()

// Export types that exists in Firestore
// This is not always necessary, but it's used in other examples
const { TimeStamp, GeoPoint } = firebase.firestore
export { TimeStamp, GeoPoint }
