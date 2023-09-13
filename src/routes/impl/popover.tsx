// src/routes/impl/popover.tsx
import {
  type QwikIntrinsicElements,
  Slot,
  component$,
  useSignal,
  useOn,
  $,
  useTask$,
} from "@builder.io/qwik";

import { isServer } from "@builder.io/qwik/build";

type PopoverRootProps = QwikIntrinsicElements["div"];

declare global {
  interface Document {
    __NEEDS_POPOVER__?: true;
  }
  interface HTMLDivElement {
    popover?: "manual" | "auto" | true;
  }
}

export const Popover = component$((props: PopoverRootProps) => {
  // By putting the polyfill in useOn without capturing external
  // scope, we can load the polyfill without waking up the framework
  useOn(
    "qvisible",
    $(async () => {
      const isSupported =
        typeof HTMLElement !== "undefined" &&
        typeof HTMLElement.prototype === "object" &&
        "popover" in HTMLElement.prototype;
      console.log("POLYFILL:", !isSupported);
      if (isSupported) return;
      document.__NEEDS_POPOVER__ = true;
      if (document.querySelector("style[data-qwik-ui-popover-polyfill]"))
        return;
      const [{ default: css }] = await Promise.all([
        import("@oddbird/popover-polyfill/css?inline"),
        import("@oddbird/popover-polyfill"),
      ]);
      const styleNode = document.createElement("style");
      styleNode.setAttribute("data-qwik-ui-popover-polyfill", "");
      styleNode.textContent = css;
      document.head.appendChild(styleNode);
    })
  );

  const base = useSignal<HTMLElement>();
  const child = useSignal<HTMLElement>();
  const popped = useSignal(false);
  useTask$(({ track }) => {
    const popState = track(() => popped.value);
    if (isServer || !popState) return;
    return () => base.value?.appendChild(child.value as Node);
  });

  type ToggleEvent = {
    newState: string;
  };

  return (
    <div aria-hidden={true} ref={base}>
      <div
        {...props}
        onToggle$={(e: ToggleEvent) => {
          if (!document.__NEEDS_POPOVER__) {
            return;
          }

          console.log(`TOGGLE!`);
          if (e.newState === "open") {
            let containerDiv: HTMLDivElement | null = document.querySelector(
              "div[data-qwik-ui-popover-polyfill]"
            );
            if (!containerDiv) {
              containerDiv = document.createElement("div");
              containerDiv.setAttribute("data-qwik-ui-popover-polyfill", "");
              containerDiv.style.position = "absolute";
              document.body.appendChild(containerDiv!);
            }
            containerDiv.appendChild(child.value!);
            popped.value = true;
          } else {
            base.value!.appendChild(child.value!);
            popped.value = false;
          }
        }}
        ref={child}
        popover
      >
        <Slot />
      </div>
    </div>
  );
});
