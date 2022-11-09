
export default class WineDetailsService {

    constructor() {
    }

    getServiceName() {
        return 'WineDetails';
    }

    icon(wineObj) {
        switch(wineObj.t) {
            case 'blanc':
            case 'white':
                return 'bi-circle';
            case 'rouge':
            case 'red':
                return 'bi-circle-fill';
            case 'rose':
                return 'bi-circle-half';
            case 'mousseux':
                return 'bi-star';
            case 'champagne':
                return 'bi-stars';
        }
    }
}
