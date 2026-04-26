import ky from "ky";

const binanceApi = ky.create({
	prefix: "https://api.binance.com/api/v3",
	timeout: 10000,
});

export default binanceApi;
