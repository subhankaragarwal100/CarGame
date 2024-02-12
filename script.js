const score = document.querySelector('.Score')
const startScreen = document.querySelector('.startScreen')
const gameArea = document.querySelector('.gameArea')
startScreen.addEventListener("click", start)
let player = { speed : 4, score: 0}
let keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false
}
document.addEventListener('keydown', keyDown)
document.addEventListener('keyup', keyUp)
function keyDown(e) {
    e.preventDefault();
    keys[e.key] = true
    // console.log(keys);
}
function keyUp(e) {
    e.preventDefault();
    keys[e.key] = false
    // console.log(e.key);
}


function isCollide(a, b) {
    const aRect = a.getBoundingClientRect();
    const bRect = b.getBoundingClientRect();

    return !((aRect.bottom < bRect.top) || 
            ( aRect.top > bRect.bottom) || 
            ( aRect.right < bRect.left) || 
             (aRect.left > bRect.right));
}


function moveLines(){
let lines = document.querySelectorAll('.lines')

// lines.forEach(function(item){
//     item.y += player.speed
//     item.style.top = item.y + "px"
// });
lines.forEach(function(item){
    if(item.y >= 700){
        item.y -= 760
    }
    item.y += player.speed
    item.style.top = item.y + "px"
});
}
function endGame(){
    player.start = false
    startScreen.classList.remove('hide')
    startScreen.innerHTML = "Game Over<br>Your final score is : " + player.score + "<br>Press here to restart the Game"
}


function moveEnemy(car){
let enemy = document.querySelectorAll('.enemy')

// enemy.forEach(function(item){
//     item.y += player.speed
//     item.style.top = item.y + "px"
// });
enemy.forEach(function(item){
    if(isCollide(car,item)){
        endGame()
    }
    if(item.y >= 850){
        item.y = -1000
        item.style.left = Math.floor(Math.random()*350)+ "px"
    }
    item.y += player.speed
    item.style.top = item.y + "px"
});
}
function gamePlay() {
    // console.log("Hi")
    let car = document.querySelector('.car')
    let road = gameArea.getBoundingClientRect();
    // console.log(road)
    if(player.start){

        moveLines()
        moveEnemy(car)
        if(keys.ArrowUp && player.y > (road.top + 150)) {player.y -= player.speed}
        if(keys.ArrowDown && player.y < (road.bottom - 80)) {player.y +=player.speed}
        if(keys.ArrowLeft && player.x > 0) {player.x -=player.speed}
        if(keys.ArrowRight && player.x < (road.width - 50)) {player.x +=player.speed}
         
        car.style.top = player.y + "px"
        car.style.left = player.x + "px"

    window.requestAnimationFrame(gamePlay)
    player.score++
    let ps = player.score - 1
    score.innerText = "Score: "+ ps
    }
}

function start() {
    // gameArea.classList.remove('hide')
    startScreen.classList.add('hide')
    gameArea.innerHTML = ""
    player.start= true
    player.score = 0
    window.requestAnimationFrame(gamePlay)
    //Road Line
    for(x= 0; x<5; x++){
    let roadLine = document.createElement('div');
    roadLine.setAttribute('class','lines');
    roadLine.y = (x*150) 
    roadLine.style.top = roadLine.y +"px"
    gameArea.appendChild(roadLine);
    }
    

    //Car
    let car = document.createElement('div')
    car.setAttribute('class','car')
    gameArea.appendChild(car)

    player.x = car.offsetLeft
    player.y = car.offsetTop
     

    // enemy car
    for(x= 0; x<5; x++){
        let enemyCar = document.createElement('div');
        enemyCar.setAttribute('class','enemy');
        enemyCar.y = ((x+1) * 350 ) * -1
        enemyCar.style.top = enemyCar.y +"px"
        enemyCar.style.left = Math.floor(Math.random()*350)+ "px"
        gameArea.appendChild(enemyCar);
        }

}

 