// src/routes/impl/popover.tsx
import {
  type QwikIntrinsicElements,
  Slot,
  component$,
  useSignal,
  useVisibleTask$,
} from "@builder.io/qwik";

type PopoverRootProps = QwikIntrinsicElements["div"] & {
  id: string; // Add this line
};

import { isPopoverSupported } from "./utils";

export const Popover = component$(({ id, ...props }: PopoverRootProps) => {
  useVisibleTask$(async () => {
    const isSupported = await isPopoverSupported();

    if (!isSupported) {
      import("../../../node_modules/@oddbird/popover-polyfill/dist/popover");
      import(
        "../../../node_modules/@oddbird/popover-polyfill/dist/popover.css"
      );
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
      <div data-child-id={`${id}-child`} ref={child} id={id} popover>
        <Slot />
      </div>
    </div>
  );
});
