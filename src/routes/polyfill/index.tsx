import { component$, useVisibleTask$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import "../../../node_modules/@oddbird/popover-polyfill/dist/popover.css";

export default component$(() => {
  useVisibleTask$(
    async () => {
      await import(
        "../../../node_modules/@oddbird/popover-polyfill/dist/popover"
      );

      function isPopoverSupported() {
        return (
          typeof HTMLElement !== "undefined" &&
          typeof HTMLElement.prototype === "object" &&
          "popover" in HTMLElement.prototype
        );
      }

      if (!isPopoverSupported()) {
        console.log(`I'm an unsupported browser! (Popover API)`);
      }
    },
    { strategy: "document-idle" }
  );

  return (
    <>
      <div id="button-popover" popover>
        Button Popover Content
      </div>

      <div
        id="input-popover"
        style={{ position: "absolute", top: "50px" }}
        popover
      >
        Input Popover Content
      </div>

      <div style={{ display: "flex", gap: "8px" }}>
        <button popovertarget="button-popover">I'm a regular button!</button>
        <input
          type="button"
          popovertarget="input-popover"
          value="I'm an input button!"
        />
      </div>

      {/* breaks if before content */}
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
