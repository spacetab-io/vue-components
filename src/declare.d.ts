declare module 'v-tooltip' {
  import { PluginObject } from 'vue';

  const VueScrollTo: PluginObject<void>;
  export default VueScrollTo;
}

declare module 'tingle.js' {
  interface InitParams {
    closeMethods?: ('overlay' | 'button' | 'escape' | string)[],
    cssClass?: string[],
    onClose?: () => {},
  }

  interface Modal {
    new(params: InitParams): Modal;

    setContent(param: Element): void;

    open(): void;
    close(): void;
    destroy(): void;

    modalBoxContent: HTMLElement;
    modalBox: HTMLElement;
    modal: HTMLElement;
  }

  const a: {
    modal: Modal,
  };
  export default a;
}
