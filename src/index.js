
convertCurrency = (amount, from, to, callback) => {
	const query = `${from}_${to}`;

	const convertURL = `https://free.currencyconverterapi.com/api/v5/convert?q=${query}&compact=ultra`;

	fetch(convertURL).then(res => res.json()).then(data => {
		console.log(`exchange rates: ${data[query]}`)
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
	let fromCurrency = document.querySelector('#fromCurrency');
	let toCurrency = document.querySelector('#toCurrency');
	let fromAmount = document.querySelector('#amount');
	let result = document.querySelector('#result');

	convertCurrency(fromAmount.value, fromCurrency.value, toCurrency.value, function(err, amount){
		result.innerHTML = `${fromAmount.value} ${fromCurrency.value} = ${amount} ${toCurrency.value}`;
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

registerServiceWorker = () => {
	if(!navigator.serviceWorker) return;

	navigator.serviceWorker.register('sw.js').then((reg) => {
		console.log('Registration successful!')
		//if thig page is not loaded with a serviceWorker, in that case, exit early
		// if(!navigator.serviceWorker.controller){
		// 	return;
		// }

		// //if there is an updated worker already waiting, call updateReady()
		// if(reg.waiting){
		// 	updateReady()
		// }

		// if(reg.installing) {
			
		// }


	}).catch((err) => {
		console.log('Registration failed:', err)
	});
}; 

runApp = () => {
	fetchCurrencies();

	registerServiceWorker();
}

runApp();

