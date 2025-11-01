export const getMonthName = (month: number) => {
  const monthNames = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];
  const monthName = monthNames[month];
  return monthName;
};

export const getDayMonth = (date: Date): string => {
  if (!date) return '';
  const day = date.getDate().toString().padStart(2, '0');
  return `${day}-${getMonthName(date.getMonth())}`;
};
