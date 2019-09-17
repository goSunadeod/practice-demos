// 表示节点
function Node(element) {
	this.element = element;
	this.next = null;
}


// 链表操作
function LList() {
	this.head = new Node('head');
	this.find = find;
	this.insert = insert;
	this.remove = remove;
	this.findPrev = findPrev;
	this.display = display;
}

function find(item) {
	var curNode = this.head
	while(curNode.element !== item) {
		curNode = curNode.next;
	}
	return curNode;
}


function insert(newElement, item) {
	var newNode = new Node(newElement);
	var curNode = this.find(item);
	newNode.next = curNode.next;
	curNode.next = newNode;
}

// 显示链表
function display () {
    var currNode = this.head;
    while ( !(currNode.next == null) ){
        console.log( currNode.next.element );
        currNode = currNode.next;
    }
}

function remove ( item ) {
    var prevNode = this.findPrev( item );
    console.log(prevNode.next);
    prevNode.next = prevNode.next.next;
}

// 查找前一个
function findPrev( item ) {
    var currNode = this.head;
    while ( !( currNode.next == null) && ( currNode.next.element != item )){
        currNode = currNode.next;
    }
    return currNode;
}