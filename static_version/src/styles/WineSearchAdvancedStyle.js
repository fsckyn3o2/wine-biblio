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
            flex-flow: wrap;
            border: 1px solid black;
            background-color: white;
            padding-top: 1.2em;
            margin-right: 2em;
            box-shadow: #AAA 4px 6px 6px;
          }
          
          .wine-search-adv-reset,
          .wine-search-adv-close {
            position: absolute;
            margin-top: -1.3em;
            margin-right: .2em;
            font-size: 1.2em;
            right: 0;
            cursor: pointer;
          }
          
          .wine-search-adv-reset:hover,
          .wine-search-adv-close:hover {
            text-decoration: underline;
          }
          
          .wine-search-adv-reset {
            margin-right: 2em;
            font-size: .9em;
            line-height: 1em;
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
