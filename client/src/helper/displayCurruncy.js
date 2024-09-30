export const displayCurrencyToPKR = (num) => {
  const formatter = new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 2
  });
  return formatter.format(num);
};
