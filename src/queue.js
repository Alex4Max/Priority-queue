const MaxHeap = require('./max-heap.js');

class PriorityQueue {
    constructor(maxSize) {
        this.maxSize = maxSize || 30;
        this.heap = new MaxHeap();
    }

    push(data, priority) {
        if (this.heap.size() < this.maxSize) {
            this.heap.push(data, priority);
        }
        else throw 'Error';
    }

    shift() {
        if (this.isEmpty()) throw 'Error';
        var data = this.heap.pop();
        return data;

    }

    size() {
        return this.heap.size();
    }

    isEmpty() {
        return (this.heap.size() == 0);
    }
}

module.exports = PriorityQueue;
