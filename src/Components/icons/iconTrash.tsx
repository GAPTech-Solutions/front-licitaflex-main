import IconBase, { IconProps } from "./iconBase";

export const IconTrash = (props: IconProps) => {
  return (
    <IconBase viewBox="0 0 24 24" {...props}>
      <path
        d="M5 6V4H8.5L9.5 3H14.5L15.5 4H19V6H5ZM8 21C7.45 21 6.97933 20.8043 6.588 20.413C6.196 20.021 6 19.55 6 19V7H18V19C18 19.55 17.8043 20.021 17.413 20.413C17.021 20.8043 16.55 21 16 21H8Z"
        fill="currentColor"
      />
    </IconBase>
  );
};
