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
            isDisplayed: {type: Boolean},
            criteria: {type: Object}
        }
    };

    constructor() {
        super();
        this.criteria = {};
        this.lookup = WineBiblio.srv.get('Translate').getLookup();
        this._translate = WineBiblio.srv.get('Translate').getTranslate();
        this.countries = WineBiblio.srv.get('Data').getCountries.bind(WineBiblio.srv.get('Data'));
        this.isDisplayed = false;

        WineBiblio.srv.get('Queue').handle(DefaultEvents.ID.LOADING_SEARCH_ADV, undefined, undefined)
            .subscribe(msg => {
                if(msg.content.toggle === true) {
                    this.isDisplayed = !this.isDisplayed;
                }
            });

        WineBiblio.srv.get('Queue').handle(DefaultEvents.ID.LOADING_SEARCH, undefined, undefined)
            .subscribe(msg => {
                if(msg.content.shortcut === true){
                    if(this.isDisplayed === true) {
                        this.isDisplayed = false;
                        this.criteria = {...this.criteria, ...msg.content};
                        delete (this.criteria.shortcut);
                        setTimeout(() => this.isDisplayed = true, 150);
                    } else {
                        this.criteria = {...this.criteria, ...msg.content};
                        delete (this.criteria.shortcut);
                    }
                }
            });
    }

    updateSearchCriteria(parameters) {
        this.criteria = {...this.criteria, ...parameters};
        WineBiblio.srv.get('Queue').pushMessage(DefaultEvents.ID.LOADING_SEARCH, parameters);
    }

    closeAdvSearch() {
        this.isDisplayed = false;
    }

    render() {
        return html`
            ${this.isDisplayed===true? html`
            <div class="wine-search-adv">
                <div class="wine-search-adv-item">
                    <label for="search-adv-type">${this._translate('fields.t')}</label>
                    <select id="search-adv-type" @change=${(e) => this.updateSearchCriteria({type: e.target.value}) } value=${this.criteria.type}>
                        <option value="">${this._translate('lookup.allNone.all')}</option>
                        ${this.lookup('t').map(([key, type]) =>  this.criteria.type === key ? html`<option value="${key}" selected="true">${type}</option>` : html`<option value="${key}">${type}</option>`) }
                    </select>
                </div>
                <div class="wine-search-adv-item">
                    <label for="search-adv-year">${this._translate('fields.y')}</label>
                    <input type="number" min="0" name="search-adv-year" 
                           @keydown=${ (e) => Utils.limitInputTextToNumber(e) ? true : e.preventDefault() }
                           @keyup=${ (e) => this.updateSearchCriteria({year: e.target.value}) } />
                </div>
                <div class="wine-search-adv-item">
                    <label for="search-adv-year">${this._translate('fields.c')}</label>
                    <select id="search-adv-country" @change=${(e) => this.updateSearchCriteria({country: e.target.value}) }>
                        <option value="">${this._translate('lookup.allNone.all')}</option>
                        ${this.countries().map(country => this.criteria.country === country ? html`<option value="${country}" selected="true">${country}</option>`: html`<option value="${country}">${country}</option>`)}
                    </select>
                </div>
                <div class="wine-search-adv-close" @click=${(e) => this.closeAdvSearch()}>
                    <i class="bi-x"></i>
                </div>
            </div>`:
            html``
        }
        `;
    }
}
customElements.define('wine-search-adv', WineSearchAdvanced);
