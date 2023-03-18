import {useAuthState} from 'react-firebase-hooks/auth'
// import { auth, firestore } from '@/lib/firebase'
import { auth, firestore } from './firebase'
import { useEffect, useState } from 'react'
import { doc, onSnapshot, getFirestore } from 'firebase/firestore'
import { UserContextData } from './context'
import { firebaseApp } from './firebase'

// function useUsername() {
//     const [user] = useAuthState(auth)
//     const [username, setUsername] = useState(null)

//     // useEffect(() => {
//     //   let unsubscribe

//     //   if (user) {
//     //     const ref = doc(getFirestore(), 'users', user.uid)
//     //     unsubscribe = onSnapshot(ref, (doc) => {
//     //         setUsername(doc.data()?.username)
//     //     })

//     //   } else {
//     //     setUsername(null)
//     //   }

//     //   return unsubscribe
//     // }, [user]);

//     return {user, username} as UserContextData
// }

// export default useUsername;