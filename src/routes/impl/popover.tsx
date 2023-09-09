import { type QwikIntrinsicElements, Slot, component$ } from "@builder.io/qwik";

type PopoverRootProps = QwikIntrinsicElements["div"];

export const Popover = component$(({ id, ...props }: PopoverRootProps) => {
  return (
    <div id={id} {...props}>
      <Slot />
    </div>
  );
});
