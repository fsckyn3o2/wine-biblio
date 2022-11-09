import {catchError, map} from "rxjs";
import {ajax} from "rxjs/ajax";

export default class TranslateService {

    data = {en: {}, fr: {}};
    language = 'en';

    constructor() {}

    getServiceName() {
        return 'Translate';
    }

    setLanguage(lg) {
        this.language = lg;
        WineBiblio.srv.get('Cookie').setCookie('language', lg);
    }

    getLanguage() {
        return this.language;
    }

    parseFile(language, fileUrl) {
        console.info(`TranslateService : parseFile - ${language} - ${fileUrl}`);

        this.language = WineBiblio.srv.get('Cookie').getCookie('language', 'en');

        return ajax.getJSON(fileUrl).pipe(
            map(res => {
                this.data[language] = res;
            }),
            catchError(err => console.error(err))
        )
    }

    translate(path) {
        let res = this.data[this.language];
        const keys = path.split('.'); let i = 0;
        while(res[keys[i]] !== undefined && i < keys.length) {
           res = res[keys[i]];
           i++;
        }
        return res;
    }

    translationData() {
        return this.data;
    }

    getTranslate() {
        return this.translate.bind(this);
    }
}
