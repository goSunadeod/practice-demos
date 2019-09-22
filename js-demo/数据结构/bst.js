function Node(data, left, right) {
 this.data = data; // 数据
 this.left = left;  // 左节点
 this.right = right;  // 右节点
 this.show = show;
}

function show() {
 return this.data;
}

//二叉查找树（BST）的类

function BST(){
    this.root = null;           // 根节点
    this.insert = insert;       // 插入节点
     this.preOrder = preOrder;   // 先序遍历
    this.inOrder = inOrder;     // 中序遍历
    this.postOrder = postOrder; // 后序遍历
    this.find = find;           // 查找节点
    this.getMin = getMin;       // 查找最小值
    this.getMax = getMax;       // 查找最大值
    this.remove = remove;       // 删除节点
}


function insert(data) {
    let n = new Node(data, null, null);
    if (this.root == null) {
        this.root = n;
    } else {
        let current = this.root;
        let parent;
        while(true) {
            parent = current;
            if (data < current.data) {
            current = current.left;
            if (current === null) {
                parent.left = n;
                break;
            }
           } else {
             current = current.right;
            if (current === null) {
                parent.right = n;
                break;
            }
           }
        }
    }
}


// 中序遍历
 //  3 16 22 23 37 45 99 左根右
function inOrder (node) {
    // console.log(node ? node.data + '  ===' : null + '');
    if( node != null ){
        inOrder( node.left );
        console.debug( node.show() + ' ');
        inOrder( node.right );
    }
}


// 先序遍历
// 23 16 3 22 45 37 99. 根左右
function preOrder (node) {
    if( node != null ){
        console.debug( node.show() + ' ');
        preOrder( node.left );
        preOrder( node.right );
    }
}

// 后序遍历
// 3 22 16 37 99 45 23   左右根
function postOrder (node) {
 if( node != null ){
        postOrder( node.left );
        postOrder( node.right );
        console.debug( node.show() + ' ');
    }
}



function getMin() {
    var current = this.root;
    while ( !( current.left == null ) ){
        current = current.left;
    }
    return current.show();
}

function getMax() {
    var current = this.root;
    while ( !( current.right == null ) ) {
        current = current.right;
    }
    return current.show();
}


function find(data) {
    var current = this.root;
    while(current != null) {
        if (current.data === data) {
            return current;
        } else if( current.data < data ) {
            current = current.right;
        } else {
            current = current.left;
        }
    }
    return null;
}


/* 
1 是叶子节点
2 只有左子树或右子树
2 都包含，则使用该节点下的左子树的最大值或者右子树的最小值替换再将其值删除
*/

//查找最小值 这里去解决第三种情况采取查找右子树最小值替代
function getSmallest(node) {
    if (node.left == null) {
        return node;
    }
    else {
        return getSmallest(node.left);
    }
}

function remove(data) {
    removeNode(this.root, data);
}

/* 
首先判断当前节点是否包含待删除的数据，如果包含，则删除该节点；如果不包含，则比较当前节点上的数据和待删除树的的大小关系。如果待删除的数据小于当前节点的数据，则移至当前节点的左子节点继续比较；如果大于，则移至当前节点的右子节点继续比较。
*/
function removeNode(node, data) {
    if (node === null) {
        return null;
    }
    if (data === node.data) {
        // 叶子节点
        if(node.left === null && node.right === null) {
            return null
        }
        // 没有左子节点的节点
        if(node.left == null) {
            return node.right;
        }
        // 没有右子节点的节点
        if(node.right == null) {
            return node.left;
        }

        // 第三种情况
        let tempNode = getSmallest(node.right);
        node.data = tempNode.data; // 替换
        node.right = removeNode(node.right,tempNode.data);
        return node;
    } else if(data < node.data) {
        node.left = removeNode(node.left, data);
        return node;
    } else {
        node.right = removeNode(node.right, data);
        return node;
    }
}


var nums = new BST();

nums.insert(23);
nums.insert(45);
nums.insert(16);
nums.insert(37);
nums.insert(3);
nums.insert(20);
nums.insert(14);
nums.insert(15);
nums.insert(99);
nums.insert(22);

inOrder(nums.root); // 3 14 15 16 20 22 23 37 45 99

nums.remove(16);

inOrder(nums.root); // 3 14 15 20 22 23 37 45 99