// src/routes/impl/popover.tsx
import {
  type QwikIntrinsicElements,
  Slot,
  component$,
  useSignal,
  useVisibleTask$,
} from "@builder.io/qwik";

type PopoverRootProps = QwikIntrinsicElements["div"] & {
  id: string;
};

const isSupported =
  typeof HTMLElement !== "undefined" &&
  typeof HTMLElement.prototype === "object" &&
  "popover" in HTMLElement.prototype;

import "../../../node_modules/@oddbird/popover-polyfill/dist/popover.css";

export const Popover = component$(({ id, ...props }: PopoverRootProps) => {
  useVisibleTask$(async () => {
    if (!isSupported) {
      import("../../../node_modules/@oddbird/popover-polyfill/dist/popover");
      console.log("I ran!");
    }
  });

  console.log("render Popover");
  const base = useSignal<HTMLElement>();
  const child = useSignal<HTMLElement>();

  console.log(`Popover.tsx`);

  useVisibleTask$(() => () => base.value?.appendChild(child.value as Node));

  return (
    <div data-base-id={`${id}-base`} {...props} ref={base}>
      <div
        id={id}
        onToggle$={(e) => {
          console.log("I am running", e);
          if (isSupported) {
            return;
          }

          if (e.newState === "open") {
            document.body.appendChild(child.value!);
            console.log("body");
          } else {
            base.value!.appendChild(child.value!);
            console.log("not body");
          }
        }}
        data-child-id={`${id}-child`}
        ref={child}
        popover
      >
        <Slot />
      </div>
    </div>
  );
});
