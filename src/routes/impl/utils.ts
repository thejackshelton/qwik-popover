import "../../../node_modules/@oddbird/popover-polyfill/dist/popover.css";

export async function isPopoverSupported() {
  return (
    typeof HTMLElement !== "undefined" &&
    typeof HTMLElement.prototype === "object" &&
    "popover" in HTMLElement.prototype
  );
}
