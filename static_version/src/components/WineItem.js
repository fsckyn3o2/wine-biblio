import {LitElement, html} from 'lit';
import {WineItemStyle} from "../styles/WineItemStyle.js";

export class WineItem extends LitElement {

    static get styles() {
        return WineItemStyle();
    }

    static get properties() {
        return {
            wineObj: {type: Object}
        }
    };

    constructor() {
        super();
        this._translate = WineBiblio.srv.get('Translate').getTranslate();
        this.wineDetails = WineBiblio.srv.get('WineDetails');
    }

    render() {
        return html`
            <div class="wine-item">
                <div class="wine-item-header">
                    <div class="wine-item-title">
                        <span class="${this.wineDetails.icon(this.wineObj)}">&nbsp;</span> ${this.wineObj.n} ${this.wineObj.y?'-':''} ${this.wineObj.y}
                    </div>
                    <div class="wine-item-actions">
                        
                    </div>
                </div>
                <div class="wine-item-details">
                    <div class="wine-item-property">
                        <div class="wine-item-property-label">${this._translate('fields.c')}</div>
                        <div class="wine-item-property-value">${this.wineObj.c}</div>
                    </div>
                    <div class="wine-item-property">
                        <div class="wine-item-property-label">${this._translate('fields.t')}</div>
                        <div class="wine-item-property-value">${this._translate('lookup.t.' + this.wineObj.t)}</div>
                    </div>
                    <div class="wine-item-property">
                        <div class="wine-item-property-label">${this._translate('fields.r')}</div>
                        <div class="wine-item-property-value">${this.wineObj.r}</div>
                    </div>
                    <div class="wine-item-property">
                        <div class="wine-item-property-label">${this._translate('fields.y')}</div>
                        <div class="wine-item-property-value">${this.wineObj.y}</div>
                    </div>
                    <div class="wine-item-property">
                        <div class="wine-item-property-label">${this._translate('fields.p')}</div>
                        <div class="wine-item-property-value">${this.wineObj.p} ${this.wineObj.m.toUpperCase()}</div>
                    </div>
                </div>
                <div class="wine-item-footer">
                </div>
            </div>
        `;
    }
}
customElements.define('wine-item', WineItem);
