/**
 * Emitter
 * @author Roko C. Buljan
 */
class Emitter {

    constructor() {
        this.events = new Map();
    }

    on(ev, cb) {
        if (!this.events.has(ev)) this.empty(ev);
        this.events.get(ev).add(cb);
        return this;
    }

    once(ev, cb) {
        const fn = (...args) => {
            cb(...args);
            this.off(ev, fn);
        };
        this.on(ev, fn);
        return this;
    }

    off(ev, cb) {
        if (!this.events.has(ev)) return;
        if (cb) {
            this.events.get(ev).delete(cb);
        } else {
            this.empty(ev);
        }
        if (this.events.get(ev).size === 0) {
            this.events.delete(ev);
        }
        return this
    }

    empty(ev) {
        this.events.set(ev, new Set());
        return this;
    }

    emit(...evts) {
        evts.forEach(ev => {
            if (!this.events.has(ev)) return;
            this.events.get(ev).forEach((cb) => {
                cb(ev);
            });
        });
        return this;
    }

    get() {
        return this.events;
    }
}

export default Emitter;