export const extractUrlParam = (
  url: string | undefined,
  baseRoute: string,
): string | undefined => {
  return url?.split(baseRoute)[1]?.split("?")[0].replace("/", "");
};
