import {html, LitElement} from "lit";
import DefaultEvents from "../DefaultEvents.js";

export class WineDashboard extends LitElement {

    static get properties() {
        return {
          isLoading: {type:Boolean}
        };
    }

    constructor() {
        super();
        this.isLoading = true;
        WineBiblio.srv.get('Queue').handle(DefaultEvents.ID.LOADING_APP, undefined, undefined).subscribe(msg => {
            this.isLoading = !msg.content.finished;
        });
    }

    render() {
        return html`
            <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 class="h2">Vins</h1>
                <div class="btn-toolbar mb-2 mb-md-0">
<!--                    <div class="btn-group me-2">-->
<!--                        <button type="button" class="btn btn-sm btn-outline-secondary">Export</button>-->
<!--                    </div>-->
                </div>
            </div>
            ${this.isLoading ? html`<app-loading></app-loading>` : html`<wine-list sort="name-desc"></wine-list>`}
        `;
    }
}
customElements.define('wine-dashboard', WineDashboard);
