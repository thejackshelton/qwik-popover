import { type QwikIntrinsicElements, Slot, component$ } from "@builder.io/qwik";

type PopoverTriggerProps = QwikIntrinsicElements["button"] &
  QwikIntrinsicElements["input"] & {
    id: string;
    as?: "button" | "input";
  };

export const PopoverTrigger = component$<PopoverTriggerProps>(
  ({ id, as = "button", ...props }) => {
    const Component = as;
    return (
      <Component id={id} {...props}>
        <Slot />
      </Component>
    );
  }
);
