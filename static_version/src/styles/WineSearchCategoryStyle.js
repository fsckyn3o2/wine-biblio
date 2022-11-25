import GlobalStyle from "./GlobalStyle.js";
import {css} from "lit";

export const WineSearchCategoryStyle = () => {
    return [
        GlobalStyle,
        css`
            .nav-item .nav-link i {
              margin-right: .5em;
              font-size: 1em !important;
            }
            
            .nav-link:hover {
              text-decoration: underline;
            }
        `
    ];
}
