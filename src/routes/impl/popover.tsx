// src/routes/impl/popover.tsx
import {
  type QwikIntrinsicElements,
  Slot,
  component$,
  useSignal,
  useVisibleTask$,
} from "@builder.io/qwik";

type PopoverRootProps = QwikIntrinsicElements["div"];

const isSupported =
  typeof HTMLElement !== "undefined" &&
  typeof HTMLElement.prototype === "object" &&
  "popover" in HTMLElement.prototype;

import "../../../node_modules/@oddbird/popover-polyfill/dist/popover.css";

export const Popover = component$((props: PopoverRootProps) => {
  useVisibleTask$(async () => {
    if (!isSupported) {
      import("../../../node_modules/@oddbird/popover-polyfill/dist/popover");
    }
  });

  const base = useSignal<HTMLElement>();
  const child = useSignal<HTMLElement>();

  useVisibleTask$(() => () => base.value?.appendChild(child.value as Node));

  type ToggleEvent = {
    newState: string;
  };

  return (
    <div aria-hidden={true} ref={base}>
      <div
        {...props}
        onToggle$={(e: ToggleEvent) => {
          if (isSupported) {
            return;
          }

          if (e.newState === "open") {
            document.body.appendChild(child.value!);
          } else {
            base.value!.appendChild(child.value!);
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
