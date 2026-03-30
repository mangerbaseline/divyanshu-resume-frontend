import { useState } from 'react';
import Link from 'next/link';
import { API } from '../config';

const ForgotPassword = () => {
    const [values, setValues] = useState({
        email: '',
        message: '',
        error: '',
        showForm: true
    });

    const { email, message, error, showForm } = values;

    const handleChange = name => e => {
        setValues({ ...values, message: '', error: '', [name]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        setValues({ ...values, message: '', error: '' });
        fetch(`${API}/api/forgot-password`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error });
                } else {
                    setValues({ ...values, message: data.message, email: '', showForm: false });
                }
            });
    };

    const showError = () => (error ? <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm mb-4">{error}</div> : '');
    const showMessage = () => (message ? <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg text-sm mb-4">{message}</div> : '');

    const passwordForgotForm = () => (
        <form onSubmit={handleSubmit} className="mt-8 space-y-6 bg-slate-800 p-8 rounded-2xl shadow-xl border border-white/10">
            <div className="space-y-4">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                        Email address
                    </label>
                    <input
                        onChange={handleChange('email')}
                        value={email}
                        type="email"
                        className="appearance-none relative block w-full px-4 py-3 border border-white/10 bg-slate-900/50 placeholder-slate-500 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 text-sm transition-colors"
                        placeholder="Type your email"
                        required
                    />
                </div>
            </div>

            <div>
                <button
                    className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Send password reset link
                </button>
            </div>

            <div className="text-center mt-4">
                <Link href="/signin" className="font-medium text-blue-400 hover:text-blue-300">
                    Back to Sign In
                </Link>
            </div>
        </form>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 to-indigo-950 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <Link href="/" className="inline-flex items-center">
                        <div className="h-12 w-12 bg-blue-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-lg">R</span>
                        </div>
                        <span className="ml-3 text-2xl font-bold text-white">ResumeCraft</span>
                    </Link>
                    <h2 className="mt-6 text-3xl font-bold text-white">
                        Forgot Password
                    </h2>
                </div>

                <div className="container col-md-8 offset-md-2">
                    {showError()}
                    {showMessage()}
                    {showForm && passwordForgotForm()}
                    {!showForm && (
                        <div className="text-center mt-8">
                            <Link href="/signin" className="font-medium text-blue-400 hover:text-blue-300">
                                Return to Sign In
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
