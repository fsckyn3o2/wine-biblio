import DefaultEvents from "../DefaultEvents.js";

export default class SearchService {

    constructor() {

    }

    getServiceName() {
        return 'Search';
    }

    handleSearch(srvManager) {
        srvManager.get('Queue').handle(DefaultEvents.ID.LOADING_SEARCH, undefined, undefined).subscribe(this.search)
    }

    search(input) {
        const dataSrv = WineBiblio.srv.get('Data');
        dataSrv.data.next(
            dataSrv._dataOrig.getValue()
            .filter(item => input.text === '' || item.n.toLocaleLowerCase().includes(input.content.text.toLocaleLowerCase()))
        );
        dataSrv.applyData();
    }
}
