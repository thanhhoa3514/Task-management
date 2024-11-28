module.exports.generateStringRandom=(length)=>{
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = "";


    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    
    return result;
}

module.exports.randomDigit=(length)=>{
    const numbers="0123456789";

    let result=""
    for(let i=0; i<length; i++){
        result+= numbers.charAt(Math.floor(Math.random() * numbers.length));
    }
    return result;
}