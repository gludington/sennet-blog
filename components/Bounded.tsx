import clsx from "clsx";
import { ReactElement } from "react";

export const Bounded = ({
  as: Comp = "div",
  size = "base",
  className,
  children,
}: {
    as?: any,
    size?: string,
    className?: string;
    children: ReactElement
}) => {
  return (
    <Comp className={clsx("px-4 md:px-6", className)}>
      <div
        className={clsx(
          "mx-auto w-full",
          size === "small" && "max-w-xl",
          size === "base" && "max-w-3xl",
          size === "wide" && "max-w-4xl",
          size === "widest" && "max-w-6xl"
        )}
      >
        {children}
      </div>
    </Comp>
  );
};
