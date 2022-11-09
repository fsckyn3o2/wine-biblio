import {css} from "lit";

const cssBootstrap = document.styleSheets[0];
const cssBootstrapIcons = document.styleSheets[1];

globalThis.globalStyle = css([[
    Object.values(cssBootstrap.cssRules).map(rule => rule.cssText).join('\n'),
    Object.values(cssBootstrapIcons.cssRules).map(rule =>
        rule.cssText
    ).join('\n')
]]);
export default globalThis.globalStyle;
