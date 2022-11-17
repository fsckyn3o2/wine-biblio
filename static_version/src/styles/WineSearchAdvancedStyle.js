import {css} from "lit";
import GlobalStyle from "./GlobalStyle.js";

export const WineSearchAdvancedStyle = () => {
    return [
        GlobalStyle,
        css`
          :host {
            display: flex;
            flex: 1 1 0 !important;
            flex-direction: row;
          }
          
          .wine-search-adv {
            position: absolute;
            display: flex;
            flex: 1;
            flex-direction: row;
            border: 1px solid black;
            background-color: white;
          }

          .wine-search-adv-item {
            padding: .3rem .5rem;
          }
          
          .wine-search-adv-item label {
            text-transform: capitalize;
          }

          .wine-search-adv-item select option {
            -webkit-appearance: none;
            -moz-appearance: none;
            text-transform: capitalize;
          }
          
          .wine-search-adv-item select, .wine-search-adv-item input {
            background-color: white;
            border: 1px solid black;
            border-radius: 0;
            text-transform: capitalize;
          }
        `];
};
