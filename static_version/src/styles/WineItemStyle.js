import {css} from "lit";
import GlobalStyle from "./GlobalStyle.js";

export const WineItemStyle = () => {
    return [
        GlobalStyle,
        css`
          .wine-item {
            display: flex;
            flex: 1;
            flex-direction: column;
            border: 1px solid #888;
            padding: .5rem;
            margin: .8rem;
          }
          
          .wine-item:hover {
            background-color: #FAFAFA;
            box-shadow: #AAA 4px 6px 6px;
          }
          
          .wine-item-header {
            display: flex;
            flex: 1;
            flex-direction: row;
            border-bottom: solid #888 1px;
            margin-bottom: .5rem;
            padding-bottom: .5rem;
          }
          
          .wine-item-details {
            display: flex;
            flex-wrap: wrap;
          }
    
          .wine-item-property {
            flex: 1 1 50%;
            display: flex;
            padding: .3rem 0;
          }
          
          .wine-item-property-label {
            display: block;
            width: 150px;
            font-weight: bold;
            text-transform: capitalize;
          }
          
          .wine-item-property-value {
            flex-basis: 100px;
          }
    `];
};
