import {BehaviorSubject} from "rxjs";
import DefaultEvents from "../DefaultEvents.js";


export default class ResizeObserverService {

    constructor() {
        this.screenSize = new BehaviorSubject({status: [undefined, undefined]});
        this.widthMini = [];
        this.heightMini = [];
        this.widthMaxi = [];
        this.heightMaxi = [];
        this.resizeObserver = undefined;
    }

    getServiceName() {
        return 'ScreenResizeObserver';
    }

    init(widthMini, heightMini, widthMaxi, heightMaxi) {

        this.widthMini = widthMini??[];
        this.widthMaxi = widthMaxi??[];
        this.heightMini = heightMini??[];
        this.heightMaxi = heightMaxi??[];

        this.resizeObserver = new ResizeObserver( entries => {
            const cr = entries[0].contentRect;

            const miniWidth = this.widthMini.filter(min => cr.width<=min);
            const miniWidthDetected = miniWidth.length>0;

            const miniHeight = this.heightMini.filter(min => cr.height<=min);
            const miniHeightDetected = miniHeight.length>0;

            const maxiWidth = false === miniWidthDetected? this.widthMaxi.filter(max => cr.width>=max):[];
            const maxiWidthDetected = maxiWidth.length>0;

            const maxiHeight = false === miniHeightDetected ? this.heightMaxi.filter(max => cr.height>=max):[];
            const maxiHeightDetected = maxiHeight.length>0;

            const newStatus =  [
                (miniWidthDetected ? DefaultEvents.SCREEN_SIZE_STATUS.MINI_WIDTH_DETECTED :
                    maxiWidthDetected ? DefaultEvents.SCREEN_SIZE_STATUS.MAXI_WIDTH_DETECTED : undefined),
                (miniHeightDetected ? DefaultEvents.SCREEN_SIZE_STATUS.MINI_HEIGHT_DETECTED :
                    maxiHeightDetected ? DefaultEvents.SCREEN_SIZE_STATUS.MAXI_HEIGHT_DETECTED : undefined)
            ];

            if(this.screenSize.getValue().status[0] !== newStatus[0] || this.screenSize.getValue().status[1] !== newStatus[1]) {
                this.screenSize.next({
                    width: cr.width, height: cr.height,
                    widthRef: (miniWidthDetected ? miniWidth : maxiWidthDetected ? maxiWidth : undefined),
                    heightRef: (miniHeightDetected ? miniHeight : maxiHeightDetected ? maxiHeight : undefined),
                    status: newStatus
                });
                WineBiblio.srv.get('Queue').pushMessage(DefaultEvents.ID.SCREEN_SIZE_REFRESH, this.screenSize.getValue());
            }
        });
        this.resizeObserver.observe(document.body);
    }

    disconnect() {
        this.resizeObserver.disconnect();
    }

}
