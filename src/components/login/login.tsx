import Image from 'next/image';
import {FormEvent, FormEventHandler, useState } from 'react';
import LoginFormProps from './LoginFormProps';

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
        <div className={`sm:relative ${props.className}`}>
            <Image src='/login_round.png' width='240' height='240' alt='Login-Formular' className='w-auto p-4 hover:cursor-pointer' onClick={() => setSelected(!selected)} />
            <form
                onSubmit={handleSubmit}
                className={`
                    ${selected ? 'flex' : 'hidden'} flex-col
                    sm:absolute sm:top-[135%] sm:right-8
                    soft-gradient
                    dark:hard-gradient
                    border-green-500 border-2 rounded-lg relative sm:p-3
                `}>
                <button
                    onClick={() => setSelected(!selected)}
                    className="absolute top-0 right-0 translate-x-3 -translate-y-3 rounded-full border-2 w-7 h-7 font-bold text-white bg-fuchsia-600 hover:scale-110 transition-all"
                >X</button>
                <label className="w-full">
                    <span className="text-xs">Name</span>
                    <input type="text" placeholder='Username' onChange={usernameChanged} className="bg-transparent border-b-2 dark:border-indigo-50 border-indigo-900 text-indigo-900 dark:text-indigo-50" />
                </label>
                <label className="w-full">
                    <span className="text-xs">Passwort</span>
                    <input type="password" placeholder='Passwort' onChange={passwordChanged} className="bg-transparent border-b-2 dark:border-indigo-50 border-indigo-900 text-indigo-900 dark:text-indigo-50" />
                </label>
                <input type="submit" value="Login" className='btn mx-auto mt-4' />
            </form>
        </div>
     );
}

export default LoginForm;