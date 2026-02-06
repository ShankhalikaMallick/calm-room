import React, { useState } from 'react';
import './LoginPage.css';

const LoginPage = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email && password) {
            onLogin({ email, name: email.split('@')[0] });
        }
    };

    return (
        <div className="login-container">
            <div className="login-background">
                <div className="blob blob-1"></div>
                <div className="blob blob-2"></div>
                <div className="blob blob-3"></div>
            </div>

            <div className="login-card-wrapper">
                <div className="login-card">
                    <header className="login-header">
                        <div className="logo-icon">✨</div>
                        <h1>{isSignUp ? 'Create Haven' : 'Welcome Home'}</h1>
                        <p>{isSignUp ? 'Start your journey to tranquility' : 'Return to your peaceful space'}</p>
                    </header>

                    <form className="login-form" onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label htmlFor="email">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="input-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button type="submit" className="login-submit">
                            {isSignUp ? 'Sign Up' : 'Enter Space'}
                        </button>
                    </form>

                    <footer className="login-footer">
                        <button
                            className="toggle-auth"
                            onClick={() => setIsSignUp(!isSignUp)}
                        >
                            {isSignUp
                                ? 'Already have a haven? Log In'
                                : "Don't have a haven? Sign Up"}
                        </button>
                    </footer>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
