export const joinParams = (str: string | string[] | undefined) =>
  Array.isArray(str) ? str.join() : str ?? "";
