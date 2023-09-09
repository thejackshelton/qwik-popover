import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <>
      <div class="relative">
        <button popovertarget="mypopover">Toggle the popover</button>
        <div style={{ position: "absolute" }} id="mypopover" popover="auto">
          Popover content
        </div>
        <input
          type="button"
          popovertarget="mypopover"
          style={{ width: "100px" }}
        />
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
