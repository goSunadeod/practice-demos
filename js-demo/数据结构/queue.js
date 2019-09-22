function Queue(){
    this.dataStore = [];
    this.enqueue = enqueue;     //入队
    this.dequeue = dequeue;     //出队
    this.front = front;         //查看队首元素
    this.back = back;           //查看队尾元素
    this.toString = toString;   //显示队列所有元素
    this.clear = clear;         //清空当前队列
    this.empty = empty;         //判断当前队列是否为空
}

  function enqueue(element) {
  	this.dataStore.push(element);
  }

  function dequeue () {
    if( this.empty() ) return 'This queue is empty';
    else this.dataStore.shift();
}

function empty(){
    if( this.dataStore.length == 0 ) return true;
    return false;
}

function front(){
    if( this.empty() ) return 'This queue is empty';
    else return this.dataStore[0];
}

function back () {
    if( this.empty() ) return 'This queue is empty';
    else return this.dataStore[ this.dataStore.length - 1 ];
}

function toString(){
    return this.dataStore.join('\n');
}

function clear(){
    delete this.dataStore;
    this.dataStor = [];
}



var queues = [];
var nums = [];

for(let i = 0; i< 10; i++) {
	queues[i] = new Queue();
	nums[i] = Math.floor( Math.random() * 101 );
}

console.log( 'before radix sort: ' + nums );


function distribution ( nums , queues , n , digit ) {  //digit表示个位或者十位的值
    for( var i = 0 ; i < n ; i++ ){
        if( digit == 1){
            queues[ nums[i] % 10 ].enqueue( nums[i] );
        }else{
            queues[ Math.floor( nums[i] / 10 ) ].enqueue( nums[i] );
        }
    }
}


function collect ( queues , nums ) {
    var i = 0;
    for ( var digit = 0 ; digit < 10 ; digit ++ ){
        while ( !queues[digit].empty() ){
            nums[ i++ ] = queues[digit].front();
            queues[digit].dequeue();
        }
    }
}

distribution( nums , queues , 10 , 1 );
collect( queues , nums );
distribution( nums , queues , 10 , 10 );
collect( queues , nums );


console.info(nums);