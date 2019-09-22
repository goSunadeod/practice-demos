var dataStore = [ 72 , 1 , 68 , 95 , 75 , 54 , 58 , 10 , 35 , 6 , 28 , 45 , 69 , 13 , 88 , 99 , 24 , 28 , 30 , 31 , 78 , 2 , 77 , 82 , 72 ];

//冒泡排序 排序很慢
function bubbleSort(data) {
    for (let i = data.length; i > 0; i--) {
        for(let j = 0; j< i-1; j++) {
            if (data[j] > data[j+1]) {
                [data[j], data[j+1]] = [data[j+1], data[j]]
            }
        }
    }
    return data;
}

// console.log( '原始数据:' + dataStore );
// console.log( '冒泡排序:' + bubbleSort( dataStore) );
    


    //选择排序
function selectionSort(data) {
    for(let i = 0; i< data.length; i++) {
        let min = data[i];
        let index = i;
        for (let j = i+ 1; j< data.length; j++) {
            if (data[j] < min) {
                min = data[j]
                index = j
            }
        }
        [data[i], data[index]] = [data[index], data[i]]
    }
    return data
}

// console.log( '原始数据:' + dataStore );
// console.log( '选择排序:' + selectionSort( dataStore) );


// 插入排序
function insertionSort(data) {
    let len = data.length;
    for(let i = 1; i< data.length; i++) {
        let key = data[i];
        let j = i-1;
        while (j >= 0 && data[j] > key) {
            data[j+1] = data[j]
            j--
        }
        data[j+1] = key
    }
    return data;
}


// console.log( '原始数据:' + dataStore );
// console.log( '插入排序:' + insertionSort( dataStore) );



// 高级排序
// 希尔排序 （远距离的插入排序）

function shallSort(array) {
    var increment = array.length;
    var temp; //暂存
    do {
        //设置增量
        increment = Math.floor(increment / 3) + 1;
        for (let i = increment ; i < array.length; i++) {
            if ( array[i] < array[i - increment]) {
                temp = array[i];
                for (var j = i - increment; j >= 0 && temp < array[j]; j -= increment) {
                    array[j + increment] = array[j];
                }
                array[j + increment] = temp;
            }
        }
    }
    while (increment > 1)

    return array;
}

// console.log( '原始数据:' + dataStore );
// console.log( '希尔排序:' + shallSort( dataStore) );




// 归并排序
// 一半一半排排排
function mergeSort ( array ) {
    var len = array.length;
    if( len < 2 ){
        return array;
    }
    var middle = Math.floor(len / 2),
        left = array.slice(0, middle),
        right = array.slice(middle);
    return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right)
{
    var result = [];
    while (left.length && right.length) {
        if (left[0] <= right[0]) {
            result.push(left.shift());
        } else {
            result.push(right.shift());
        }
    }
    while (left.length)
        result.push(left.shift());
    while (right.length)
        result.push(right.shift());
    return result;
}


// console.log( '原始数据:' + dataStore );
// console.log( '归并排序:' + mergeSort( dataStore) );


// 快速排序 找一个基数 左右排
function quickSort(arr) {
    if (arr.length === 0) {
        return [];
    }
    let left = [];
    let right = [];
    let privot = arr[0]; // 这里以第一个数为基数
    for(let i = 1; i< arr.length; i++) {
        if (arr[i] < privot) {
            left.push(arr[i]);
        } else {
            right.push(arr[i])
        }
    }
    return [...quickSort(left), privot, ...quickSort(right)]
}


console.log( '原始数据:' + dataStore );
console.log( '快速排序:' + quickSort( dataStore) );






