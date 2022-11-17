import {html, LitElement} from "lit";
import {WineSearchAdvancedStyle} from "../styles/WineSearchAdvancedStyle.js";
import DefaultEvents from "../DefaultEvents.js";
import {Utils} from "../Utils.js";

export class WineSearchAdvanced extends LitElement {

    static get styles() {
        return WineSearchAdvancedStyle();
    }

    static get properties() {
        return {
            isLoading: {type: Boolean},
            searchObj: {type: Object},
            searchInput: {type: String},
            isDisplayed: {type: Boolean}
        }
    };

    constructor() {
        super();
        this.lookup = WineBiblio.srv.get('Translate').getLookup();
        this.translate = WineBiblio.srv.get('Translate').getTranslate();
        this.countries = WineBiblio.srv.get('Data').getCountries.bind(WineBiblio.srv.get('Data'));
        this.isDisplayed = false;
        WineBiblio.srv.get('Queue').handle(DefaultEvents.ID.LOADING_SEARCH_ADV, undefined, undefined)
            .subscribe(msg => {
                if(msg.content.toggle === true) {
                    this.isDisplayed = !this.isDisplayed;
                }
            });

    }

    render() {
        return html`
            ${this.isDisplayed===true? html`
            <div class="wine-search-adv">
                <div class="wine-search-adv-item">
                    <label for="search-adv-type">${this.translate('fields.t')}</label>
                    <select id="search-adv-type">
                        ${this.lookup('t').map(([key, type]) => html`<option value="${key}">${type}</option>`)}
                    </select>
                </div>
                <div class="wine-search-adv-item">
                    <label for="search-adv-year">${this.translate('fields.y')}</label>
                    <input type="number" min="0" name="search-adv-year" 
                           @keydown=${ (e) => Utils.limitInputTextToNumber(e) ? true : e.preventDefault() } />
                </div>
                <div class="wine-search-adv-item">
                    <label for="search-adv-year">${this.translate('fields.c')}</label>
                    <select id="search-adv-country">
                        ${this.countries().map(country => html`<option value="${country}">${country}</option>`)}
                    </select
                </div>
            </div>`:
            html``
        }
        `;
    }
}
customElements.define('wine-search-adv', WineSearchAdvanced);
