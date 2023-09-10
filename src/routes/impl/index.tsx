import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Popover } from "./popover";

export default component$(() => {
  return (
    <>
      <div style={{ height: "10000px" }}>
        <button onClick$={() => console.log("hi!")}>I am a button!</button>
      </div>
      <button popovertarget="my-first-popover">Trigger!</button>
      <Popover id="my-first-popover">Content!</Popover>
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
