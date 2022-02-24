// eslint-disable-next-line import/prefer-default-export
export const toTimeString = (dateString: string) => {
  const d = new Date(dateString);
  const toZeroFill = (n: number) => (n < 10 ? `0${n}` : `${n}`);
  const h = d.getHours();
  const m = d.getMinutes();
  return `${toZeroFill(h)}:${toZeroFill(m)}`;
};
