import {css} from "lit";
import GlobalStyle from "./GlobalStyle.js";

export const AppLanguageStyle = () => {
    return [
        GlobalStyle,
        css`
          .app-switch-language {
            display: flex;
            flex: 1;
            flex-direction: row;
            border-radius: 0px;
            padding: .3rem;
          }
          
          .app-switch-language label {
            border-radius: 0px;
            color: rgba(255, 255, 255, .5);
            border: none;
            font-size: var(--bs-nav-link-font-size);
          }
          
          .app-switch-language .btn-check:checked + .btn {
            background-color: transparent !important;
            text-decoration: underline;
            border: none;
          }
          
      `];
};
