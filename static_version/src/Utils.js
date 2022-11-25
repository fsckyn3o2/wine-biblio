

export class Utils {

    static limitInputTextToNumber(e) {
        return (e.keyCode >= 48 && e.keyCode <= 57 || e.keyCode >= 96 && e.keyCode <= 105 ||
            e.keyCode === 46 || e.keyCode === 13 || e.keyCode === 9 || e.keyCode === 37 ||
            e.keyCode === 39 || e.keyCode === 20 || e.keyCode === 16 || e.keyCode === 8 );
    }
}
