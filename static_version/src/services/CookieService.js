

export default class CookieService {

    constructor() {
    }

    getServiceName() {
        return 'Cookie';
    }

    getCookie(cname, defaultValue) {
        const name = cname + "=";
        const decodedCookie = decodeURIComponent(document.cookie);
        const ca = decodedCookie.split(';');
        for(let i = 0; i <ca.length; i++) {
            let c = ca[i]; c = c.trimStart();
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return defaultValue;
    }

    setCookie(cname, value) {
        const d = new Date(); d.setTime(d.getTime() + (400*24*60*60*1000));
        document.cookie = cname + "=" + value + "; expires=" + d.toUTCString() + "; SameSite=None; Secure";
    }
}
