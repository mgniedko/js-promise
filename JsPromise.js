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
    #onSuccessBind = this.#onSuccess.bind(this);
    #onFailBind = this.#onFail.bind(this);

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

    then(onSuccess, onReject) {
        return new MyPromise((resolve, reject) => {
            if (onSuccess) {
                this.#thenCbs.push(result => {
                    if (!onSuccess) {
                        resolve(result);
                        return;
                    }

                    try {
                        resolve(onSuccess(result));
                    } catch (error) {
                        reject(error);
                    }
                });

                this.#catchCbs.push(result => {
                    if (!onReject) {
                        reject(result);
                        return;
                    }

                    try {
                        resolve(onReject(result));
                    } catch (error) {
                        reject(error);
                    }
                });


            }

            if (onSuccess) {
                this.#thenCbs.push(cb);
            }

            if (onReject) {
                this.#catchCbs.push(cb);
            }


            this.#runCallbacks();
        });
    }

    catch(cb) {
        this.then(undefined, cb);
    }
}

module.exports = MyPromise;

// new Promise((resolve, reject) => {
//
// });

const p = new Promise(res, err).then()