const tokenNames = ["Tether USD", "Binance Coin", "USD Coin", "Tron", "Matic", "Ethereum", "Bitcoin", "Polkadot"];
const tokenSymbols = ["USDT", "BNB", "USDC", "TRX", "MATIC", "ETH", "BTC", "DOT"];

const TOKENS = {};

for (let i = 0; i < tokenNames.length; i++) {
    TOKENS[tokenNames[i]] = tokenSymbols[i];
}

export { TOKENS };