/* eslint-disable react/prop-types */
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "./firebase.init";
import useAxiosPublic from "../Hooks/useAxiosPublic";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null)

const AuthProvider = ({children}) => {
    const provider = new GoogleAuthProvider();

const [user ,setUser]=useState(null)
const [loading ,setLoading]=useState(true)
const axiosPublic =useAxiosPublic()

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
    setUser(currentUser)
    if(currentUser?.email){
const userEmail={email : currentUser?.email}
axiosPublic.post("/jwt",userEmail)
.then(res=>{
    if(res?.data?.token){
        localStorage.setItem("access-token",res?.data?.token)
    }
}) 
}  
   
else{
        localStorage.removeItem("access-token")
        setUser(null)
    }
    setLoading(false)
})
return()=>{
    unsubscribe()
}
},[axiosPublic])


const authInfo={  
    SignUp,
    user,
    loading,
    handleGoogleSignIn,
    handleSignIn,
    handleSignOut,
    updateUserProfile,
    setUser
}


    return (
        <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    );
};

export default AuthProvider;