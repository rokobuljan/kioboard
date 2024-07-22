// @ts-check

/**
 * Emitter
 * @author Roko C. Buljan
 */
class Emitter {

    /**
     * Create new Emitter
     */
    constructor() {
        this.events = new Map();
    }

    /**
     * Register an event
     * @param {string} ev
     * @param {Function} cb
     * @returns {Emitter}
     */
    on(ev, cb) {
        if (!this.events.has(ev)) this.empty(ev);
        this.events.get(ev)?.add(cb);
        return this;
    }

    /**
     * Register an event that will be triggered only once
     * @param {string} ev
     * @param {Function} cb
     * @returns {Emitter}
     */
    once(ev, cb) {
        const fn = (...args) => {
            cb(...args);
            this.off(ev, fn);
        };
        this.on(ev, fn);
        return this;
    }

    /**
     * Unregister an event
     * @param {string} ev
     * @param {Function=} cb
     * @returns {Emitter}
     */
    off(ev, cb) {
        if (!this.events.has(ev)) {
            return this;
        }
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

    /**
     * Remove all callbacks for event name
     * @param {string} ev
     * @returns {Emitter}
     */
    empty(ev) {
        this.events.set(ev, new Set());
        return this;
    }

    /**
     * Trigger events
     * @param {...string} evts
     * @returns {Emitter}
     */
    emit(...evts) {
        evts.forEach(ev => {
            if (!this.events.has(ev)) return;
            this.events.get(ev).forEach((cb) => {
                cb(ev);
            });
        });
        return this;
    }

    /**
     * Get all events
     * @returns {Map<string, Set<Function>>}
     */
    get() {
        return this.events;
    }
}

export default Emitter;