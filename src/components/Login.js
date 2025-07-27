import React, { useRef, useState } from 'react'
import Header from './Header'
import { checkValidData } from '../utils/validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../utils/firebase';
import { addUser } from '../utils/userSlice';
import { useDispatch } from 'react-redux';

const Login = () => {

    const [isSignInForm, setIsSignInForm] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const dispatch = useDispatch();

    const name = useRef(null);
    const email = useRef(null);
    const password = useRef(null);

    const handleButtonClick = () => {
        const emailValue = email?.current?.value || "";
        const passwordValue = password?.current?.value || "";

        // In signup form, include name for validation; otherwise skip it
        const nameValue = isSignInForm ? null : name?.current?.value || "";

        const message = isSignInForm
            ? checkValidData(null, emailValue, passwordValue)
            : checkValidData(nameValue, emailValue, passwordValue);

        setErrorMessage(message);
        if (message) return;

        if (!isSignInForm) {
            // Sign-up flow
            createUserWithEmailAndPassword(auth, emailValue, passwordValue)
                .then((userCredential) => {
                    const user = userCredential.user;
                    updateProfile(user, {
                        displayName: nameValue,
                    })
                        .then(() => {
                            const { uid, email, displayName } = auth.currentUser;
                            dispatch(addUser({ uid: uid, email: email, displayName: displayName }));
                        })
                        .catch((error) => {
                            setErrorMessage(error.message + " - " + error.code);
                        });
                })
                .catch((error) => {
                    setErrorMessage(error.code + " - " + error.message);
                });
        } else {
            // Sign-in flow
            signInWithEmailAndPassword(auth, emailValue, passwordValue)
                .then((userCredential) => {
                    const user = userCredential.user;
                })
                .catch((error) => {
                    setErrorMessage(error.code + " - " + error.message);
                });
        }
    };


    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm)
    }

    return (
        <div>
            <Header />
            <div className='absolute'>
                <img src='https://assets.nflxext.com/ffe/siteui/vlv3/3c5e10eb-4b8f-4f6d-bc86-0087cf2c6e8c/web/IN-en-20250707-TRIFECTA-perspective_06686b82-c2e5-4118-ab7b-d575f79b304b_medium.jpg'
                    alt='bc' />
            </div>
            <form onSubmit={(e) => e.preventDefault()} className='w-3/12 absolute p-12 bg-black/70 my-36 mx-auto right-0 left-0 text-white rounded-lg'>

                <h1 className='font-bold text-3xl py-2'>
                    {isSignInForm ? "Sign In" : "Sign Up"}
                </h1>

                {!isSignInForm && (<input
                    ref={name}
                    type="text"
                    placeholder='Full Name'
                    className='p-2 my-3 w-full bg-gray-800 text-white placeholder-gray-400 rounded'
                />)}

                <input
                    ref={email}
                    type="text"
                    placeholder='Email Address'
                    className='p-2 my-3 w-full bg-gray-800 text-white placeholder-gray-400 rounded'
                />

                <input
                    ref={password}
                    type="password"
                    placeholder='Password'
                    className='p-2 my-3 w-full bg-gray-800 text-white placeholder-gray-400 rounded'
                />

                <p className='text-red-500 p-2'>{errorMessage}</p>

                <button className="p-2 my-4 w-full bg-red-600 hover:bg-red-700 rounded text-white font-semibold" onClick={handleButtonClick}>
                    {isSignInForm ? "Sign In" : "Sign Up"}
                </button>

                <p className='py-2 cursor-pointer' onClick={toggleSignInForm}>
                    {isSignInForm ? "New to Netflix? Sign Up Now." : "Already registered? Sign In Now."}
                </p>

            </form>
        </div>
    )
}

export default Login
