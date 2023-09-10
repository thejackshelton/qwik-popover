import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <>
      <div class="relative">
        <button popovertarget="mypopover">Toggle the popover</button>
        <div style={{ position: "absolute" }} id="mypopover" popover="manual">
          Button content
        </div>
        <div
          style={{ position: "absolute", top: "10px" }}
          id="myinput"
          popover="manual"
        >
          Input Content
        </div>
        <input type="button" popovertarget="myinput" />
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
