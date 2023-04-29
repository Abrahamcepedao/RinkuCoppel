//React
import React, { useEffect, useState } from 'react'

//Next
import { useRouter } from 'next/router'

//firebase
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../../firebase/firebase'

const ProtectedRoute = ({children}: {children: React.ReactNode}) => {
    const router = useRouter()
    const [user, setUser] = useState("")

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (item) => {
            if(!item) {
                router.push('/')
            } else {
                setUser(item.uid)
            }
        })
        return () => unsubscribe()
    },[])
    return <>{user ? children : null}</>
}

export default ProtectedRoute