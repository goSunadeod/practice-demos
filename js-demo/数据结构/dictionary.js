function Dictionary() {
	this.dataStore = [];
	this.add = add;
	this.find = find;
	this.remove = remove;
	this.count = count;
	this.showAll = showAll;
	this.clear = clear;
}


function add(key, value) {
	this.dataStore[key] = value
}

function find(key) {
	if (this.dataStore[key]) {
		return this.dataStore[key]
	}
	return 'Not Found'
}

function remove(key) {
	if( this.dataStore[key] ) delete this.dataStore[key];
    return 'Not Found';
}

function count() {
	let count = 0;
	for (let key in this.dataStore) {
		count ++;
	}
	return count;
}

function showAll() {
	for (let key in this.dataStore) {
		console.log(key + '----->' + this.dataStore[key])
	} 
}

function clear() {
	delete this.dataStore;
	this.dataStore = [];
}
