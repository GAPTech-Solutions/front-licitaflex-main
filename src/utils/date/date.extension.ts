/* eslint-disable no-extend-native */
/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-ignore
interface Date {
  getLastDayOfMonth(): Date;
  getFirstDayOfMonth(): Date;
  addDaysOfDate(numberOfDays: number): Date;
  nextMonth(): Date;
  previosMonth(): Date;
  getWeek(): number;
  getTimeMinute(date?: Date): number;
  toMonthString(format?: Intl.DateTimeFormatOptions["month"]): string;
  toWeekdayString(format?: Intl.DateTimeFormatOptions["weekday"]): string;
  toYearString(format?: Intl.DateTimeFormatOptions["year"]): string;
  toDayString(format?: Intl.DateTimeFormatOptions["day"]): string;
  toStringPtBr(
    format?: Pick<Intl.DateTimeFormatOptions, "day" | "year" | "month">
  ): string;
  toTimeStringPtBr(): string;
  dateIsBetween(a: Date, b: Date, limits?: boolean): boolean;
}

Date.prototype.getLastDayOfMonth = function () {
  return new Date(this.getFullYear(), this.getMonth() + 1, 0);
};

Date.prototype.getTimeMinute = function (date?: Date) {
  const sub = date ? date.getTimeMinute() : 0;
  return Math.floor(this.getTime() / 60_000) - sub;
};
Date.prototype.dateIsBetween = function (a: Date, b: Date, limits?: boolean) {
  const time = this.getTime();
  const limiteNumber = limits ? 1 : 0;
  const timeA = a.getTime() - limiteNumber;
  const timeB = b.getTime() + limiteNumber;
  return time > timeA && time < timeB;
};

Date.prototype.toMonthString = function (
  format?: Intl.DateTimeFormatOptions["month"]
) {
  return this.toLocaleDateString("pt-br", { month: format ?? "short" });
};

Date.prototype.toWeekdayString = function (
  format?: Intl.DateTimeFormatOptions["weekday"]
) {
  return this.toLocaleDateString("pt-br", { weekday: format ?? "short" });
};

Date.prototype.toYearString = function (
  format?: Intl.DateTimeFormatOptions["year"]
) {
  return this.toLocaleDateString("pt-br", { year: format ?? "numeric" });
};

Date.prototype.toDayString = function (
  format?: Intl.DateTimeFormatOptions["day"]
) {
  return this.toLocaleDateString("pt-br", { day: format ?? "2-digit" });
};

Date.prototype.toStringPtBr = function (
  format?: Pick<Intl.DateTimeFormatOptions, "day" | "year" | "month">
) {
  const day = format?.day ?? "2-digit";
  const year = format?.year ?? "numeric";
  const month = format?.month ?? "short";
  return this.toLocaleDateString("pt-br", { day, year, month });
};

Date.prototype.toTimeStringPtBr = function () {
  const hour = this.getHours().toString().padStart(2, "0");
  const minutes = this.getMinutes().toString().padStart(2, "0");
  return `${hour}:${minutes}`;
};

Date.prototype.getFirstDayOfMonth = function () {
  return new Date(this.getFullYear(), this.getMonth(), 1);
};

Date.prototype.addDaysOfDate = function (numberOfDays: number) {
  return new Date(
    this.getFullYear(),
    this.getMonth(),
    this.getDate() + numberOfDays
  );
};

Date.prototype.nextMonth = function () {
  const dateNext = new Date(this.getFullYear(), this.getMonth() + 1, 1);
  if (this.getDate() > dateNext.getLastDayOfMonth().getDate()) {
    dateNext.setDate(dateNext.getLastDayOfMonth().getDate());
    return dateNext;
  }
  dateNext.setDate(this.getDate());
  return dateNext;
};

Date.prototype.previosMonth = function () {
  const datePrevios = new Date(this.getFullYear(), this.getMonth() - 1, 1);
  if (this.getDate() > datePrevios.getLastDayOfMonth().getDate()) {
    datePrevios.setDate(datePrevios.getLastDayOfMonth().getDate());
    return datePrevios;
  }
  datePrevios.setDate(this.getDate());
  return datePrevios;
};

Date.prototype.getWeek = function () {
  const month = this.getMonth();
  const year = this.getFullYear();
  let totalDays = this.getDate();
  for (let i = 0; i < month; i++) {
    totalDays += new Date(year, i, 1).getLastDayOfMonth().getDate();
  }
  return Math.floor(totalDays / 7);
};

interface DateConstructor {
  fromDateTime(date: Date, time: string): Date;
}

Date.fromDateTime = (date: Date, time: string) => {
  const minutesStart = Number.parseStringTime(time);
  const dateRef = new Date(date);
  return new Date(
    dateRef.getFullYear(),
    dateRef.getMonth(),
    dateRef.getDate(),
    0,
    minutesStart
  );
};
