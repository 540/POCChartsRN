export const fillWithZeros = (value:number):string =>  (`0${value}`).slice(-2);

export const getTimeFromDate = (timestamp:number):string =>  {
    const date = new Date(timestamp);
    const hours = fillWithZeros(date.getHours());
    const minutes = fillWithZeros(date.getMinutes());
    
    return `${hours}:${minutes}`;
  }

  export const getShortDate = (timestamp:number):string =>  {
    const months = [
        'Ene',
        'Feb',
        'Mar',
        'Abr',
        'May',
        'Jun',
        'Jul',
        'Ago',
        'Sep',
        'Oct',
        'Nov',
        'Dic'
    ];
    const date = new Date(timestamp);
    const day = fillWithZeros(date.getDate());
    const month = months[date.getMonth()];
    
    return `${day} ${month}`;
  }