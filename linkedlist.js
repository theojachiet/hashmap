export class LinkedList {
    constructor() {
        this.head = null;
    }

    prepend(value) {
        this.head = new Node(value, this.head);
    }

    append(value) {
        if (this.head == null)
            this.prepend(value);
        else {
            let temp = this.head;

            while (temp.nextNode != null) {
                temp = temp.nextNode;
            }

            temp.nextNode = new Node(value, null);
        }
    }

    size() {
        let count = 1;
        let temp = this.head;

        while (temp.nextNode != null) {
            temp = temp.nextNode;
            count++;
        }

        return count;
    }

    tail() {
        let temp = this.head;

        while (temp.nextNode != null) {
            temp = temp.nextNode;
        }

        return temp;
    }

    at(index) {
        if (index < 0) {
            throw new Error('you must enter a positive index');
        }

        let currentIndex = 0;
        let temp = this.head;

        while (temp.nextNode != null) {
            if (currentIndex === index) {
                return temp;
            }
            currentIndex++;
            temp = temp.nextNode;
        }

        if (currentIndex === index) return temp;

        return new Error('Index out of bounds');
    }

    pop() {
        let temp = this.head;
        let next = temp.nextNode;

        while (next.nextNode != null) {
            temp = next;
            next = next.nextNode;
        }

        //last node is not deleted but no reference is pointing to it anymore, the garbagecollector will get it.
        temp.nextNode = null;
    }

    contains(key) {
        let temp = this.head;

        while (temp.nextNode != null) {
            if (temp.value[0] === key) return true;
            temp = temp.nextNode;
        }

        return temp.value[0] === key;
    }

    find(key) {
        let temp = this.head;
        let currentIndex = 0;

        while (temp.nextNode != null) {
            if (temp.value[0] === key) return currentIndex;
            temp = temp.nextNode;
            currentIndex++;
        }

        if (temp.value[0] === key) return currentIndex;

        return null;
    }

    toString() {
        let temp = this.head;
        let str = '';

        while (temp.nextNode != null) {
            str += `(${temp.value}) -> `;
            temp = temp.nextNode;
        }

        str += `(${temp.value}) -> `;
        str += 'null';
        return str;
    }

    insertAt(value, index) {
        if (index < 0 || index > this.size()) throw new Error('Index out of bounds');
        //head and tail special cases handling
        if (index === 0) return this.prepend(value);
        if (index === this.size() - 1) return this.append(value);

        let temp = this.head;
        let currentIndex = 1;

        while (currentIndex !== index) {
            currentIndex++;
            temp = temp.nextNode;
        }

        let next = temp.nextNode;
        temp.nextNode = new Node(value, next);
    }

    removeAt(index) {
        if (index < 0 || index > this.size() - 1) throw new Error('Index out of bounds');
        if (index === this.size() - 1) return this.pop();

        let prev = this.head;
        let temp = prev.nextNode;
        
        if (index === 0) {
            this.head = this.head.nextNode;
            return;
        }

        let currentIndex = 1;

        while (currentIndex !== index) {
            currentIndex++;
            prev = prev.nextNode;
            temp = temp.nextNode;
        }

        let next = temp.nextNode;
        prev.nextNode = next;
    }
}

export class Node {
    constructor(value = null, nextNode = null) {
        this.value = value;
        this.nextNode = nextNode;
    }
}