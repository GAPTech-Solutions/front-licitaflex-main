import React, { ReactNode, useId } from "react";
import {
  chakra,
  forwardRef,
  IconProps as IconPropsChackra,
  SystemStyleObject,
} from "@chakra-ui/react";
import { cx } from "@/utils/assert";
import { colors } from "@/assets/theme/colors";

export type IconProps = IconPropsChackra;
const IconBase = forwardRef<IconProps, "svg">((props, ref) => {
  const {
    as: element,
    viewBox,
    children,
    color = "currentColor",
    focusable = false,
    className,
    __css,
    ...propsIcon
  } = props;
  const _className = cx("axis-icon", className);
  const _viewBox = viewBox ?? "0 0 24 24";

  const styles: SystemStyleObject = {
    w: "1rem",
    h: "1rem",
    display: "inline-block",
    verticalAlign: "middle",
    lineHeight: "1",
    flexShrink: "0",
    color,
    ...__css,
  };

  const shared: any = {
    ref,
    focusable,
    className: _className,
    __css: styles,
  };
  const idGradient = `axis-fill-${useId()}`;
  const colorFinish = styles.color && getCss(styles.color as string);
  let pathsIcon: ReactNode = children;
  if (colorFinish) {
    const defColor = getDefGradient(colorFinish, idGradient);
    const iconNew = setFillColor(children, idGradient);
    pathsIcon = (
      <>
        {iconNew}
        {defColor}
      </>
    );
  }
  if (element && typeof element !== "string") {
    return <chakra.svg as={element} {...shared} {...propsIcon} />;
  }

  return (
    <chakra.svg
      verticalAlign="middle"
      viewBox={_viewBox}
      {...shared}
      {...propsIcon}
    >
      {pathsIcon}
    </chakra.svg>
  );
});

export default IconBase;

const getDefGradient = (gradient: string, idGradient: string) => {
  const regex = /(^(?:l|r).+t)(\(.+\))/gm;
  const m = regex.exec(gradient);
  if (m === null) return;
  const typeGradient = m[1];
  const paramsGradient = m[2].slice(1).slice(0, -1).split(",");

  const degree = parseFloat(paramsGradient[0]);
  const colors = [];
  for (let i = 1; i < paramsGradient.length; i++) {
    colors.push(paramsGradient[i].trim().split(" "));
  }
  const defGradientLinear = typeGradient === "linear-gradient";
  const startStop = colors.map((color, index) => (
    <stop offset={color[1]} stopColor={color[0]} key={index} />
  ));
  return (
    <defs>
      {defGradientLinear ? (
        <linearGradient
          id={idGradient}
          x1="0%"
          y1="100%"
          x2="100%"
          y2="0%"
          gradientUnits="userSpaceOnUse"
          gradientTransform={`rotate(${degree})`}
        >
          {startStop}
        </linearGradient>
      ) : (
        <radialGradient
          id={idGradient}
          cx="50%"
          cy="50%"
          r="50%"
          fx="50%"
          fy="50%"
          gradientUnits="userSpaceOnUse"
        >
          {startStop}
        </radialGradient>
      )}
    </defs>
  );
};
const isPropsColorCssGradient = (propsColor: string): boolean => {
  const regex = /(^(?:l|r).+t)(\(.+\))/gm;
  const m = regex.exec(propsColor);
  if (m === null) return false;
  return true;
};
const isPropColorGradientTheme = (propsColor: string): boolean => {
  const regex = /^(?:gradients)/gm;
  const m = regex.exec(propsColor);
  if (m === null) return false;
  return true;
};
const getCss = (gradient: string): string | undefined => {
  if (isPropsColorCssGradient(gradient)) return gradient;
  if (!isPropColorGradientTheme(gradient)) return undefined;

  const colorsProps = gradient.split(".");
  let prop: string | undefined = "";
  let colorFinal: string | undefined | object = colors;
  while ((prop = colorsProps.shift())) {
    if (typeof colorFinal === "string") {
      continue;
    }
    if (typeof colorFinal === "object") {
      colorFinal = colorFinal[prop as keyof typeof colorFinal];
    }
  }
  if (typeof colorFinal === "string") return colorFinal;
  return undefined;
};

const setFillColor = (children: ReactNode, idGradient: string): ReactNode => {
  return React.Children.map(children, (child) => {
    return cloneElement(child, idGradient);
  });
};

const cloneElement = (child: ReactNode, idGradient: string): ReactNode => {
  if (React.isValidElement(child) && child.props.fill === "currentColor") {
    return React.cloneElement(child, {
      fill: `url(#${idGradient})`,
      key: idGradient + child.key,
    } as any);
  }
  return child;
};
