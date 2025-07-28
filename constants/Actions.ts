type MaterialIconName =
    | "arrow-downward"
    | "send"
    | "arrow-upward"
    | "shopping-cart";


export const actions: { label: string; icon: MaterialIconName, key: string }[] = [
    { label: 'Transfer', icon: 'send', key: 'transfer' },
    { label: 'Withdraw', icon: 'arrow-downward', key: 'withdraw' },
    { label: 'Deposit', icon: 'arrow-upward', key: 'deposit' },
    { label: 'Pay & Buy', icon: 'shopping-cart', key: 'pay_and_buy' },
];
