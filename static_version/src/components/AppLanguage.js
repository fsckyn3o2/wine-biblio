import {html, LitElement} from "lit";
import {AppLanguageStyle} from "../styles/AppLanguageStyle.js";

export class AppLanguage extends LitElement {

    static get properties() {
        return {
          currentLanguage: {type: String}
        };
    }

    static get styles() {
        return AppLanguageStyle();
    }

    constructor() {
        super();
        this.currentLanguage = WineBiblio.srv.get('Translate').language;
    }

    setLanguage(newLanguage) {
        WineBiblio.srv.get('Translate').setLanguage(newLanguage);
    }

    render() {
        return html`
            <div class="app-switch-language" role="group" aria-label="Language selection">
                <input type="radio" class="btn-check" name="language_switch" id="language_switch_en" autocomplete="off" .checked=${this.currentLanguage==='en'?'true':''} 
                       @click=${(e) => this.setLanguage('en') }>
                <label class="btn btn-dark" for="language_switch_en">English</label>

                <input type="radio" class="btn-check" name="language_switch" id="language_switch_fr" autocomplete="off" .checked=${this.currentLanguage==='fr'?'true':''} 
                       @click=${(e) => this.setLanguage('fr') }>
                <label class="btn btn-dark" for="language_switch_fr">French</label>
            </div>
        `;
    }
}
customElements.define('app-language', AppLanguage);
