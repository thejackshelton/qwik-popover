// src/routes/impl/popover-trigger.tsx
import {
  type QwikIntrinsicElements,
  Slot,
  component$,
  useVisibleTask$,
  useSignal,
} from "@builder.io/qwik";

import { isPopoverSupported } from "./utils";

type PopoverTriggerProps = QwikIntrinsicElements["button"] & {
  popovertarget: string;
};

export const PopoverTrigger = component$<PopoverTriggerProps>(
  ({ popovertarget, ...props }) => {
    const popoverRef = useSignal<HTMLDivElement>();

    useVisibleTask$(
      async () => {
        const isSupported = await isPopoverSupported();
        if (!isSupported) {
          console.log(`I'm an unsupported browser! (Popover API)`);

          const popover = document.querySelector(`#${popovertarget}`);
          console.log(popover);

          if (!popover) {
            console.warn(`Popover with id "${popovertarget}" not found`);
            return;
          }

          const base = popover.querySelector(
            `[data-base-id="${popovertarget}-base"]`
          );
          const child = popover.querySelector(
            `[data-child-id="${popovertarget}-child"]`
          );

          console.log("PopoverTrigger.tsx");

          popoverRef.value?.addEventListener("click", () => {
            if (!child || !base) {
              console.warn(
                `Child or base not found in popover "${popovertarget}"`
              );
              return;
            }

            if (child.parentElement === base) {
              document.body.appendChild(child);
              console.log("body");
            } else {
              base.appendChild(child!);
              console.log("not body");
            }
          });
        }
      },
      { strategy: "document-idle" }
    );

    return (
      <button popovertarget={popovertarget} ref={popoverRef} {...props}>
        <Slot />
      </button>
    );
  }
);
