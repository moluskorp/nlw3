import React, { useState } from 'react';
import { FaCheck, FaCheckDouble } from 'react-icons/fa';
import { FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import SidebarLogin from '../components/SidebarLogin';
import api from '../services/api';
import jsonWebTokenService from 'jsonwebtoken'

import '../styles/pages/login.css';

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function submitLogin() {
        const jwt = await api.get(`/user/${email}&${password}`);
        saveJwt(jwt.data);
    }

    async function saveJwt(jwt: string) {
        const decodedJwt = jsonWebTokenService.decode(jwt);
        await localStorage.setItem('jwt_usuario', jwt);
        await localStorage.setItem('dados_usuario', JSON.stringify(decodedJwt));
    }

    return (
        <div id="page-login">
            <SidebarLogin />
            <div id="main">
                <Link to="/" className="go-back">
                    <FiArrowLeft size={26} color="rgba(0, 0, 0, 0.6)" />
                </Link>
                <div id="login-fields">
                    <legend>Fazer login</legend>
                    <div className="input-block">
                        <label htmlFor="email">E-mail</label>
                        <input
                            id="email"
                            value={email}
                            onChange={event => setEmail(event.target.value)} />
                    </div>
                    <div className="input-block">
                        <label htmlFor="senha">Senha</label>
                        <input type="password"
                            id="senha"
                            value={password}
                            onChange={event => setPassword(event.target.value)} />
                    </div>
                    <div className="checkbox-forgot">
                        <div className="input-checkbox">
                            <input type="checkbox" />
                            <label>Lembrar-me</label>
                        </div>
                        <Link to="/app" className="forgot-password">
                            Esqueci minha senha
                        </Link>
                    </div>
                    <button type="button" className="active" onClick={submitLogin}>
                        Entrar
                    </button>
                </div>
            </div>

        </div>
    );
}