class Node {
    constructor(data, priority) {
        this.data = data;
        this.priority = priority;
        this.parent = null;
        this.left = null;
        this.right = null;
    }

    appendChild(node) {
        if (this.left === null) {
            this.left = node;
            node.parent = this;
        }
        else if (this.right === null) {
            this.right = node;
            node.parent = this;
        }
        else {
            return false;
        }
        return node;
    }

    removeChild(node) {
        if (this.left === node) {
            node.parent = null;
            this.left = null;
        }
        else if (this.right === node) {
            node.parent = null;
            this.right = null;
        }
        else {
            throw "Error";
        }
        return node;
    }

    remove() {
        if (this.parent === null) {
            return false;
        }
        this.parent.removeChild(this);
        return this;
    }


    swapWithParent() {
        if (this.parent === null) {
            return false;
        }

        var node = this;
        var par = this.parent;

        if (par.parent !== null) {
            node.parent = par.parent;
            (par.parent.left == par) ? par.parent.left = node : par.parent.right = node;
        }
        else {
            node.parent = null;
        }

        par.parent = node;

        if (par.right !== null && par.left !== null) {                 //если есть и правый, и левый ребенок у родителя
            if (par.left == node) {
                var rSibling = par.right;
                rSibling.parent = node;
            }
            else {
                var lSibling = par.left;
                lSibling.parent = node;
            }
        }

        if (node.left !== null) {                 //если есть левый ребенок у ноды
            var nodeL = node.left;
            par.left = nodeL;
            nodeL.parent = par;
        }
        else {
            par.left = null;
        }


        if (node.right !== null) {                  //если есть правый ребенок у ноды
            var nodeR = node.right;
            nodeR.parent = par;
            par.right = nodeR;
        }
        else {
            par.right = null;
        }

        if (rSibling || lSibling) {
            if (rSibling) {
                node.right = rSibling;
                node.left = par;
            }
            else {
                node.left = lSibling;
                node.right = par;
            }
        }
        else {
            node.left = par;
        }

        return node;
    }
}

module.exports = Node;
