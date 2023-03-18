import { UserContext } from '@/lib/context';
import { auth } from '@/lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Image from 'next/image';
import {FormEvent, FormEventHandler, useContext, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import LoginFormProps from './LoginFormProps';
// import '@/styles/Nav.module.css';

function LoginForm(props: LoginFormProps) {
    const [selected, setSelected] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    // const {user, username} = useContext(UserContext)
    const user = useAuthState(auth)

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        console.log("need to implement login functionality")
        console.log(`Logged in with ${email} - ${password}`)
    }
    const emailChanged = (event: FormEvent<HTMLInputElement>) => {
        setEmail(event.currentTarget.value)
    }
    const passwordChanged = (event: FormEvent<HTMLInputElement>) => {
        setPassword(event.currentTarget.value)
    }
    const signInWithEmail = (event: FormEvent<HTMLInputElement>) => {
        event.preventDefault()
        signInWithEmailAndPassword(auth, email, password)
            // .then((userCredential) => {
            //     const user = userCredential.user
            // })
            .catch((error) => {
                console.log(`${error.code} - ${error.message}`);
            })
            setEmail("")
            setPassword("")
    }

    return (
        <div className={`md:relative md:flex md:flex-row md:justify-end ${props.className}`}>
            { user[0] ?
                <div className="flex flex-col gap-4">
                    <p className="text-sm">Willkommen {user[0]?.email}</p>
                    <button className="btn mx-auto" onClick={() => auth.signOut()}>Ausloggen</button>
                </div>
            :
                <>
                    <Image src='/login_round.png' width='240' height='240' alt='Login-Formular' className='hidden md:block h-28 w-auto max-w-none p-4 hover:cursor-pointer' onClick={() => setSelected(!selected)} />
                    <h4 className={`${selected ? 'hidden' : ''} md:hidden mt-12 font-bold text-2xl`} onClick={() => setSelected(!selected)}>Login</h4>
                    <form
                        onSubmit={handleSubmit}
                        className={`
                            ${selected ? 'flex' : 'hidden'} flex-col
                            md:absolute md:top-[135%] md:right-8
                            soft-gradient
                            dark:hard-gradient
                            bg-stone-200 dark:bg-slate-900
                            border-green-500 border-2 rounded-lg p-4
                            relative mx-auto w-[65%] mt-8 md:min-w-fit md:w-64
                        `}>
                        <button
                            onClick={() => setSelected(!selected)}
                            className="absolute top-0 right-0 translate-x-3 -translate-y-3 rounded-full border-2 w-7 h-7 font-bold text-white bg-fuchsia-600 hover:scale-110 transition-all"
                        >X</button>
                        <label className="w-full flex flex-col">
                            <span className="text-xs">Name</span>
                            <input type="text" placeholder='Username' onChange={emailChanged} value={email} className="bg-transparent border-b-2 dark:border-indigo-50 border-indigo-900 text-indigo-900 dark:text-indigo-50" />
                        </label>
                        <label className="w-full flex flex-col mt-4">
                            <span className="text-xs">Passwort</span>
                            <input type="password" placeholder='Passwort' onChange={passwordChanged} value={password} className="bg-transparent border-b-2 dark:border-indigo-50 border-indigo-900 text-indigo-900 dark:text-indigo-50" />
                        </label>
                        <input type="submit" value="Login" onClick={signInWithEmail} className='btn mx-auto mt-4' />
                    </form>
                </>
            }
        </div>
     );
}

export default LoginForm;