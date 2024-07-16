const tokenNames = ["Tether USD", "Binance Coin", "USD Coin", "Tron", "Matic", "Ethereum", "Bitcoin", "Polkadot", "Default"];
const tokenSymbols = ["USDT", "BNB", "USDC", "TRX", "MATIC", "ETH", "BTC", "DOT", "Select Token"];

const TOKENS = {};

for (let i = 0; i < tokenNames.length; i++) {
    TOKENS[tokenNames[i]] = tokenSymbols[i];
}

export { TOKENS };