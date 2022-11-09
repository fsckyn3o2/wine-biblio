
export default class ServiceManager {

    service = {};

    constructor() {
    }

    add(serviceInstance) {
        this.service[serviceInstance.getServiceName()] = serviceInstance;
    }

    get(name) {
        return this.service[name];
    }
}
