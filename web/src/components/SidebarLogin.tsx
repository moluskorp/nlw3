import React from 'react';

import logoImg from '../images/logo.svg';

import '../styles/components/sidebar-login.css'

export default function SidebarLogin() {
    return (
        <aside className="sidebar-login">
            <img src={logoImg} alt="Happy" />
            <div className="location">
                <strong>Ribeirão Preto</strong>
                <span>São Paulo</span>
            </div>
        </aside>
    );
}