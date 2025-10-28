export class DateFormatter {
  static formatter = new Intl.DateTimeFormat('es-ES', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  static getDDMMMMYYYY(date: Date): string {
    return DateFormatter.formatter.format(date);
  }
}
