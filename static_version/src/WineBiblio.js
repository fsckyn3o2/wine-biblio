import ServiceManager from './ServiceManager.js'
import DataService from "./services/DataService.js";
import SearchService from "./services/SearchService.js";
import QueueService from "./services/QueueService.js";
import TranslateService from "./services/TranslateService.js";
import {merge, takeLast} from "rxjs";
import DefaultEvents from "./DefaultEvents.js";
import WineDetailsService from "./services/WineDetailsService.js";
import CookieService from "./services/CookieService.js";

export class WineBiblio {

    constructor() {
        console.info('Wine-Biblio Version : 0.0.0a');
        this.srv = new ServiceManager();

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
    }

    init() {

        console.info('Wine-Biblio : load data');

        this.srv.get('Queue').pushMessage(DefaultEvents.ID.LOADING_APP, {...DefaultEvents.CONTENT, processing: true});
        const subscription = merge(
           this.srv.get('Data').loadData('http://localhost:8000/assets/data.dt'),
           this.srv.get('Translate').parseFile('en', 'http://localhost:8000/assets/i18n_en.json'),
           this.srv.get('Translate').parseFile('fr', 'http://localhost:8000/assets/i18n_fr.json')
        ).pipe(takeLast(1)).subscribe(t =>
            this.srv.get('Queue').pushMessage(DefaultEvents.ID.LOADING_APP, {...DefaultEvents.CONTENT, finished: true})
        );
    }
}

globalThis.WineBiblio = new WineBiblio();
globalThis.WineBiblio.init();
