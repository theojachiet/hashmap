import { LinkedList } from "./linkedlistSet.js";

export class HashSet {
    constructor(capacity = 17, loadFactor = 0.70) {
        this.capacity = capacity;
        this.loadFactor = loadFactor;
        this.buckets = new Array(capacity);
        this.currentLength = 0;
    }

    hash(key) {
        let hashCode = 0;

        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
        }

        return hashCode % this.capacity;
    }

    entries() {
        let entries = [];
        for (let bucket of this.buckets) {
            if (!bucket || bucket.head == null) continue;
            for (let i = 0; i < bucket.size(); i++) {
                let key = bucket.at(i).value;
                entries.push([key, this.hash(key)]);
            }
        }
        return entries;
    }

    set(key) {
        let hashCode = this.hash(key);

        //Key doesn't exist : we store the key
        if (this.buckets[hashCode] == null) {
            this.buckets[hashCode] = new LinkedList();
            this.buckets[hashCode].append(key);
            this.currentLength++;
            this.checkGrowth();
        } else {
            //Key is already stored : we do nothing
            if (this.buckets[hashCode].contains(key)) {
                return;
            } else {
                //hashcode is taken but key is different : we create a new node
                this.buckets[hashCode].append(key);
                this.currentLength++;
            }
        }
    }

    get(key) {
        let hashCode = this.hash(key);
        if (!this.buckets[hashCode].contains(key)) return null;

        let index = this.buckets[hashCode].find(key);
        return this.buckets[hashCode].at(index).value;
    }

    has(key) {
        let hashCode = this.hash(key);
        return this.buckets[hashCode].contains(key);
    }

    remove(key) {
        let hashCode = this.hash(key);
        if (!this.buckets[hashCode].contains(key)) return false;

        let index = this.buckets[hashCode].find(key);
        this.buckets[hashCode].removeAt(index);
        this.currentLength--;
        return true;
    }

    length() {
        return this.currentLength;
    }

    clear() {
        this.buckets = new Array(16);
        this.currentLength = 0;
    }

    keys() {
        let keys = [];
        for (let bucket of this.buckets) {
            if (!bucket || bucket.head == null) continue;
            for (let i = 0; i < bucket.size(); i++) {
                let key = bucket.at(i).value;
                keys.push(key);
            }
        }
        return keys;
    }

    checkGrowth() {
        let populatedIndexes = 0;
        for (let bucket of this.buckets) {
            if (bucket) {
                populatedIndexes++;
            }
        }

        let currentLoad = populatedIndexes / this.buckets.length;
        if (currentLoad >= this.loadFactor) {
            this.grow();
        }
    }

    grow() {
        let newArr = new Array(this.buckets.length * 2);

        //Storing the pairs in a temp Array and reassigning the buckets array;
        let entries = this.entries();
        this.buckets = newArr;

        //Re-populating the array
        for (let entry of entries) {
            this.set(entry[0], entry[1]);
        }

        this.capacity = this.buckets.length;
    }

}