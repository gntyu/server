function getTimeString(timestap){
    const type ='today'
    console.log('timestap',timestap);
    let month =new Date(timestap).getMonth()+1;
    let day =new Date(timestap).getDate();
    let hour =new Date(timestap).getHours();
    let mins =new Date(timestap).getMinutes();
    console.log(month,day,hour,mins)
    const time = (hour<10?'0'+hour:hour) +':'+ (mins<10?'0'+mins:mins);
    const myday = (month<10?'0'+month:month) +'/'+ (day<10?'0'+day:day);
    console.log('time',time)
    console.log('myday',myday)
    if(type=='today'){
        return time;
    }else if(type=='month'){
        return myday;
    }
  
}
getTimeString(new Date());