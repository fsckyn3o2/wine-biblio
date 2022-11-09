import {BehaviorSubject, catchError, map} from 'rxjs';
import {ajax} from 'rxjs/ajax';

export default class DataService {

    data = new BehaviorSubject([]);
    dataById = new BehaviorSubject([]);
    dataByType = new BehaviorSubject([]);
    dataByCountry = new BehaviorSubject([]);

    constructor() {

    }

    getServiceName() {
        return 'Data';
    }

    applyData() {
        const dataById = [];
        const dataByType = [];
        const dataByCountry = [];
        this.data.getValue().forEach(item => {
            dataById[item.id] = item;

            if(dataByType[item.t]) dataByType[item.t].push(item);
            else dataByType[item.t] = [item];

            if(dataByCountry[item.c]) dataByCountry[item.c].push(item)
            else dataByCountry[item.c] = [item];
        });

        this.dataById.next(dataById);
        this.dataByType.next(dataByType);
        this.dataByCountry.next(dataByCountry);
    }

    parseDataFile(body) {
        return body.replaceAll("\r\n", "\n").split("\n")
            .filter(line => line[0]==='[' && line[line.length-1]===']')
            .map(line => line.substring(1, line.length-1))
            .map(line => line.split(';').map(keyValue => keyValue.split('=')).reduce((p, pair, index, initialValue) => {
                    if (index === 1) {
                        const cc = {};
                        cc[p[0]] = p[1];
                        p = cc;
                    }
                    p[pair[0]] = pair[1];
                    return p;
                })
            );
    }

    sortDataBy(field, sorting) {
        const dataValue = this.data.getValue();
        if(sorting) dataValue.sort((a,b) => a[field]?a[field].localeCompare(b[field]):0);
        else dataValue.sort((b,a) => a[field]?a[field].localeCompare(b[field]):0);
        this.data.next(dataValue);
    }

    loadData(dataUrl) {
        return ajax({
            method: 'GET',
            url: dataUrl,
            responseType: 'text'
        }).pipe(
            map(res => {
                console.info(`data service - data loaded content size(${res.loaded} bytes)`)
                this.data.next(this.parseDataFile(res.response));
                this.applyData();
                console.info(`data service - data loaded current row count(${this.data.getValue().length})`);
            }),
          catchError(err => console.error(err))
        )
    }
}
