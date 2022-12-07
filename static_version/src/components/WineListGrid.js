import {LitElement, html} from 'lit';
import {WineList} from "./WineList.js";
import {WineListGridStyle} from "../styles/WineListGridStyle.js";

export class WineListGrid extends WineList {

    static get styles() {
        return WineListGridStyle();
    }

    render() {
        return html`
            <div class="winelist">
                <div class="winelist-sort-criteria">
                    <div class="winelist-sort 
                                ${this.sort === 'name-desc' ? 'winelist-sort-desc winelist-sort-active' :
                                this.sort === 'name-asc' ? 'winelist-sort-asc winelist-sort-active':''}"
                         @click=${(e) => this.sortBy('name')}><span>${this._translate('by')} </span> ${this._translate('fields.n')}</div>
                    <div class="winelist-sort
                                ${this.sort === 'type-desc' ? 'winelist-sort-desc winelist-sort-active' :
                                this.sort === 'type-asc' ? 'winelist-sort-asc winelist-sort-active':''}"
                         @click=${(e) => this.sortBy('type')}><span>${this._translate('by')} </span> ${this._translate('fields.t')}</div>
                    <div class="winelist-sort
                                ${this.sort === 'country-desc' ? 'winelist-sort-desc winelist-sort-active' :
                                this.sort === 'country-asc' ? 'winelist-sort-asc winelist-sort-active':''}"
                         @click=${(e) => this.sortBy('country')}><span>${this._translate('by')} </span> ${this._translate('fields.c')}</div>
                    <div class="winelist-sort
                                ${this.sort === 'region-desc' ? 'winelist-sort-desc winelist-sort-active' :
                                this.sort === 'region-asc' ? 'winelist-sort-asc winelist-sort-active':''}"
                         @click=${(e) => this.sortBy('region')}><span>${this._translate('by')} </span> ${this._translate('fields.r')}</div>
                    <div class="winelist-sort
                                ${this.sort === 'price-desc' ? 'winelist-sort-desc winelist-sort-active' :
                                this.sort === 'price-asc' ? 'winelist-sort-asc winelist-sort-active':''}"
                         @click=${(e) => this.sortBy('price')}><span>${this._translate('by')} </span> ${this._translate('fields.p')}</div>
                </div>
                <div class="wine-grid">
                    ${this.list.map((wineObj) => html`<wine-item .wineObj="${wineObj}"></wine-item>`)}
                </div>
            </div>
        `;
    }
}
customElements.define('wine-list-grid', WineListGrid);
