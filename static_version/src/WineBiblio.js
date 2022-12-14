import ServiceManager from './ServiceManager.js'
import DataService from "./services/DataService.js";
import SearchService from "./services/SearchService.js";
import QueueService from "./services/QueueService.js";
import TranslateService from "./services/TranslateService.js";
import {merge, takeLast} from "rxjs";
import DefaultEvents from "./DefaultEvents.js";
import WineDetailsService from "./services/WineDetailsService.js";
import CookieService from "./services/CookieService.js";
import ResizeObserverService from "./services/ResizeObserverService.js";

export class WineBiblio {

    srv = new ServiceManager();

    constructor() {
        console.info('Wine-Biblio Version : 0.0.0a');
        const cookieService = new CookieService();
        this.srv.add(cookieService);

        const dataService = new DataService();
        this.srv.add(dataService);

        const searchService = new SearchService()
        this.srv.add(searchService);

        const translateService = new TranslateService()
        this.srv.add(translateService);

        const queueService = new QueueService({
            debug: true
        });
        this.srv.add(queueService);

        const wineDetailsService = new WineDetailsService();
        this.srv.add(wineDetailsService);

        const screenResizeObserver = new ResizeObserverService();
        this.srv.add(screenResizeObserver);

        searchService.handleSearch(this.srv);
    }

    init() {

        console.info('Wine-Biblio : load data');

        // Detect mini width on body 800px and push messages.
        this.srv.get('ScreenResizeObserver').init([800],undefined,undefined,undefined);

        // Push event loading application.
        this.srv.get('Queue').pushMessage(DefaultEvents.ID.LOADING_APP, {...DefaultEvents.CONTENT, processing: true});

        const subscription = merge(
           this.srv.get('Data').loadData('assets/data.dt'),
           this.srv.get('Translate').parseFile('en', 'assets/i18n_en.json'),
           this.srv.get('Translate').parseFile('fr', 'assets/i18n_fr.json')
        ).pipe(takeLast(1)).subscribe(t =>
            this.srv.get('Queue').pushMessage(DefaultEvents.ID.LOADING_APP, {...DefaultEvents.CONTENT, finished: true})
        );
    }
}

globalThis.WineBiblio = new WineBiblio();
globalThis.WineBiblio.init();
