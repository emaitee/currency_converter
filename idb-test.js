import idb from './idb.js';

idb.open('test-db', 1, upgradeDb => {
	var keyValStore = upgradeDb.createObjectStore('keyval');
	keyValStore.put('world', 'hello');

})