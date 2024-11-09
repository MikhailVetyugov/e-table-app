import { KeyboardEvent } from "react";

const INVALID_KEYS_FOR_ENTERING = [
  'CapsLock',
  'CapsLock',
  'NumLock',
  'MediaPlayPause',
  'MediaStop',
  'MediaTrackPrevious',
  'MediaTrackNext',
  'Insert',
  'Escape',
];

export function isValidKeyboardEvent(event: KeyboardEvent) {
  return (
    !event.altKey &&
    !event.ctrlKey &&
    !event.metaKey &&
    !event.shiftKey &&
    !INVALID_KEYS_FOR_ENTERING.includes(event.key)
  );
}
