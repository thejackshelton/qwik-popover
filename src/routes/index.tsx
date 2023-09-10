import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
        <div>
          <div>Popover API</div>
          <div>
            <a href="/popover-api">Navigate</a>
          </div>
        </div>

        <div>
          <div>Polyfill</div>
          <div>
            <a href="/polyfill">Navigate</a>
          </div>
        </div>

        <div>
          <div>Portal</div>
          <div>
            <a href="/portal">Navigate</a>
          </div>
        </div>
        <div>
          <div>Implementation</div>
          <div>
            <a href="/impl">Navigate</a>
          </div>
        </div>
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
