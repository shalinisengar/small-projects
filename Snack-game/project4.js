 let canvas = document.querySelector('canvas')
 let pen = canvas.getContext('2d')
 let cellsize = 50
 let gameOver=false
 let snackcell=[[0,0]]
 let direction='right'
 let  boardW = 1300
 let boardH = 600
 let count=0
 let generatefoods = function () {
  return([
      Math.round(Math.random()*(boardW-cellsize)/cellsize)*cellsize,

      Math.round(Math.random()*(boardH-cellsize)/cellsize)*cellsize
    ])
 }
 let foodcell = generatefoods()


 document.addEventListener('keydown',(e)=>{
  if(e.key==='ArrowUp'){
    direction='up'
  }
  else if(e.key==='ArrowDown'){
    direction='down'
  }
  else if(e.key==='ArrowLeft'){
    direction='left'
  }
  else{
    direction='right'
  }
 })

 function draw(){
  if(gameOver===true){
    pen.fillStyle= 'red'
    pen.font = '50px sans-serif';
    pen.fillText(`Game over!!!`, 500,300)
    

    clearInterval(id)
    return;
  }
    pen.clearRect(0,0,1350,600)
    for(let cell of snackcell){
      pen.fillStyle='pink'
        pen.fillRect(cell[0],cell[1],cellsize,cellsize)
        pen.strokeStyle='golden';
        pen.strokeRect(cell[0],cell[1],cellsize,cellsize)
    }
    
        pen.font='30px san-sarif'

    pen.fillStyle='green'
    pen.fillRect(foodcell[0],foodcell[1],cellsize,cellsize)
    pen.fillStyle='yellow'
    pen.fillText(`Score :- ${ count }`,50,50)
    pen.font='30px san-sarif'
  }   
 function update(){
  
   let headX= snackcell[snackcell.length-1][0]
   let headY = snackcell[snackcell.length-1][1]

 let newX 
 let newY 
 if(direction == 'right'){
  newX = headX + cellsize
  newY = headY
  if(newX === boardW|| checkmate(newX,newY)){
    gameOver=true
  }
 }
 else if(direction == 'left'){
  newX = headX - cellsize
  newY = headY
  if(newX<0||checkmate(newX,newY)){
    gameOver=true
  }
 }
 else if(direction=='up'){
  newX = headX
  newY = headY - cellsize
  if(newY<0 || checkmate(newX,newY)){
    gameOver=true
  }
 }
 else{
  newX = headX
  newY = headY + cellsize
  if (newY===boardH || checkmate(newX,newY) ){
    gameOver=true
  }
 }

 snackcell.push([newX,newY]);
 if(newX==foodcell[0]&& newY == foodcell[1]){
  foodcell=generatefoods()
  count++
 }
 else{
   snackcell.shift();
  pen.fillStyle='blue'
 }
   
   
 }
 
 let id = setInterval(() => {
   draw()
   update()
 },200)

 function checkmate(newX,newY) {
  for(let item of snackcell){
    if(item[0]===newX && item[1] ===newY){
      return true
    }
  }
  return false
 }
 