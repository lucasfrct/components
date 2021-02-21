function sumSPL(spl01, spl02){
    let difference = Math.abs(Number(spl01) - Number(spl02))
    let spl = (Number(spl01) >= Number(spl02)) ? Number(spl01) : Number(spl02)  
    let sum = 20 * Math.log10(Math.sqrt(Math.pow(10,(difference / 10)) + 1))
    return (Math.abs(sum) + Math.abs(spl))
}