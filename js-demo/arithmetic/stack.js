
 function Stack() {
 	this.dataStore = [];
 	this.top = 0;
 	this.pop = pop;
 	this.push = push;
 	this.peek = peek;
 	this.length = length;
 	this.clear = clear;
 }
	
	function pop() {
		return this.dataStore[--this.top];
	}

	function push(element) {
		this.dataStore[this.top++] = element;
	}

	function peek() {
		if(this.top > 0) return this.dataStore[this.top -1];
		return 'Empty'
	}

	function length() {
		return this.top;
	}

	function clear() {
		  delete this.dataStore;
          this.dataStore = [];
          this.top = 0;
	}


// 回文检验

function isPalindrome(word) {
	var s = new Stack();
	for(var i = 0; i< word.length; i++) {
		s.push(word[i])
	}
	var rword = '';
	while(s.length() > 0) {
		rword += s.pop();
	}

	if (word === rword) {
		return true;
	}
	return false;
}