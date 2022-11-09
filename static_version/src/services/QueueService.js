import {filter, Subject} from "rxjs";

export default class QueueService {

    debugMode = false;
    queue = new Subject();

    constructor(config) {
        this.debugMode = config.debug;
    }

    getServiceName() {
        return 'Queue';
    }

    pushMessage(id, content) {
        if(this.debugMode) console.debug(`QueueService : pushMessage '${id}', ${JSON.stringify(content)}`);
        this.queue.next({id: id, content: content});
    }

    handle(id, finished = undefined, processing = undefined) {
        return this.queue.pipe(
            filter(msg => msg.id === id && (finished === undefined || msg.content.finished === finished) && (processing === undefined || msg.content.processing === processing) ),
        );
    }
}
