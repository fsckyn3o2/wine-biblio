import DefaultEvents from "../DefaultEvents.js";

export default class SearchService {

    criteria = {};

    constructor() {
    }

    getServiceName() {
        return 'Search';
    }

    handleSearch(srvManager) {
        srvManager.get('Queue').handle(DefaultEvents.ID.LOADING_SEARCH, undefined, undefined).subscribe(this.search)
    }

    search(input) {
        this.criteria = {...this.criteria, ...input.content};
        const dataSrv = WineBiblio.srv.get('Data');
        dataSrv.data.next(
            dataSrv._dataOrig.getValue()
            .filter(item => !this.criteria?.name || item.n.toLocaleLowerCase().includes(this.criteria.name.toLocaleLowerCase()))
            .filter(item => !this.criteria?.country || item.c.toLocaleLowerCase().includes(this.criteria.country.toLocaleLowerCase()))
            .filter(item => !this.criteria?.year || item.y === this.criteria.year)
            .filter(item => !this.criteria?.type || item.t.toLocaleLowerCase().includes(this.criteria.type.toLocaleLowerCase()))
        );
        dataSrv.applyData();
    }
}
