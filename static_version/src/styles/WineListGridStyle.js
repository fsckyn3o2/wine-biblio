import {css} from "lit";
import {WineListStyle} from "./WineListStyle.js";

export const WineListGridStyle = () => {
    return [
        ...WineListStyle(),
        css`
          .wine-grid {
            display:flex;
            align-items: stretch;
            justify-content: left;
            flex-wrap: wrap;
          }

          .wine-grid wine-item {
            display: block;
            width: 33%;
            min-width: 300px;
            max-width: 500px;
            flex-shrink: 0;
          }
    `];
};
