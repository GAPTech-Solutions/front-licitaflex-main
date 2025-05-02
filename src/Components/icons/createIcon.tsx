import { __DEV__ } from "@/utils/assert";
import { forwardRef } from "@chakra-ui/react";
import { Children } from "react";

import IconBase, { IconProps } from "./iconBase";

interface CreateIconOptions {
  /**
   * The icon `svg` viewBox
   * @default "0 0 24 24"
   */
  viewBox?: string;
  /**
   * The `svg` path or group element
   * @type React.ReactElement | React.ReactElement[]
   */
  path: React.ReactElement | React.ReactElement[];

  /**
   * The display name useful in the dev tools
   */
  displayName?: string;
  /**
   * Default props automatically passed to the component; overwriteable
   */
  defaultProps?: IconProps;
}
export function createIcon(options: CreateIconOptions) {
  const { viewBox = "0 0 24 24", displayName, defaultProps = {} } = options;
  const path = Children.toArray(options.path);

  const Comp = forwardRef<IconProps, "svg">((props, ref) => (
    <IconBase ref={ref} viewBox={viewBox} {...defaultProps} {...props}>
      {path}
    </IconBase>
  ));

  if (__DEV__) {
    Comp.displayName = displayName;
  }
  return Comp;
}
