// 节点
function Node(element) {
    this.element = element; 
    this.next = null;        
    this.previous = null;
}

function LList () {
    this.head = new Node('head');
    this.find = find;
    this.findLast = findLast;
    this.insert = insert;
    this.remove = remove;
    this.display = display;
    this.dispReverse = dispReverse;
}

function find ( item ) {
    var currNode = this.head;
    while ( currNode.element != item ){
        currNode = currNode.next;
    }
    return currNode;
}

function findLast () {
    var currNode = this.head;
    while ( !( currNode.next == null )){
        currNode = currNode.next;
    }
    return currNode;
}

function insert ( newElement , item ) {
    var newNode = new Node( newElement );
    var currNode = this.find( item );
    newNode.next = currNode.next;
    newNode.previous = currNode;
    if (currNode.next !== null) {
        currNode.next.previous = newNode;
    }
    currNode.next = newNode;
}

function display () {
    var currNode = this.head;
    while ( !(currNode.next == null) ){
        console.debug( currNode.next.element );
        currNode = currNode.next;
    }
}


// 反向显示链表元素
function dispReverse () {
    var currNode = this.findLast();
    while ( !( currNode.previous == null )){
        console.log( currNode.element );
        currNode = currNode.previous;
    }
}


function remove ( item ) {
    // debugger;
    var currNode = this.find ( item );
    if( !( currNode.next == null ) ){
        currNode.previous.next = currNode.next;
        currNode.next.previous = currNode.previous;
        currNode.next = null;
        currNode.previous = null;
    } else {
        currNode.previous.next = null
    }
}