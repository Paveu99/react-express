import { FormEvent, useEffect, useState } from "react";
import { useGetUserQuery } from "../queries/users/useGetUserQuery";
import { BalanceChange } from "../types";
import { useEditBalanceMutation } from "../queries/investments/useEditBalanceMutation";
import '../styles/EditForm.css'

export const EditBalance = () => {
    const id = sessionStorage.getItem('token2');
    const { refetch } = useGetUserQuery(id);
    const { data, error, isPending, mutate } = useEditBalanceMutation();

    const [submitted, setSubmitted] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [form, setForm] = useState<BalanceChange>({
        user_id: id as string,
        amount: 0
    });

    const change = (key: string, value: any) => {
        setForm(form => ({
            ...form,
            [key]: value
        }));
    };

    const checkInput = async (e: FormEvent) => {
        e.preventDefault();
        setSubmitted(false);
        setErrorMessage(null);
        setSuccessMessage(null);
        mutate(form);
    };

    const clear = () => {
        setForm({
            user_id: id as string,
            amount: 0
        })
    }

    useEffect(() => {
        setSubmitted(true);
        if (data) {
            clear();
            refetch();
            setSuccessMessage(data.message);
            setTimeout(() => {
                setSuccessMessage(null);
                setSubmitted(false);
            }, 2000);
        }
        if (error) {
            console.log(error.message);
            setErrorMessage(error.message);
        }
    }, [data, error]);

    return <div>
        <h2>Edit your balance</h2>
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
            </div>
        )}
        <form autoComplete="off" onSubmit={checkInput}>
            <div className="edit-form">
                <p>Amount to add:</p>
                <div>
                    <input
                        type="number"
                        name="amount"
                        className="input"
                        value={form.amount}
                        onChange={e => change('amount', e.target.value)}
                    />
                </div>
                <button type="submit" className="download2" disabled={isPending}>Add amount</button>
            </div>
        </form>
        {isPending && <h3>Loading...</h3>}
    </div>
}