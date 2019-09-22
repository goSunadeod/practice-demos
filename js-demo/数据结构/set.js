// 区别 Set 起名为MySet
function MySet() {
	this.dataStore = [];
	this.add = add;
	this.remove = remove;
	this.size = size;
	this.union = union // 并集
	this.intersect = intersect; // 交集
	this.subset = subset; // 子集
	this.difference = difference; // 补集
	this.contains = contains;
	this.show = show;
}

function add(data) {
	if(this.dataStore.indexOf(data) < 0) {
		this.dataStore.push(data);
		return true;
	} else {
		console.warn('Can not add' + data + ', must already be in set')
		return false;
	}
}

function remove(data) {
	var pos = this.dataStore.indexOf(data);
    if( pos > -1 ){
        this.dataStore.splice(pos,1);
        return true;
    }else{
        console.warn( data + ' is not in set');
        return false;
    }
}

function show(){
    console.log(this.dataStore);
    return this.dataStore;
}

function contains (data) {
    if( this.dataStore.indexOf(data) > -1 ){
        return true;
    }else{
        return false;
    }
}


function union(set) {
	var tempSet = new MySet();
	tempSet.dataStore = [...this.dataStore];
	for( var i = 0 ; i< set.dataStore.length ; i++ ){
        if( !tempSet.contains(set.dataStore[i])){
            tempSet.dataStore.push(set.dataStore[i]);
        }
    }
    return tempSet;
}

function intersect (set) {
    var tempSet = new MySet();
    for(var i = 0 ; i < this.dataStore.length ; i++ ){
        if( set.contains(this.dataStore[i])){
            tempSet.add(this.dataStore[i]);
        }
    }
    return tempSet;
}

function subset (set) {
    if( this.size() > set.size() ){
        console.log('not a subset');
        return false;
    }else{
        for ( var i = 0 ; i < this.dataStore.length ; i++ ){
            if( !set.contains(this.dataStore[i])){
                console.log('not a subset');
                return false;
            }
        }
    }
    console.log(' a subset');
    return true;
}


function size () {
    return this.dataStore.length;
}

function difference (set) {
    var tempSet = new  MySet();
    for( var i = 0 ; i < this.dataStore.length ; i ++ ){
        if( !set.contains(this.dataStore[i])){
            tempSet.dataStore.push( this.dataStore[i] );
        }
    }
    return tempSet;
}