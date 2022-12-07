import {css} from "lit";
import GlobalStyle from "./GlobalStyle.js";

export const WineViewModeStyle = () => {
    return [
        GlobalStyle,
        css`
          .wine-viewmode {
            display: flex;
            flex: 1;
            flex-flow: column;
            flex-direction: row;
          }
          
          .wine-viewmode div {
            display: flex;
            padding: 0 .8rem;
            font-size: 2rem;
            cursor: pointer;
          }
    `];
};
