import { createIcon } from "./createIcon";

export const IconDropDown = createIcon({
  viewBox: "0 0 14 9",
  defaultProps: {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
  },
  path: (
    <path
      d="M13 1L7 8 1 1"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  displayName: "IconDropDown",
});
