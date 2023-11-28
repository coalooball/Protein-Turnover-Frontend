// event-bus.js
class EventBusClass {
    constructor() {
        this.events = {};
    }

    $on(event, callback) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(callback);
    }

    $emit(event, data) {
        const eventCallbacks = this.events[event];
        if (eventCallbacks) {
            eventCallbacks.forEach(callback => {
                callback(data);
            });
        }
    }

    $off(event, callback) {
        const eventCallbacks = this.events[event];
        if (eventCallbacks) {
            const index = eventCallbacks.indexOf(callback);
            if (index > -1) {
                eventCallbacks.splice(index, 1);
            }
        }
    }
}

export const EventBus = new EventBusClass();
