const Node = require('./node');

class MaxHeap {
    constructor() {
        this.root = null;
        this.parentNodes = [];
    }

    push(data, priority) {
        var node = new Node(data, priority);
        this.insertNode(node);
        this.shiftNodeUp(node);

        return node;
    }

    pop() {
        if (this.isEmpty()) return false;

        var root = this.detachRoot();
        var newRoot = this.restoreRootFromLastInsertedNode(root);
        this.shiftNodeDown(newRoot);
        return root.data;
    }

    detachRoot() {
        if (!this.root) return false;
        var root = this.root;

        if (this.size == 1) {
            this.parentNodes = [];
            //return null;
        }
        else {
            if (this.parentNodes[0] == this.root) {
                this.parentNodes.shift();
            }
        }
        this.root = null;
        return root;
    }

    restoreRootFromLastInsertedNode(detached) {
        if (!detached) return false;

        this.root = this.parentNodes[this.parentNodes.length - 1];
        if (this.root) {
            if (this.root.parent) {
                this.root.parent.left == this.root ? this.root.parent.left = null : this.root.parent.right = null
                if (this.parentNodes[0] !== this.root.parent) this.parentNodes.unshift(this.root.parent);
                this.root.parent = null;
            }

            this.parentNodes.pop();                             //array.prototype method
            if (detached.right && detached.right !== this.root) {  // если правый ребенок бывшего рута существует и
                this.root.right = detached.right;							// это не тот эл-т, кот. мы должны поставить на место рута
                detached.right.parent = this.root;
            }
            else {
                this.parentNodes.shift();        // добавляем в самое начало массива с возможными родителями новый рут.
                this.parentNodes.unshift(this.root);		// он точно должен быть в этом массиве, т.к. если сработал else, значит правого ребенка у него нет.

            }
            if (detached.left && detached.left !== this.root) {
                this.root.left = detached.left;
                detached.left.parent = this.root;
            }
        }
        return this.root;
    }


    size() {
        var length = 0;
        if (this.root) {
            length = this._sizeHeap(this.root) + 1;
        }
        return length;
    }

    _sizeHeap(node) {
        if (!node) return false;
        var length = 0;
        if (node) {
            if (node.left) {
                length += this._sizeHeap(node.left) + 1;
            }
            if (node.right) {
                length += this._sizeHeap(node.right) + 1;
            }
        }
        return length;
    }


    isEmpty() {
        return !!(this.root === null && this.parentNodes.length == 0);
    }

    clear() {
        this.root = null;
        this.parentNodes = [];
    }

    insertNode(node) {
        if (this.root === null) {
            this.root = node;
            this.parentNodes.push(node);
            //this.heap.push(node);
        }
        else {
            var firstParent = this.parentNodes[0];
            if (firstParent.right && firstParent.left) {    // если у первого возможного родителя есть оба ребенка,
                this.parentNodes.shift();   				// удаляем родителя из parentNode
                firstParent = this.parentNodes[0];
            }
            this.parentNodes.push(node);
            firstParent.appendChild(node);

            if (firstParent.right && firstParent.left) { 	//если последняя добавленная нода - второй ребенок
                this.parentNodes.shift();					//первого возможного родителя, удаляем его из массива
            }

        }
        return node;
    }


    shiftNodeUp(node) {
        if (node.parent === null || node.priority <= node.parent.priority) {
            if (node.parent === null) {
                this.root = node;
            }
            return false;
        }
        else {
            this._parentNodesInCorrectState(this.parentNodes, node, node.parent);
            return this.shiftNodeUp(node.swapWithParent());
        }
    }

    _parentNodesInCorrectState(arr, node, nodeChange) {
        if (arr.indexOf(node) !== -1 && arr.indexOf(nodeChange) !== -1) {   // если в parentNodes есть и сама нода и та, с которой ее нужно поменять,
            var temp = arr[arr.indexOf(node)];								// меняем их местами
            arr[arr.indexOf(node)] = arr[arr.indexOf(nodeChange)];
            arr[arr.indexOf(nodeChange)] = temp;
        }
        if (arr.indexOf(node) !== -1 && arr.indexOf(nodeChange) === -1) {  // если в parentNodes заменяемой ноды нет, а нода
            arr[arr.indexOf(node)] = nodeChange;							// была, записываем на ее место заменяемой
        }
        return arr;
    }

    shiftNodeDown(node) {
        if (!node) return false;
        if (node.left || node.right) {
            var leftFlag = true;
            if (node.left && node.right) {
                if (node.left.priority < node.right.priority) {
                    leftFlag = false;
                }
            }
            if (node.left && node.left.priority > node.priority && leftFlag) {
                if (node.parent === null) {
                    this.root = node.left;
                }
                this._parentNodesInCorrectState(this.parentNodes, node.left, node);
                node.left.swapWithParent();
                return this.shiftNodeDown(node);

            }
            if (node.right && node.right.priority > node.priority) {
                if (node.parent === null) {
                    this.root = node.right;
                }
                this._parentNodesInCorrectState(this.parentNodes, node.right, node);
                node.right.swapWithParent();
                return this.shiftNodeDown(node);
            }
        }
        return false;
    }
}

module.exports = MaxHeap;
