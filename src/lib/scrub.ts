"use client";

import { transform, useTransform, type MotionValue } from "framer-motion";

/**
 * Maps a scroll progress (0 to 1) onto output values, like `useTransform(progress, input, output)`, but always computed in
 * JavaScript on the page. framer-motion can otherwise hand such a mapping to the browser's native scroll timeline, which
 * measures pinned (sticky) sections differently and left values out of step with the rest of the scene.
 */
export function useScrub<T extends number | string>(progress: MotionValue<number>, input: number[], output: T[]): MotionValue<T> {
  return useTransform(progress, (v) => transform(v, input, output as never) as T);
}
