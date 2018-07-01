
//create a database and add some values
let dbPromise = idb.open('test-db', 1, upgradeDb => {
	var keyValStore = upgradeDb.createObjectStore('keyval');
	keyValStore.put('world', 'hello');
})

//to read from the database
dbPromise.then(db => {
	let tx = db.transaction('keyval');
	let keyValStore = tx.objectStore('keyval');
	return keyValStore.get('hello');
}).then(val => {
	console.log(val)
})

//add another value
dbPromise.then(db => {
	let tx = db.transaction('keyval', 'readwrite');
	let keyValStore = tx.objectStore('keyval');
	keyValStore.put('bar', 'foo');
	return tx.complete;
}).then(() => {
	console.log('Added another data')
})