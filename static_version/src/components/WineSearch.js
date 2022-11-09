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
            searchObj: {type: Object}
        }
    };

    constructor() {
        super();
        this.isLoading = true;
        WineBiblio.srv.get('Queue').handle(DefaultEvents.ID.LOADING_APP, true, undefined).subscribe(msg => {
            this.isLoading = false;
        });
        this.translate = WineBiblio.srv.get('Translate').getTranslate();
    }

    render() {
        return html`
            ${this.isLoading?'':html`
                <div class="navbar-nav">
                    <div class="nav-item text-nowrap">
                        <a class="nav-link px-3" href="#">
                            <i class="bi-search" class="align-text-bottom" style="font-size: 1.5em; line-height: 1.3em; vertical-align: middle;"></i>
                            &nbsp;${this.translate('advanced-search')}&nbsp;
                        </a>
                    </div>
                    <app-language></app-language>
                </div>
            `}
        `;
    }
}
customElements.define('wine-search', WineSearch);
