
convert = () => {

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
		option.text = `${currencySymbol}(${currencyName})`;
		option.value = id
		let select = document.querySelector(`#${chosenSelectId}`);
		select.appendChild(option);
	}
}

fetchCurrencies = () => {
	let fromText = document.querySelector('#fromText');
	let toText = document.querySelector('#toText');
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

// convert = () => {

// }

// data.results.forEach(element => {
// 			let option = document.createElement("option");
// 			option.text = element.currencyName;
// 			option.value = "id"
// 			let select = document.querySelector('#fromCurrency');
// 			select.appendChild(option)
// 		}

/*
for (let p in obj){
			if(obj.hasOwnProperty(p)){
				currencyName = obj[p].currencyName;
				if(obj[p].currencySymbol){
					currencySymbol = obj[p].currencySymbol;
				}	
				id = obj[p].id;
				let option = document.createElement("option");
				option.text = `${currencyName}(${currencySymbol})`;
				option.value = id
				let select1 = document.querySelector('#fromCurrency');
				let select2 = document.querySelector('#toCurrency');
				select1.appendChild(option);
				select2.appendChild(option);
			}
		}
*/