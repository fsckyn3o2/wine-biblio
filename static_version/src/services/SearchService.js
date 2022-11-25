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
        this.criteria = {...this.criteria, ...input};
        const dataSrv = WineBiblio.srv.get('Data');
        dataSrv.data.next(
            dataSrv._dataOrig.getValue()
            .filter(item => !this.criteria.content?.name || item.n.toLocaleLowerCase().includes(this.criteria.content.name.toLocaleLowerCase()))
            .filter(item => !this.criteria.content?.country || item.c.toLocaleLowerCase().includes(this.criteria.content.country.toLocaleLowerCase()))
            .filter(item => !this.criteria.content?.year || item.y === this.criteria.content.year)
            .filter(item => !this.criteria.content?.type || item.t.toLocaleLowerCase().includes(this.criteria.content.type.toLocaleLowerCase()))
        );
        dataSrv.applyData();
    }
}
