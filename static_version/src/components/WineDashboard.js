import {html, LitElement} from "lit";
import DefaultEvents from "../DefaultEvents.js";

export class WineDashboard extends LitElement {

    wineList = undefined;

    static get properties() {
        return {
          isLoading: {type:Boolean},
          defaultViewMode: {type: String}
        };
    }

    constructor() {
        super();
        this.isLoading = true;
        WineBiblio.srv.get('Queue').handle(DefaultEvents.ID.LOADING_APP, undefined, undefined).subscribe(msg => {
            this.isLoading = !msg.content.finished;
        });

        WineBiblio.srv.get('Queue').handle(DefaultEvents.ID.VIEW_MODE, undefined, undefined).subscribe(msg => this.viewMode(msg.content));
    }

    viewMode(msg){
        switch (msg) {
            default:
            case 'default':
                this.wineList = html`<wine-list sort="name-desc"></wine-list>`;
                break;
            case 'thumbnail':
                this.wineList = html`<wine-list-thumbnail sort="name-desc"></wine-list-thumbnail>`;
                break;
            case 'picture':
                this.wineList = html`<wine-list sort="name-desc"></wine-list>`;
                break;
        }
    }

    render() {
        this.viewMode(this.defaultViewMode);
        return html`
            <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <div style="display: flex; flex-direction: row; align-items: center">
                    <h1 class="h2" style="margin-right: 1em">Vins</h1>
                    <wine-view-mode></wine-view-mode>
                </div>
                <div class="btn-toolbar mb-2 mb-md-0">
<!--                    <div class="btn-group me-2">-->
<!--                        <button type="button" class="btn btn-sm btn-outline-secondary">Export</button>-->
<!--                    </div>-->
                </div>
            </div>
            ${this.isLoading ? html`<app-loading></app-loading>` : this.wineList}
        `;
    }
}
customElements.define('wine-dashboard', WineDashboard);
