import {LitElement, html} from 'lit';
import {WineViewModeStyle} from "../styles/WineViewModeStyle.js";
import DefaultEvents from "../DefaultEvents.js";

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

    updateViewMode(type) {
        WineBiblio.srv.get('Queue').pushMessage(DefaultEvents.ID.VIEW_MODE, {value: type});
    }

    render() {
        return html`
            <div class="wine-viewmode">
                <div class="wine-viewmode-cardlist" @click=${() => this.updateViewMode('list')}>
                    <i class="bi-card-list"></i>
                </div>
                <div class="wine-viewmode-grid" @click=${() => this.updateViewMode('grid')}>
                    <i class="bi-grid-3x2-gap"></i>
                </div>
                <div class="wine-viewmode-image" @click=${() => this.updateViewMode('image')}>
                    <i class="bi-card-image"></i>
                </div>
            </div>
        `;
    }
}
customElements.define('wine-view-mode', WineViewMode);
