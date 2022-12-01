import {css} from "lit";
import GlobalStyle from "./GlobalStyle.js";

export const WineListStyle = () => {
    return [
        GlobalStyle,
        css`
          .winelist {
            display: flex;
            flex-direction: column;
            -webkit-user-select: none;
            -ms-user-select: none;
            user-select: none;
          }
          
          .winelist-sort-criteria {
            display: flex;
            flex-direction: row;
            flex-flow: row;
            padding: .8rem 0;
            flex-wrap: wrap;
          }
          
          .winelist-sort {
            cursor: pointer;
            font-size: 1em;
            margin: .3rem 2rem;
            text-transform: capitalize;
            flex-direction: row;
          }

          @media (max-width: 980px) {
            .winelist-sort-criteria {
              flex-direction: column;
            }
          }

          .winelist-sort > span {
            font-size: .9em;
          }
          
          .winelist-sort > span::before {
            content: " ";
          }

          .winelist-sort::before {
            content: "\\f2EA";
            display: inline-block;
            text-decoration: none;
            font-family: "bootstrap-icons" !important;
            font-size: .9em;
          }
          
          .winelist-sort-active::before {
            content: "";
          }
          
          .winelist-sort-desc::before {
            content: "\\f145";
            display: inline-block;
            text-decoration: none;
            font-family: "bootstrap-icons" !important;
            font-size: .9em;
          }

          .winelist-sort-asc::before {
            content: "\\f124";
            display: inline-block;
            text-decoration: none !important;
            font-size: .9em !important;
            font-family: "bootstrap-icons" !important;
          }
          
          .winelist-sort-active {
            color: blueviolet;
            text-decoration: underline;
          }
    `];
};
