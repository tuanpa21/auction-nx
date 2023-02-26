export function addSeconds(date: Date, seconds: number) {
    const dateCopy = new Date(date.getTime());
  
    dateCopy.setSeconds(dateCopy.getSeconds() + seconds);
  
    return dateCopy;
  }
  
  export function subtractHours(date: Date, hours: number) {
    date.setHours(date.getHours() - hours);
  
    return date;
  }
  
  export const getTimeBetweenDates = (startDate: Date, endDate: Date) => {
    const seconds = Math.floor((endDate.getTime() - startDate.getTime()) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    return { seconds, minutes, hours, days };
  };
  