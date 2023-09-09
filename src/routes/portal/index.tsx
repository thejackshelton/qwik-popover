import {
  component$,
  useSignal,
  useVisibleTask$,
  Slot,
  createContextId,
  useContext,
  useContextProvider,
} from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

const cId = createContextId<any>("ctx");

export const Count = component$(() => {
  const count = useSignal(0);
  return <u onClick$={() => count.value++}>Count: {count.value} (click me)</u>;
});

export const Popover = component$(() => {
  console.log("render Popover");
  const base = useSignal<HTMLElement>();
  const child = useSignal<HTMLElement>();

  useVisibleTask$(() => () => base.value?.appendChild?.(child.value));

  return (
    <div>
      <button
        onClick$={() => {
          if (child.value.parentElement === base.value) {
            document.body.appendChild(child.value);
          } else {
            base.value.appendChild(child.value);
          }
        }}
      >
        Toggle popout
      </button>
      <div ref={base}>
        <div ref={child}>
          <Slot />
        </div>
      </div>
    </div>
  );
});

export const Demo = component$(() => {
  console.log("render Demo");
  const ctx = useContext(cId);
  const likes = useSignal(0);
  const pop = useSignal(true);
  return (
    <div>
      <div>Before</div>
      <button onClick$={() => (pop.value = !pop.value)}>Toggle popover</button>
      {pop.value && (
        <Popover>
          Hello! Internal state: <Count /> and timer context: {ctx.value}
          <div>
            external state: <button onClick$={() => likes.value++}>👍</button>{" "}
            {Array.from({ length: likes.value }).map(() => "👍")}
          </div>
        </Popover>
      )}
      <div>After</div>
      <hr />
    </div>
  );
});

export default component$(() => {
  console.log("render app");
  const clock = useSignal(0);
  useContextProvider(cId, clock);
  useVisibleTask$(() => {
    const i = setInterval(() => clock.value++, 1000);
    return () => {
      clearInterval(i);
    };
  });
  return <Demo />;
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
