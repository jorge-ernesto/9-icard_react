import React from 'react'
import { LoginForm } from './../../Admin'

export function Login() {
    return (
        <div className="login-admin">
            <div className='login-admin__content'>
                <h1>Entrar al panel</h1>
                <LoginForm />
            </div>
        </div>
    )
}
