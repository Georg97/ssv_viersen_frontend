import Image from 'next/image';
import {FormEvent, FormEventHandler, useState } from 'react';
import LoginFormProps from './LoginFormProps';
// import '@/styles/Nav.module.css';

function LoginForm(props: LoginFormProps) {
    const [selected, setSelected] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        console.log("need to implement login functionality")
        console.log(`Logged in with ${username} - ${password}`)
    }
    const usernameChanged = (event: FormEvent<HTMLInputElement>) => {
        setUsername(event.currentTarget.value)
    }
    const passwordChanged = (event: FormEvent<HTMLInputElement>) => {
        setPassword(event.currentTarget.value)
    }

    return (
        <div className={`md:relative md:flex md:flex-row md:justify-end ${props.className}`}>
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
                    <input type="text" placeholder='Username' onChange={usernameChanged} className="bg-transparent border-b-2 dark:border-indigo-50 border-indigo-900 text-indigo-900 dark:text-indigo-50" />
                </label>
                <label className="w-full flex flex-col mt-4">
                    <span className="text-xs">Passwort</span>
                    <input type="password" placeholder='Passwort' onChange={passwordChanged} className="bg-transparent border-b-2 dark:border-indigo-50 border-indigo-900 text-indigo-900 dark:text-indigo-50" />
                </label>
                <input type="submit" value="Login" className='btn mx-auto mt-4' />
            </form>
        </div>
     );
}

export default LoginForm;