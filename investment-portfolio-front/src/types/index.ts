export * from './investment'
export * from './user'
export type LoginRes = {
    message: string,
    user: {
        id: string,
        username: string,
        balance: number
    }
}

export type RegisterRes = {
    message: string,
}

export type AddRes = {
    message: string,
    newBalance?: number
}

export type BalanceChange = {
    user_id: string,
    amount: number
}