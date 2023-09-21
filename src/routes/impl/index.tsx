import { component$, useSignal } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { Popover } from './popover';

export default component$(() => {
  const secondPopoverS = useSignal(false);
  return (
    <>
      <button popovertarget="my-first-popover">Trigger!</button>
      <Popover id="my-first-popover">Content!</Popover>
      <button onClick$={() => (secondPopoverS.value = !secondPopoverS.value)}>
        Toggle 2
      </button>
      {secondPopoverS.value && (
        <>
          <button popovertarget="my-second-popover">Trigger 2!</button>
          <Popover id="my-second-popover">More content!</Popover>
        </>
      )}
    </>
  );
});

export const head: DocumentHead = {
  title: 'Welcome to Qwik',
  meta: [
    {
      name: 'description',
      content: 'Qwik site description',
    },
  ],
};
