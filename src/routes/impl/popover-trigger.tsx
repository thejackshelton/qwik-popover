// src/routes/impl/popover-trigger.tsx
import {
  type QwikIntrinsicElements,
  Slot,
  component$,
  useSignal,
} from "@builder.io/qwik";

type PopoverTriggerProps = QwikIntrinsicElements["button"] & {
  popovertarget: string;
};

export const PopoverTrigger = component$<PopoverTriggerProps>(
  ({ popovertarget, ...props }) => {
    const triggerRef = useSignal<HTMLButtonElement>();

    return (
      <button popovertarget={popovertarget} ref={triggerRef} {...props}>
        <Slot />
      </button>
    );
  }
);
