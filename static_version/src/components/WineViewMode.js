import {LitElement, html} from 'lit';
import {WineViewModeStyle} from "../styles/WineViewModeStyle.js";

export class WineViewMode extends LitElement {

    static get styles() {
        return WineViewModeStyle();
    }

    static get properties() {
        return {
            defaultViewMode: {type: String},
        };
    };

    constructor() {
        super();
        this._translate = WineBiblio.srv.get('Translate').getTranslate();
    }

    render() {
        return html`
            <div class="wine-viewmode">
                <div class="wine-viewmode-cardlist">
                    <i class="bi-card-list"></i>
                </div>
                <div class="wine-viewmode-grid">
                    <i class="bi-grid-3x2-gap"></i>
                </div>
                <div class="wine-viewmode-image">
                    <i class="bi-card-image"></i>
                </div>
            </div>
        `;
    }
}
customElements.define('wine-view-mode', WineViewMode);
