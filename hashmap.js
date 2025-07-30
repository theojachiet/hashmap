import { LinkedList } from "./linkedlist.js";

export class HashMap {
    constructor(capacity, loadFactor) {
        this.capacity = capacity;
        this.loadFactor = loadFactor;
        this.buckets = new Array(16);
        this.length = 0;
    }

    hash(key) {
        let hashCode = 0;

        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
        }

        return hashCode;
    }

    set(key, value) {
        let hashCode = this.hash(key);

        //Key doesn't exist : we store the key value pair
        if (this.buckets[hashCode] == null) {
            this.buckets[hashCode] = new LinkedList();
            this.buckets[hashCode].append([key, value]);
            this.length++;
            //TODO : check if array exceeds the load factor and resize if it's the case
        } else {
            //Key is already stored : we update the value
            if (this.buckets[hashCode].contains(key)) {
                let index = this.buckets[hashCode].find(key);
                this.buckets[hashCode].at(index).value[1] = value;
            } else {
                //hashcode is taken but key is different : we create a new node
                this.buckets[hashCode].append([key, value]);
                this.length++;
            }
        }
    }

    get(key) {
        let hashCode = this.hash(key);
        if (!this.buckets[hashCode].contains(key)) return null;

        let index = this.buckets[hashCode].find(key);
        return this.buckets[hashCode].at(index).value[1];
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
        this.length--;
        return true;
    }

    length() {
        //Maybe i should implement a real way to calculate this but for now i find this pretty good actually
        return this.length;
    }

    clear() {
        this.buckets = new Array(16); //TODO : does this reset all the indexes ?
        this.length = 0;
    }

    keys() {
        let keys = [];
        for (let bucket of buckets) {
            if (!bucket) continue;
            for (let i = 0; i < bucket.size(); i++) {
                let key = bucket.at(i).value[0];
                keys.push(key);
            }
        }
        return keys;
    }

    values() {
        let values = [];
        for (let bucket of buckets) {
            if (!bucket) continue;
            for (let i = 0; i < bucket.size(); i++) {
                let value = bucket.at(i).value[1];
                values.push(value);
            }
        }
        return values;
    }

    entries() {
        let entries = [];
        for (let bucket of buckets) {
            if (!bucket) continue;
            for (let i = 0; i < bucket.size(); i++) {
                let key = bucket.at(i).value[0];
                let value = bucket.at(i).value[1];
                entries.push([key, value]);
            }
        }
        return entries;
    }

}