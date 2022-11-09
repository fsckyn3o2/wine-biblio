import DataService from "./DataService.js";
import {httpServer} from "../../tests_utils/httpserver.js";

const dataServiceInstance = new DataService();

const dataContent = '[l=fr;id=201900001;t=rouge;n=duorum tons douro;y=2019;c=portugal;p=15.15;m=cad;ib=true]\n' +
    '[l=fr;id=202100001;t=rouge;n=Bodegas Aroa le Naturel Navarra;y=2021;c=espagne;r=vallée de l\'ebre;p=16.05;m=cad;ib=true]\n' +
    '[l=fr;id=202100002;t=rose;n=Le Pive Gris Sable de Camargue ;y=2021;c=france;r=languedoc;p=16.95;m=cad;ib=true]\n' +
    '[l=fr;id=000000001;t=mousseux;n=Hungaria Grande cuvée brut;c=hongrie;p=13.90;m=cad;ib=true]\n' +
    '[l=fr;id=000000004;t=blanc;n=Domaine La Hitaire Côtes de Gascogne Chardonnay;c=france;r=sud-ouest;p=12.30;m=cad;ib=true]';

const extractedContent = [
    { "c": "portugal", "ib": "true", "id": "201900001", "l": "fr", "m": "cad", "n": "duorum tons douro", "p": "15.15", "t": "rouge", "y": "2019" },
    { "c": "espagne", "ib": "true", "id": "202100001", "l": "fr", "m": "cad", "n": "Bodegas Aroa le Naturel Navarra", "p": "16.05", "r": "vallée de l'ebre", "t": "rouge", "y": "2021" },
    { "c": "france", "ib": "true", "id": "202100002", "l": "fr", "m": "cad", "n": "Le Pive Gris Sable de Camargue ", "p": "16.95", "r": "languedoc", "t": "rose", "y": "2021" },
    { "c": "hongrie", "ib": "true", "id": "000000001", "l": "fr", "m": "cad", "n": "Hungaria Grande cuvée brut", "p": "13.90", "t": "mousseux" },
    { "c": "france", "ib": "true", "id": "000000004", "l": "fr", "m": "cad", "n": "Domaine La Hitaire Côtes de Gascogne Chardonnay", "p": "12.30", "r": "sud-ouest", "t": "blanc" }
];

test('parseDataFile, data should be extracted rightly', () => {
    const extract = dataServiceInstance.parseDataFile(dataContent);
    expect(extract).toEqual(extractedContent);
});


test('applyData, data should be pushed by categories', () => {
    dataServiceInstance.data.next(dataServiceInstance.parseDataFile(dataContent));
    dataServiceInstance.applyData();

    extractedContent.forEach(record => {
        expect(record).toEqual(dataServiceInstance.dataById.getValue()[record.id]);
        expect(dataServiceInstance.dataByCountry.getValue()[record.c]).toEqual(expect.arrayContaining([record]));
        expect(dataServiceInstance.dataByType.getValue()[record.t]).toEqual(expect.arrayContaining([record]));
    });
});

test('loadData, data should be load with http request', () => {

    httpServer.startGetEndpoint('/assets/data.df', dataContent);
    dataServiceInstance.loadData('http://localhost:8089/asset/data.df').subscribe(z => {
        extractedContent.forEach(record => {
            expect(record).toEqual(dataServiceInstance.dataById.getValue()[record.id]);
            expect(dataServiceInstance.dataByCountry.getValue()[record.c]).toEqual(expect.arrayContaining([record]));
            expect(dataServiceInstance.dataByType.getValue()[record.t]).toEqual(expect.arrayContaining([record]));
        });
    });
    httpServer.endServer();
});
