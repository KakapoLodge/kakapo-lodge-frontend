export const linearInterpolate = (
  oldValue: number,
  oldRange: number[],
  newRange: number[],
  capped: boolean = true,
  reverse: boolean = true,
) => {
  const [oldMin, oldMax] = oldRange;
  const [newMin, newMax] = newRange;

  if (capped) {
    if (oldValue < oldMin) {
      return reverse ? newMax : newMin;
    }

    if (oldValue > oldMax) {
      return reverse ? newMin : newMax;
    }
  }

  const fraction = (oldValue - oldMin) / (oldMax - oldMin);

  if (reverse) {
    return newMax - fraction * (newMax - newMin);
  } else {
    return newMin + fraction * (newMax - newMin);
  }
};
