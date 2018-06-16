export const formatMoney=(num)=>{
    let money = parseInt(num).toString()
    let numLen = money.length
    if(numLen>5&&numLen<9){
        return money.substring(0,numLen-4)+'.'+money.substring(numLen-4,numLen-6)+'万'
    }else if(numLen>=9){
        return money.substring(0,numLen-8)+'.'+money.substring(numLen-8,numLen-10)+'亿'
    }else {
        return money
    }
}

export const formatDollar=(num)=>{
    var result = [ ], counter = 0;
    num = (num || 0).toString().split('');
    for (var i = num.length - 1; i >= 0; i--) {
        counter++;
        result.unshift(num[i]);
        if (!(counter % 3) && i != 0) { result.unshift(','); }
    }
    return result.join('');
}

