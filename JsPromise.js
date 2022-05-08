const STATE = {
    FULFILLED: 'fulfilled',
    REJECTED: 'rejected',
    PENDING: 'pending'
}

class MyPromise {
    #thenCbs = [];
    #catchCbs = [];
    #value;
    #state = STATE.PENDING;

    constructor(cb) {
        try {
            cb(this.#onSuccess, this.#onFail);
        } catch (e) {
            this.#onFail(e);
        }
    }

    #runCallbacks() {
        if (this.#state === STATE.FULFILLED) {
            this.#thenCbs.forEach(cb => {
                cb(this.#value);
            })
            this.#thenCbs = [];
        }

        if (this.#state === STATE.REJECTED) {
            this.#catchCbs.forEach(cb => {
                cb(this.#value);
            })
            this.#catchCbs = [];
        }
    }

    #onSuccess(value) {
        if (this.#state !== STATE.PENDING) {
            return;
        }
        this.#value = value;
        this.#state = STATE.FULFILLED;
        this.#runCallbacks();
    }

    #onFail(value) {
        if (this.#state !== STATE.PENDING) {
            return;
        }
        this.#value = value;
        this.#state = STATE.REJECTED;
        this.#runCallbacks();
    }

    then(cb) {
        this.#thenCbs.push(cb);

        this.#runCallbacks();
    }
}

module.exports = MyPromise;

// new Promise((resolve, reject) => {
//
// });

// new Promise(cb)