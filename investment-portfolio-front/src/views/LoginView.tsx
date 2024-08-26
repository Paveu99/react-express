import { FormEvent, useEffect, useState } from "react";
import { usePostLoginMutation } from "../queries/users/usePostLoginMutation";
import { UserEntity } from "../types";
import "../styles/LogReg.css"

export const LoginView = () => {
    const [form, setForm] = useState<UserEntity>({
        username: '',
        password: '',
        balance: 0
    });
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [inputType, setInputType] = useState<string>('password');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const { data, error, isPending, mutate } = usePostLoginMutation();

    const showPassword = (e: FormEvent) => {
        e.preventDefault();
        setInputType('text');
    };

    const hidePassword = (e: FormEvent) => {
        e.preventDefault();
        setInputType('password');
    };

    const change = (key: string, value: any) => {
        setForm(form => ({
            ...form,
            [key]: value
        }));
    };

    const checkInput = async (e: FormEvent) => {
        e.preventDefault();

        if (form.password.length > 0 && form.username.length > 0) {
            mutate(form);
        } else {
            setSubmitted(true);
            setErrorMessage('Please fill the input fields');
        }
    };

    const refreshToMain = () => {
        window.location.replace("http://localhost:5173");
    };

    useEffect(() => {
        if (data) {
            sessionStorage.setItem('token', data.user.username);
            sessionStorage.setItem('token2', data.user.id as string);
            refreshToMain();
        }
        if (error) {
            console.log(error.message);

            setSubmitted(true);
            setErrorMessage(error.message);
        }
    }, [data, error]);

    return <div className='LogReg'>
        <h1>Log in Form</h1>
        <form autoComplete='off' className="form-logreg" onSubmit={checkInput}>
            {submitted && errorMessage && (
                <p className="checkAnswer" style={{ backgroundColor: 'red', borderRadius: "10px", padding: "10px" }}>
                    {errorMessage}
                </p>
            )}
            <div className="container-input">
                <label>
                    <p>Username:</p>
                    <div className="password-container">
                        <input
                            type="text"
                            name="email"
                            className="input"
                            value={form.username}
                            onChange={e => change('username', e.target.value)}
                        />
                    </div>
                </label>
            </div>
            <div className="container-input">
                <label>
                    <p>Password:</p>
                    <div className="password-container">
                        <input
                            type={inputType}
                            name="password"
                            className="input"
                            value={form.password}
                            onChange={e => change('password', e.target.value)}
                        />
                        <button type="button" className="show-password-button" onMouseDown={showPassword} onMouseUp={hidePassword} onMouseOut={hidePassword}>
                            {'👁'}
                        </button>
                    </div>
                </label>
            </div>
            <button type="submit" className="download2" disabled={isPending}>Log in</button>
        </form>
        {isPending && <h3>Loading...</h3>}
    </div >
}
