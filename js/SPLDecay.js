function decaySPL(splValue = 0, distanceAdd = []) {
    let distance = [1, 2, 4, 5, 8, 10, 15, 16, 20, 25, 30, 35, 40, 45, 50, 60, 70, 80, 100, ...distanceAdd]
    let spl = Math.abs(Number(splValue))
    let decaySPL = Array()
    
    for(i=0; i <= distance.length; i++) {
            let decay = (spl + 20 * Math.log10(1 / Number(distance[i])))
            decaySPL[i] = decay.toFixed(2)
    }
}