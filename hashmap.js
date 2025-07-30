class HashMap {
    constructor(capacity, loadFactor) {
        this.capacity = capacity;
        this.loadFactor = loadFactor;
        this.buckets = new Array(16);
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
        let hashCode= hash(key);
        
        //Key is already stored : we update the value
        if (this.buckets[hashCode].key === key) {
            this.buckets[hashCode].value = value;
        }

        //Key doesn't exist : we store the key value pair
        if (this.buckets[hashCode] == null) {
            this.buckets.key = key;
            this.buckets[hashCode].value = value;
            //TODO : check if array exceeds the load factor and resize if it's the case
        }

        //hashcode is taken but key is different : we reate a new node
        if (this.buckets[hashCode].key !== key) {
            //Create node
        }
    }

}