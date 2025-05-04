export function setCookie(key,value,expiryDate){
    if(expiryDate){
        document.cookie=key+"="+value+";expires="+expiryDate.toUTCString()
    }
    else{
        document.cookie=key+"="+value
    }
}

export function deleteCookie(key){
    var date = new Date()
    date.setMonth(date.getMonth()-1)
    document.cookie=key+'=;expires='+date.toUTCString()
}

export function hasCookie(key){
    var arr = document.cookie.split('; ') //['usrname=usrname','usrage=usrage']
    var data=[]
    for(var i=0;i<arr.length;i++)
    {
        data[arr[i].split('=')[0]]=arr[i].split('=')[1]
    }

    if(data[key]){return true;}
    else{return false;}
    //return boolean
}

export function getCookie(key){
    var arr = document.cookie.split('; ') //['usrname=usrname','usrage=usrage']
    var data=[]
    for(var i=0;i<arr.length;i++)
    {
        data[arr[i].split('=')[0]]=arr[i].split('=')[1]
    }
    return data[key];
}