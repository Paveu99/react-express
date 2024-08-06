export const useApi = () => {

    const call = async <R, P = {}>(url: string, method: 'GET' | 'DELETE' | 'POST' | 'PUT', body?: P) => {
        const commonData = {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const reqData = body ? {
            ...commonData,
            body: JSON.stringify(body)
        } : commonData

        try {
            const res = await fetch("http://localhost:3001" + url, reqData);

            if (res.ok) {
                const data: R = await res.json();
                return data;
            } else {
                const apiError = await res.json();
                throw new Error(apiError.error);
            }
        } catch (e) {
            if (e instanceof Error) {
                throw new Error(e.message);
            } else {
                throw new Error(JSON.stringify(e));
            }
        }
    }


    const apiDelete = async<R>(url: string) => {
        return await call<R>(url, 'DELETE');
    }

    const apiGet = async<R>(url: string) => {
        return await call<R>(url, 'GET');
    }

    const apiPost = async<R, P>(url: string, data: P) => {
        return await call<R, P>(url, 'POST', data);
    }

    const apiPut = async<R, P>(url: string, data: P) => {
        return await call<R, P>(url, 'PUT', data);
    }

    return {
        apiGet,
        apiDelete,
        apiPost,
        apiPut
    }
}