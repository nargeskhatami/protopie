export const toJalali = (date: string) => {
  const jalaliFormatter = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const jalali = new Date(date);

  return jalaliFormatter.format(jalali);
};
