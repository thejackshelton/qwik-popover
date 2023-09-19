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
      // Inject CSS into head
      const styleNode = document.createElement("style");
      styleNode.setAttribute("data-qwik-ui-popover-polyfill", "");
      styleNode.textContent = css;
      document.head.appendChild(styleNode);
    })
  );

  const baseRef = useSignal<HTMLElement>();
  const childRef = useSignal<HTMLElement>();
  const shouldTeleportSig = useSignal(false);
  const didClientRenderSig = useSignal(false);
  useTask$(({ track, cleanup }) => {
    const poppedOut = track(() => shouldTeleportSig.value);
    if (isServer || !poppedOut) return;

    // we need to rerender once on the client
    const didClientRender = track(() => didClientRenderSig.value);
    if (!didClientRender) {
      // ask to rerender
      didClientRenderSig.value = true;
      // prepare to be called again;
      shouldTeleportSig.value = false;
      return;
    }

    let containerDiv: HTMLDivElement | null = document.querySelector(
      "div[data-qwik-ui-popover-polyfill]"
    );
    if (!containerDiv) {
      containerDiv = document.createElement("div");
      containerDiv.setAttribute("data-qwik-ui-popover-polyfill", "");
      containerDiv.style.position = "absolute";
      document.body.appendChild(containerDiv!);
    }
    containerDiv.appendChild(childRef.value!);

    cleanup(() => baseRef.value?.appendChild(childRef.value as Node));
  });

  type ToggleEvent = {
    newState: string;
  };

  // This forces a re-render when the signal changes
  const forceRerender = !!didClientRenderSig.value;
  if (forceRerender) {
    console.log("yey rerendered");
    // Now pop out again to run the task
    setTimeout(() => (shouldTeleportSig.value = true), 0);
  }

  return (
    <div ref={baseRef}>
      <div
        {...props}
        onToggle$={(e: ToggleEvent) => {
          if (!document.__NEEDS_POPOVER__) {
            return;
          }

          console.log(`TOGGLE!`);

          shouldTeleportSig.value = e.newState === "open";
        }}
        ref={childRef}
        popover
      >
        <Slot />
      </div>
    </div>
  );
});
