import {LitElement, html} from 'lit';
import {WineListStyle} from "../styles/WineListStyle.js";
import { eventOptions } from 'lit/decorators.js';

export class WineList extends LitElement {

    static get styles() {
        return WineListStyle();
    }

    static get properties() {
        return {
            list: {type: Object},
            sort: {type: String}
        };
    };

    constructor() {
        super();
        WineBiblio.srv.get('Data').data.subscribe(wineList => {
            this.list = wineList;
            this.requestUpdate('list');
        });
        this.list = WineBiblio.srv.get('Data').data.getValue();
        this.sort = 'name-desc';
    }

    sortBy(field) {
        switch(field) {
            case 'name':
                if(this.sort === 'name-desc') this.sort = 'name-asc';
                else this.sort = 'name-desc';
                WineBiblio.srv.get('Data').sortDataBy('n', this.sort === 'name-desc');
            break;
            case 'type':
                if(this.sort === 'type-desc') this.sort = 'type-asc';
                else this.sort = 'type-desc';
                WineBiblio.srv.get('Data').sortDataBy('t', this.sort === 'type-desc');
            break;
            case 'country':
                if(this.sort === 'country-desc') this.sort = 'country-asc';
                else this.sort = 'country-desc';
                WineBiblio.srv.get('Data').sortDataBy('c', this.sort === 'country-desc');
            break;
            case 'region':
                if(this.sort === 'region-desc') this.sort = 'region-asc';
                else this.sort = 'region-desc';
                WineBiblio.srv.get('Data').sortDataBy('r', this.sort === 'region-desc');
            break;
            case 'price':
                if(this.sort === 'price-desc') this.sort = 'price-asc';
                else this.sort = 'price-desc';
                WineBiblio.srv.get('Data').sortDataBy('p', this.sort === 'price-desc');
            break;
        }
        return false;
    }


    render() {
        return html`
            <div class="winelist">
                <div class="winelist-sort-criteria">
                    <div class="winelist-sort 
                                ${this.sort === 'name-desc' ? 'winelist-sort-desc winelist-sort-active' :
                                this.sort === 'name-asc' ? 'winelist-sort-asc winelist-sort-active':''}"
                         @click=${(e) => this.sortBy('name')}><span>by</span> Name</div>
                    <div class="winelist-sort
                                ${this.sort === 'type-desc' ? 'winelist-sort-desc winelist-sort-active' :
                                this.sort === 'type-asc' ? 'winelist-sort-asc winelist-sort-active':''}"
                         @click=${(e) => this.sortBy('type')}><span>by</span> Type</div>
                    <div class="winelist-sort
                                ${this.sort === 'country-desc' ? 'winelist-sort-desc winelist-sort-active' :
                                this.sort === 'country-asc' ? 'winelist-sort-asc winelist-sort-active':''}"
                         @click=${(e) => this.sortBy('country')}><span>by</span> Country</div>
                    <div class="winelist-sort
                                ${this.sort === 'region-desc' ? 'winelist-sort-desc winelist-sort-active' :
                                this.sort === 'region-asc' ? 'winelist-sort-asc winelist-sort-active':''}"
                         @click=${(e) => this.sortBy('region')}><span>by</span> Region</div>
                    <div class="winelist-sort
                                ${this.sort === 'price-desc' ? 'winelist-sort-desc winelist-sort-active' :
                                this.sort === 'price-asc' ? 'winelist-sort-asc winelist-sort-active':''}"
                         @click=${(e) => this.sortBy('price')}><span>by</span> Price</div>
                </div>
                <div class="wine-list">
                    ${this.list.map((wineObj) => html`<wine-item .wineObj="${wineObj}"></wine-item>`)}
                </div>
            </div>
        `;
    }
}
customElements.define('wine-list', WineList);
