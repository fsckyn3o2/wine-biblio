import {css} from "lit";
import GlobalStyle from "./GlobalStyle.js";

export const WineSearchStyle = () => {
    return [
        GlobalStyle,
        css`
          :host {
            display: flex;
            flex: 1;
            flex-direction: row;
            margin-right: .8rem;
          }

          .winesearch-bar-item {
            display: flex;
            flex-direction: row;
            color: white;
          }
          
          .winesearch-bar-item-large {
            display: flex;
            flex: 1;
            flex-direction: column;
            padding: 0;
            margin: 0;
          }

          .winesearch-large-input {
            display: flex;
            flex-direction: row;
            flex: 1 1 100%;
            padding: 0;
            margin: 0;
          }

          .winesearch-large-input input {
            display: block;
            color: white;
            text-transform: capitalize;
            background-color: rgba(255, 255, 255, .1);
            border: none;
            outline: 0;
            width: 100%;
            padding: .375rem .75rem;
            font-weight: 400;
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
          }

          .winesearch-large-input input:focus {
            border: none;
            background-color: #fff;
            color: black;
            width: 100%;
            outline: 0;
            padding: .375rem .75rem;
            background-clip: padding-box;
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
          }

          .winesearch-button {
            display: flex;
            flex: 1;
            align-items: center;
            padding: 0 .5rem;
            margin: 0 .5rem;
            cursor: pointer;
            color: rgba(255, 255, 255, .5);
          }

          @media (max-width: 800px) {
              .winesearch-button {
                padding: 0 .2em !important;
                margin: 0 !important;
              }
              .winesearch-button-advanced {
                font-family: monospace;
                width: 6em;
                overflow: hidden;
                display: inline-block;
                height: 1.8em;
                margin-top: .7em !important;
              }
          }
        `];
};
