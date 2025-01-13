/* eslint-disable react/prop-types */
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "./firebase.init";


// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null)

const AuthProvider = ({children}) => {
    const provider = new GoogleAuthProvider();

const [user ,setUser]=useState(null)
const [loading ,setLoading]=useState(false)


// google signIn
const handleGoogleSignIn = () =>{
    setLoading(true)
 return signInWithPopup(auth ,provider)
}

const SignUp =(email,password)=>{
    setLoading(true)
   return createUserWithEmailAndPassword(auth ,email ,password)
}


const handleSignIn = (email,password) =>{
    setLoading(true)
  return  signInWithEmailAndPassword(auth,email,password)
}


const handleSignOut = () =>{
 return signOut(auth)

}


const updateUserProfile = (name , photo) =>{
 return   updateProfile(auth.currentUser,{
        displayName:name,photoURL:photo
    })

}



useEffect(()=>{
const unsubscribe = onAuthStateChanged(auth ,currentUser=>{
    console.log("currently ==>",currentUser);
    if(currentUser?.email){
setUser(currentUser)
setLoading(false)
    }
    else{
        setUser(null)
    }
    setLoading(false)
})
return()=>{
    unsubscribe()
}
},[])


const authInfo={  
    SignUp,
    user,
    loading,
    handleGoogleSignIn,
    handleSignIn,
    handleSignOut,
    updateUserProfile
}


    return (
        <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    );
};

export default AuthProvider;