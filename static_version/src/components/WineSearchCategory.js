import {html, LitElement} from "lit";
import {WineSearchCategoryStyle} from "../styles/WineSearchCategoryStyle.js";
import DefaultEvents from "../DefaultEvents.js";

export class WineSearchCategory extends LitElement {

    static get styles() {
        return WineSearchCategoryStyle();
    }

    constructor() {
        super();
        this.wineDetails = WineBiblio.srv.get('WineDetails');
    }

    searchByCategory(parameter) {
        WineBiblio.srv.get('Queue').pushMessage(DefaultEvents.ID.LOADING_SEARCH, parameter);
    }

    render() {
        return html`
            <ul class="nav flex-column mb-2">
                <li class="nav-item">
                    <a class="nav-link" href="#" @click=${(e) => this.searchByCategory({type: 'rouge', shortcut: true})}>
                        <i class=${this.wineDetails.icon({t: 'rouge'})} class="align-text-bottom" style="font-size: 1.5em; line-height: 1.3em; vertical-align: middle;"></i>
                        Vin Rouge
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#" @click=${(e) => this.searchByCategory({type: 'blanc', shortcut: true})}>
                        <i class=${this.wineDetails.icon({t: 'blanc'})} class="align-text-bottom" style="font-size: 1.5em; line-height: 1.3em; vertical-align: middle;"></i>
                        Vin Blanc
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#" @click=${(e) => this.searchByCategory({type: 'rose', shortcut: true})}>
                        <i class=${this.wineDetails.icon({t: 'rose'})} class="align-text-bottom" style="font-size: 1.5em; line-height: 1.3em; vertical-align: middle;"></i>
                        Rosé
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#" @click=${(e) => this.searchByCategory({type: 'champagne', shortcut: true})}>
                        <i class=${this.wineDetails.icon({t: 'champagne'})} class="align-text-bottom" style="font-size: 1.5em; line-height: 1.3em; vertical-align: middle;"></i>
                        Champagne
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#" @click=${(e) => this.searchByCategory({type: 'mousseux', shortcut: true})}>
                        <i class=${this.wineDetails.icon({t: 'mousseux'})} class="align-text-bottom" style="font-size: 1.5em; line-height: 1.3em; vertical-align: middle;"></i>
                        Mousseux
                    </a>
                </li>
            </ul>
        `;
    }
}
customElements.define('wine-search-category', WineSearchCategory);
