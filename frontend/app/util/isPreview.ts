export const isPreview = (request: Request) => {
  return new URL(request.url).searchParams.get("preview") === "true";
};
