// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isDataAnError = (data: Record<any, any>) => {
  return data?.status && Math.trunc(data.status / 100) === 4;
};
