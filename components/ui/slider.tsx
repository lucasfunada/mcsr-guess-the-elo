import { Slider as SliderPrimitive } from "@base-ui/react/slider";
import { cn } from "cn";
import type { ReactNode } from "react";

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  label,
  thumbLabel,
  ...props
}: SliderPrimitive.Root.Props & {
  label?: ReactNode;
  thumbLabel?: string;
}) {
  const _values = Array.isArray(value)
    ? value
    : Array.isArray(defaultValue)
      ? defaultValue
      : [min, max];

  return (
    <SliderPrimitive.Root
      className={cn("data-horizontal:w-full data-vertical:h-full", className)}
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      thumbAlignment="edge"
      {...props}
    >
      <SliderPrimitive.Control className="minecraft-slider-control relative flex w-full touch-none items-center select-none data-disabled:opacity-50 data-vertical:h-full data-vertical:min-h-40 data-vertical:w-auto data-vertical:flex-col">
        <SliderPrimitive.Track
          data-slot="slider-track"
          className="minecraft-slider-track relative grow overflow-hidden select-none data-horizontal:h-10 data-horizontal:w-full data-vertical:h-full data-vertical:w-10"
        >
          <SliderPrimitive.Indicator
            data-slot="slider-range"
            className="bg-transparent select-none data-horizontal:h-full data-vertical:w-full"
          />
        </SliderPrimitive.Track>
        {Array.from({ length: _values.length }, (_, index) => (
          <SliderPrimitive.Thumb
            data-slot="slider-thumb"
            key={index}
            getAriaLabel={thumbLabel ? () => thumbLabel : undefined}
            className="minecraft-slider-thumb z-10 block h-10 w-3.5 shrink-0 select-none disabled:pointer-events-none disabled:opacity-50"
          />
        ))}
        {label && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center px-4 font-minecraft text-xl whitespace-nowrap text-white select-none [text-shadow:1.5px_1.5px_0_#3f3f3f]"
          >
            {label}
          </span>
        )}
      </SliderPrimitive.Control>
    </SliderPrimitive.Root>
  );
}

export { Slider };
