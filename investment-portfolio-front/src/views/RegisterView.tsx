import { FormEvent, useEffect, useState } from "react";
import { UserEntity } from "../types";
import { usePostRegisterMutation } from "../queries/users/usePostRegisterMutation";
import { NavLink } from "react-router-dom";
import "../styles/LogReg.css"

export const RegisterView = () => {
    const [form, setForm] = useState<UserEntity>({
        username: '',
        password: '',
        balance: 0
    });
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [inputType, setInputType] = useState<string>('password');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const { data, error, isPending, mutate } = usePostRegisterMutation();

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

    const clear = () => {
        setForm({
            balance: 0,
            password: "",
            username: "",
        })
    }

    const checkInput = async (e: FormEvent) => {
        e.preventDefault();
        setSubmitted(false);
        setErrorMessage(null);
        setSuccessMessage(null);

        if (form.password.length > 0 && form.username.length > 0) {
            mutate(form);
        } else {
            setSubmitted(true);
            setErrorMessage('Please fill the input fields');
        }
    };

    useEffect(() => {
        setSubmitted(true);
        if (data) {
            setSuccessMessage(data.message);
            clear();
        }
        if (error) {
            console.log(error.message);
            setErrorMessage(error.message);
        }
    }, [data, error]);

    return <div className='LogReg'>
        <h1>Register Form</h1>
        <form autoComplete='off' className="form-logreg" onSubmit={checkInput}>
            {submitted && errorMessage && (
                <p className="checkAnswer" style={{ backgroundColor: 'red', borderRadius: "10px" }}>
                    {errorMessage}
                </p>
            )}
            {submitted && successMessage && (
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                    <p className="checkAnswer" style={{ backgroundColor: 'green', borderRadius: "10px", width: "max-content", padding: "5px" }}>
                        {successMessage}
                    </p>
                    <p>Please navigate to <NavLink style={{ textDecoration: "none" }} to="/user/login">Here</NavLink> in order to login or add next user to the database</p>
                </div>
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
            <div className="container-input">
                <label>
                    <p>Balance to start with:</p>
                    <div className="password-container">
                        <input
                            type="number"
                            name="balance"
                            className="input"
                            value={form.balance}
                            onChange={e => change('balance', e.target.value)}
                        />
                    </div>
                </label>
            </div>
            <button type="submit" className="download2" disabled={isPending}>Register</button>
        </form>

        {isPending && <h3>Loading...</h3>}
    </div >
}
