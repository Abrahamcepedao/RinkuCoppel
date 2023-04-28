import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut,
} from 'firebase/auth'

import { auth } from '../firebase'


const login = async (mail:string, password:string) => {
    return signInWithEmailAndPassword(auth, mail, password)
        .then(async (result:any) => {
            console.log(result)
            return result.user.uid
        }).catch((error) => {
            return false
        })
}


const signup = async (mail:string, password:string) => {
    return await createUserWithEmailAndPassword(auth, mail, password).then(async(result) => {
        console.log(result)
        return result.user.uid
    }).catch((error => {
        var errorMessage = error.message
        console.log(errorMessage)
        return false
    }))
}

const logout = async() => {
    await signOut(auth)
}

export { login, signup, logout }