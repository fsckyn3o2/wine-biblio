import {LitElement, html} from 'lit';
import {WineSearchStyle} from "../styles/WineSearchStyle.js";
import DefaultEvents from "../DefaultEvents.js";

export class WineSearch extends LitElement {

    static get styles() {
        return WineSearchStyle();
    }

    static get properties() {
        return {
            isLoading: {type: Boolean},
            searchObj: {type: Object},
            searchInput: {type: String}
        }
    };

    constructor() {
        super();
        this.isLoading = true;
        WineBiblio.srv.get('Queue').handle(DefaultEvents.ID.LOADING_APP, undefined, undefined).subscribe(msg => {
            this.isLoading = !msg.content.finished;
        });
        this.translate = WineBiblio.srv.get('Translate').getTranslate();
        this.searchInput = '';
    }

    get _input() {
        return (this.__input ??= this.renderRoot?.querySelector('input') ?? null);
    }

    search(e) {
        if(e && e.keyCode === 13 || undefined === e) {
            this.searchInput = this._input.value;
            WineBiblio.srv.get('Queue').pushMessage(DefaultEvents.ID.LOADING_SEARCH, {text: this.searchInput});
        }
    }

    render() {
        return html`
            ${this.isLoading?'':html`
                <div class="winesearch-large-input">
                    <input type="text" placeholder="${this.translate('search')}" 
                           aria-label="Recherche" 
                           @keydown=${(e) => this.search(e)}
                           value=${this.searchInput}
                    />
                </div>
                <div class="winesearch-bar-item">
                    <a class="nav-link px-3 winesearch-button" href="#">
                        <i class="bi-search" class="align-text-bottom" 
                           style="font-size: 1.5em; line-height: 1.3em; vertical-align: middle;"
                           @click=${(e) => this.search()}
                        ></i>
                    </a>
                </div>
                <div class="winesearch-bar-item">
                    <div class="winesearch-button nav-link">${this.translate('advanced-search')}</div>
                </div>
                <div class="winesearch-bar-item">
                    <app-language></app-language>
                </div>
            `}
        `;
    }
}
customElements.define('wine-search', WineSearch);
