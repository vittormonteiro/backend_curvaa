const { execFile } = require('child_process');
const util = require('util');

const execFileAsync = util.promisify(execFile);

export default class functions {
  
  public segToHours(time: number, with_seg = true) {
    
    let hours = Math.trunc( time / 3600 );
    let minutes = Math.trunc( (time % 3600) / 60 );
    let seconds = time % 60;

    let hoursStr = '';
    let minutesStr = '';
    let secondsStr = '';

    if(hours >= 0 && hours <= 9){hoursStr = `0${Math.abs(hours)}`};
    if(hours >= -9 && hours <= -1){hoursStr = `-0${Math.abs(hours)}`};
    if(hours <= -10 || hours >= 10){hoursStr = `${hours.toString()}`};

    if(minutes >= -9 && minutes <= 9){
      minutesStr = `0${Math.abs(minutes)}`;
    }else{
      minutesStr = `${Math.abs(minutes)}`;
    };

    if(seconds >= -9 && seconds <= 9){
      secondsStr = `0${Math.abs(seconds)}`;
    }else{
      secondsStr = `${Math.abs(seconds)}`;
    };

    if(with_seg){
      return  hoursStr + ":" + minutesStr + ":" + secondsStr;
    }
      
    return  hoursStr + ":" + minutesStr;

  };

  public hoursToSec(time:string) {
    
    const arr = time.split(":");
    
    let hours = parseInt(arr[0]);
    let minutes = parseInt(arr[1]);
    let seconds = parseInt(arr[2]);

    hours = hours ? hours * 3600 : 0;
    minutes = minutes ? minutes * 60 : 0;
    seconds = seconds ? seconds : 0;
    
    return  hours + minutes + seconds;

  };

  public calculateWeekends(year: number, month: number, saturday=false) {

    const firstDayOfMonth = new Date(year, month - 1, 1);
    const lastDayOfMonth = new Date(year, month, 0);
  
    let weekendsCount = 0;
    let currentDate = firstDayOfMonth;
  
    while (currentDate <= lastDayOfMonth) {
      if (currentDate.getDay() === 0 || (saturday && currentDate.getDay() === 6)) {
        weekendsCount++;
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
  
    return weekendsCount;
  };

  public strToDate(str:string, format = "dd/MM/yyyy") {
    
    if (!str || !format) return null;

    const sepMatch = format.match(/[-/]/);
    if (!sepMatch) return null;

    const sep = sepMatch[0];

    if (!str.includes(sep)) return null;

    const formatParts = format.split(sep);
    const dateParts = str.split(sep);

    if (formatParts.length !== dateParts.length) return null;

    let day, month, year;

    for (let i = 0; i < formatParts.length; i++) {
      const part = formatParts[i].toLowerCase();
      const value = Number(dateParts[i]);

      if (!Number.isInteger(value)) return null;

      if (part === 'dd') day = value;
      if (part === 'mm') month = value;
      if (part === 'yyyy') year = value;
    }

    if (!day || !month || !year) return null;

    // cria data
    const date = new Date(year, month - 1, day);

    // valida de verdade
    if (
      date.getFullYear() !== year ||
      date.getMonth() !== month - 1 ||
      date.getDate() !== day
    ) {
      return null;
    }

    // retorna no formato ISO (yyyy-mm-dd)
    return new Date(`${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}T00:00`);

  };

  public parseDate(value: string | Date): Date | null {

    if (value instanceof Date) {
      return Number.isNaN(value.getTime()) ? null : value;
    }

    if (typeof value === 'string') {
      const date = /^\d{4}-\d{2}-\d{2}$/.test(value)
        ? new Date(`${value}T00:00`)
        : new Date(value);

      return Number.isNaN(date.getTime()) ? null : date;
    }

    return null;

  };

  public getDateHours(o:string | Date){
    const dt = o ? new Date(o) : new Date();
    const date = dt.getFullYear() + "-" + ( (dt.getMonth()+1) < 10 ?  '0' + (dt.getMonth()+1) : (dt.getMonth()+1)) + "-" + (dt.getDate() < 10 ? '0' + dt.getDate() : dt.getDate());
    const hours =	((dt.getHours() < 10 ? '0' + dt.getHours() : dt.getHours()) + ':' + (dt.getMinutes() < 10 ? '0' + dt.getMinutes() : dt.getMinutes()));
    return {"date": date, "hours": hours}
  };

  public diffInMonths(date1:string, date2:string) {

    const d1 = new Date(date1);
    const d2 = new Date(date2);

    const years = d2.getFullYear() - d1.getFullYear();
    const months = d2.getMonth() - d1.getMonth();

    return years * 12 + months;
  };

  public sanitizePath(path:string) {
    return path.trim()
    .replace(/[\\\/:*?"<>|.]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
  };

  public async runCommand(cmd: string, args: string[] = []) {
    try {
      //console.log(args)
      const { stdout } = await execFileAsync(cmd, args);
      //if (stderr) console.warn("stderr:", stderr);
      return stdout;
    } catch (err) {
      console.error("Erro ao executar:", cmd, args, err);
      throw err;
    }
  };

};
