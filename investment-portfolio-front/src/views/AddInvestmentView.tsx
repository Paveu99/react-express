import { FormEvent, useEffect, useState } from "react";
import { usePostInvestmentsMutation } from "../queries/investments/usePostInvestmentMutation";
import { useGetUserQuery } from "../queries/users/useGetUserQuery";
import { InvestmentEntity } from "../types";

export const AddInvestmentView = () => {

    const id = sessionStorage.getItem('token2');

    const { data, mutate, isPending, error } = usePostInvestmentsMutation(id);
    const { refetch } = useGetUserQuery(id);

    const [submitted, setSubmitted] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const [form, setForm] = useState<InvestmentEntity>({
        name: '',
        price: 0,
        quantity: 0,
        user_id: id as string,
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
        if (form.name.length) {
            mutate(form);
        } else {
            setSubmitted(true);
            setErrorMessage('Please fill the input fields');
        }
    };

    const clear = () => {
        setForm({
            name: '',
            price: 0,
            quantity: 0,
            user_id: id as string,
        })
    };

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
        <h2>Add new investment to your account</h2>
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
                <div>
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        className="input"
                        value={form.name}
                        placeholder="Name"
                        onChange={e => change('name', e.target.value)}
                    />
                </div>
                <div>
                    <label>Price per share</label>
                    <input
                        type="number"
                        name="price"
                        className="input"
                        value={form.price}
                        placeholder="Price per share"
                        onChange={e => change('price', e.target.value)}
                    />
                </div>
                <div>
                    <label>Number of shares</label>
                    <input
                        type="text"
                        name="quantity"
                        className="input"
                        value={form.quantity}
                        placeholder="Number of shares"
                        onChange={e => change('quantity', e.target.value)}
                    />
                </div>
                <button type="submit" className="download2" disabled={isPending}>Add investment</button>
            </div>
        </form>
        {isPending && <h3>Loading...</h3>}
    </div>
}