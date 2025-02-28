export const buildDynamicPath = (...args: Array<string | number>) => {
  return args.join("/");
};
