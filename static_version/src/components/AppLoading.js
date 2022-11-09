import {html, LitElement} from "lit";

export class AppLoading extends LitElement {

    constructor() {
        super();
    }

    render() {
        return html`
            <div class="spinner-border" style="width: 10em; height: 10em;" role="status">
                <span class="sr-only">Loading...</span>
            </div>
        `;
    }

}
customElements.define('app-loading', AppLoading);
