// 参考系列： https://www.jianshu.com/p/cea9f3be42f5

function List() {
	this.listSize = 0;
	this.pos = 0;
	this.dataStore = [];
	this.append = append;
	this.toString = toString;
	this.find = find;
	this.remove = remove;
	this.length = length;
	this.insert = insert;
	this.clear = clear;
	this.front = front;
	this.end = end;
	this.prev = prev;
	this.next = next;
	this.moveTo = moveTo;
	this.currPos = currPos;
	this.getElement = getElement;
	this.contains = contains;
}

   function append(element) {
	  this.dataStore[this.listSize++] = element
   }

    function toString(){
       return this.dataStore;
   }

   function find(element) {
   	for(let i = 0; i< this.dataStore.length; i++) {
   		if (this.dataStore[i] === element) {
   			return i;
   		}
   	}
   	return -1;
   }

   function remove(element) {
   	var fountAt = this.find(element);
   	if (fountAt > -1) {
   		this.dataStore.splice(fountAt, 1);
   		--this.listSize;
   		return true;
   	}
   	return false;
   }

   function length() {
   	return this.listSize;
   }

   function insert(element, after) {
   	var insertPos = this.find(after);
   	if (insertPos > -1) {
   		this.dataStore.splice(insertPos+1, 0, element);
   		this.listSize++;
   		return true;
   	}
   	return false;
   }

   function clear() {
   	delete this.dataStore;
   	this.dataStore = [];
   	this.listSize = this.pos = 0;
   }

   function front() {
   	this.pos = 0;
   }

   function end() {
   	this.pos = this.listSize -1;
   }

   function prev() {
   	if(this.pos > 0) {
   		this.pos--;
   	} else {
   		console.log('您当前已在首位');
   	}
   }

   function next() {
   	if(this.pos < this.listSize -1) {
   		++this.pos;
   	} else {
   		console.log('您当前已在末尾')
   	}
   }

   function moveTo(position) {
   	if( position < 0 || position > (this.listSize - 1) ){
        console.log('请输入正确的位置');
    }else{
        this.pos = position;
    }
   }

   function currPos(){
    return this.pos;
   }

   function getElement(){
    return this.dataStore[this.pos];
  }

  function contains( element ){
    return this.dataStore.includes( element );
  }


//构造列表对象
// var fruits = new List();

// fruits.append('Pear');
// fruits.append('Orange');
// fruits.append('Strawberry');
// console.log( fruits.toString() );    // ["Apple", "Grape", "Banana", "Pear", "Orange", "Strawberry"]

// //我们先看当前的位置和元素
// console.log( fruits.currPos() );     // 0
// console.log( fruits.getElement() );  // Apple

// //我们尝试改变一下
// fruits.moveTo( 2 );
// fruits.next();
// console.log( fruits.currPos() );     // 3
// console.log( fruits.getElement() );  // Pear
// fruits.end();
// fruits.prev();
// console.log( fruits.currPos() );     // 4
// console.log( fruits.getElement() );  // Orange
