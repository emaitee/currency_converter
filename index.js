
convertCurrency = (amount, fromCurrency, toCurrency, callback) => {
	let apiKey = 'dont-know-yet';
	// let fromText = document.querySelector('#fromText');
	let fromCurrency = document.querySelector('#fromCurrency').value;
	let toCurrency = document.querySelector('#toCurrency').value;

	const query = `${fromCurrency}_${toCurrency}`;

	const convertURL = `https://free.currencyconverterapi.com/api/v5/convert?q=${query}&compact=ultra`;

	fetch(convertURL).then(res => res.json()).then(data => {
		let result = data[query];
		if(result){
			let total = result*amount;
			callback(null, Math.round(total*100)/100);
		} else {
			let err = new Error(`Value not found for ${query}`);
			console.log(err);
			callback(err);
		}
	}).then(err => console.log(err));
}

convert = (event) => {
	event.preventDefault();
	let fromAmount = document.querySelector('#fromAmount').value;
	let toAmount = document.querySelector('#toAmount');
	let from = document.querySelector('#fromCurrency').value;
	let to = document.querySelector('#toCurrency').value;

	convertCurrency(fromAmount, from, to, function(err, amount){
		toAmount.value = amount;
		console.log(amount)
	})
}


appendToSelect = (data, chosenSelectId) => {
	let currencyName, currencySymbol, id;
	let obj = data.results
	for (const key of Object.keys(obj)){
		currencyName = obj[key].currencyName;
		if(obj[key].currencySymbol){
			currencySymbol = obj[key].currencySymbol;
		}	
		id = obj[key].id;
		let option = document.createElement("option");
		option.text = `${id}(${currencyName})`;
		option.value = id
		let select = document.querySelector(`#${chosenSelectId}`);
		select.appendChild(option);
	}
}

fetchCurrencies = () => {
	const url = 'https://free.currencyconverterapi.com/api/v5/currencies';
	fetch(url).then(res => res.json()).then(data => {
		appendToSelect(data, 'fromCurrency');
		appendToSelect(data, 'toCurrency');
	}).then(err => console.log(err))
}

runApp = () => {
	fetchCurrencies()
}

runApp();

