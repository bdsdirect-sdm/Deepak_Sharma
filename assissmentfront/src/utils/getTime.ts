export const setTime = (time:Date) =>{
    const timer = time.getHours() +":"+time.getMinutes()
    return timer;
}