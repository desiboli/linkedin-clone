import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import './Login.css'
import { login } from '../../features/userSlice';
import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from '../../firebase';

function Login() {
  const dispatch = useDispatch()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [profilePic, setProfilePic] = useState("")

  const register = () => {
    if (!name) {
      return alert("Please enter a full name!")
    }

    createUserWithEmailAndPassword(auth, email, password).then(
      (userAuth) => {
        const user = userAuth.user
        updateProfile(user, {
          displayName: name,
          photoUrl: profilePic,
        })
        .then(() => {
          dispatch(login({
            email: userAuth.user.email,
            uid: userAuth.user.uid,
            displayName: name,
            photoUrl: profilePic,
          }))
        })
      })
      .catch(error => alert(error))
  }

  const loginToApp = (e) => {
    console.log('LOGGA IN!!!')

    signInWithEmailAndPassword(auth, email, password)
      .then((userAuth) => {
        // Signed in
        const user = userAuth.user;
        console.log('USER:::', user)
        dispatch(login({
          email: user.email,
          uid: user.uid,
          displayName: user.displayName,
          /*profilePic: user.photoURL,*/
        }))
      })
      .catch((error) => alert(error));
  }

  return (
    <div className="login">
      <img src="https://upload.wikimedia.org/wikipedia/commons/0/01/LinkedIn_Logo.svg" alt="" />

      <form>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Full name (required if registering)" type="text" />

        <input value={profilePic} onChange={e => setProfilePic(e.target.value)} placeholder="Profile pic URL (optional)" type="text" />

        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" type="email" />

        <input  value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" type="password" />

        <button type="submit" onClick={loginToApp}>Sign In</button>
      </form>

      <p>Not a member? {" "} <span className="login__register" onClick={register}>Register Now</span></p>
    </div>
  )
}

export default Login
