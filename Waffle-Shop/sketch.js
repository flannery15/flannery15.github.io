// scene
let sceneNum = 0;

// waffles
let waf1;
let waf2;
let waf3;

// batter images
let img1;
let img2;
let img3;
let img4;
let batterType = [];

// clicks 
let p1_click = false;
let p2_click = 0;
let p2_cook = 0;
let p3_cook = 0;
let type = false;
let img_num = 0;
let one_try = 0;

// steam 
let stmX = [];
let stmY = [];
let stmS = [];
let sw = [];
let sh = [];
let steamNum = 10;

// fonts
let Font1;
let Font2;

// checks the order
let order = [];
let made = [];

// clock
let count = 0;
let second = 0;
let fiveSec = 0;

// images for the scene
function preload() {
  waf1 = loadImage("waffle_iron-01.png");
  waf2 = loadImage("waffle_iron2-01.png");
  waf3 = loadImage("iron_closed-01.png");
  wafH = loadImage("smoke.png");
  
  img1 = loadImage("cup_pink-01.png");
  img2 = loadImage("cup_plain-01.png");
  img3 = loadImage("cup_brown-01.png");
  img4 = loadImage("cup_yellow-01.png");
  
  img1b = loadImage("pour_pink-01.png");
  img2b = loadImage("pour_plain-01.png");
  img3b = loadImage("pour_brown-01.png");
  img4b = loadImage("pour_yellow-01.png");
  
  img1c = loadImage("iron_pink-01.png");
  img2c = loadImage("iron_plain-01.png");
  img3c = loadImage("iron_brown-01.png");
  img4c = loadImage("iron_yellow-01.png");
  
  Font1 = loadFont('Sensations and Qualities.ttf');
  Font2 = loadFont('BarlowCondensed-Medium.ttf');
}

function setup() {
  createCanvas(400, 400);
  
  batterType = [0,img1,img2,img3,img4]
  order[0] = int(random(1,5));
  order[1] = int(random(1,5));
  
  for (let i = 0; i < steamNum; i++)
   {
      stmX[i] = random(150,250);
      stmY[i] = random(60,130);
      stmS[i] = random(0.4, 0.7);
   }
     
  //colors
  col = color(140, 92, 17);
  colB = color(235, 237, 235);
  colL = color(205, 207, 205);
  colR = color(187, 87, 0);
  back = color(235, 237, 235);
  colDG = color(57,94,45);
  colMG = color(107,119,112);
  colO = color(187, 87, 0);
  
  button = createButton("RESET");
  button.style('font-size', '12px');
  button.style('font-family', 'BarlowCondensed-Medium');
  button.style('color', color(250));
  button.style('background-color', colL);
  button.style('border-width', 0);
  button.position(359,381);
}

function draw(){
  background(back);
  waffleHouse();
}

// calls the different scenes
function waffleHouse(){
  
  titlePage();
  switch (sceneNum){
    case 1: 
        if (p1_click){
        background(back);
        batter();
        moveBatter(img_num);
        customerOrder(batterType, order);
        }
      button.mousePressed(reset);
    break;
    
    case 2:
      if (p2_cook){ 
        background(back);
        image(waf3, 105.5, 63);
        drawSteams();
        customerOrder(batterType, order); 
        endCooking();
        clockStuff();
      }
      button.mousePressed(reset);
    break;
    
    case 3:
      if (p2_cook == 2){ 
        cookedWaffle(img_num);
        }
      
      button.mousePressed(reset);
    break;
  }
}

function reset(){
  window.location.reload();
}

// makes the title page to start the game
function titlePage(){
  push();
    translate(200,100);
    textFont(Font1);
    textAlign(CENTER);
    textSize(150);
    fill(colDG);
    text('affle',-3, 30);
    text('W',-120, 30);
    textSize(40);
    textFont(Font2);
    text('HOUSE', 113, 30);
    noStroke();
    triangle(70, -2, 113, -50, 157, -2);
    rect(80, -40, 10, 34);
    fill(colO);
    rect(79, -40, 12, 4);
    image(waf1, -94.5, 20);
    noStroke();
    fill(color( 50, 51, 53))
    rect(-31,140,66,32)
    textSize(25);
    fill(back);
    text('START', 2, 166);
  
    scale(0.7);
    image(wafH, 113, -110);
  pop();
}

// draws a random customer order 
function customerOrder(batterType, order){
  push();
    translate(15,7);
    push();
      noStroke();
      fill(colL);
      rect(300, 0,76,97);
      scale(0.5);
      image(batterType[order[0]], 647, 65);
    pop();
  
    push();
    rect(313, 80,50,7);
    for (let i = 1; i <= order[1]; i++){
      fill(colR);
      rect(313, 80,10*i,7);
    }
    pop();

    textFont(Font2);
    textSize(22);
    fill(colB);
    text('ORDER', 313, 25);
  pop();
}

// draws the batter cups 
function batter(){ 
    image(waf2, 105.5, 63);
    push();
      translate(0,30)
      image(img1, 30, 0);
      image(img2, 30, 90);
      image(img3, 30, 180);
      image(img4, 30, 270);
    pop();
}

// allows batter to be moved when clicked
function moveBatter(img_num){
  if (type){
    background(back);
    batter();
    push();
        noStroke();
        fill(back);
        rect(30,((img_num-1)*90)+30, 54, 74)
    pop();
    image(batterType[img_num], mouseX, mouseY);
    placeBatter(img_num);
  }
}

// releases blob of batter when clicked
function placeBatter(img_num){
  let batterType2 = [0,img1b,img2b,img3b,img4b];
    if (p2_click > 1 && p2_click < 3 && one_try==1){
      background(back);
      batter();
      image(batterType2[img_num], 152, 226);
      push();
        push();
          stroke(colR);
          fill(250,219,214);
          rect(142,328,125,30);
        pop();
      
        textAlign(CENTER);
        textFont(Font2);
        textSize(20);
        fill(colR);
        text('READY TO COOK', 204, 350);
      pop();
    }
}

// draws and updates the steam
function drawSteams(){
  for (let i = 0; i < steamNum; i++)
   {
      push();
        translate(stmX[i], stmY[i]);
        scale(stmS[i]);
        steamPiece(50);
        steamPiece(100);
        steamPiece(150);
      pop();
   }
  for (let i = 0; i < steamNum; i++)
   {
      stmY[i] += random(-0.5,-0.05);
      if (stmY[i] < 60 || 130 < stmY[i]){
        stmY[i] = 130;
      } 
   }
}

// draws the steam pieces
function steamPiece(s){
      let sw=random(10,25);
      let sh=random(15,30);
      noStroke();
      fill(255,255,255,95);
      arc(0, s, sw, sh, 3*PI/2, PI/2);
      arc(0, 25+s, sw, sh, PI/2, 3*PI/2);
}

// sets the various clicks 
function mouseClicked(){
  //click to start
  if (mouseX > 130 && mouseX < 270 && mouseY > 180 && mouseY < 323 && sceneNum == 0){
    p1_click = true;
    sceneNum++;
  }
  
  //click to pick the batter
  for (let i = 90; i < 361; i=i+90){
    if (mouseX > 30 && mouseX < 82 && mouseY > -60+i && mouseY < 10+i && sceneNum == 1){
    type = true;
    one_try += 1;
    img_num = i/90;
    }
  }
      
  //click to pour the batter
  if (mouseX > 130 && mouseX < 270 && mouseY > 200 && mouseY < 300 && sceneNum == 1){
    p2_click++;
  }
  
  //click to cook
  if (mouseX > 142 && mouseX < 268 && mouseY > 328 && mouseY < 358 &&  3 > sceneNum > 0 && p2_click == 2){
    p2_cook++;
    sceneNum++;
  }
  
}

// runs clock and prints cook time, prints error if overcooked
function clockStuff(){
    push();
      scale(2);
      translate(76.5,183);
      rect(0, 0,50,7);
    pop();
  
    count++;
    if (count % 60 == 0)
    {
        second++;
      if (second%5 == 0)
        {
        fiveSec++;
        }
    }

    for (let i = 0; i < 6; i++){
      if (i < fiveSec && fiveSec < 6){
      push();
        scale(2);
        translate(76.5,183);
        rect(0, 0,50,7);
        fill(colR);
        rect(0, 0,10*fiveSec,7);
      pop();
      }
      if (fiveSec > 5){
        push();
          background(230,130,100);
          textAlign(CENTER);
          textFont(Font2);
          textSize(85);
          fill(colR);
          text("IT'S BURNT!", 200, 240);
        pop();
      }  
    i++;
    }
}

// draws "button" to end cooking process
function endCooking(){
      push();
        push();
          stroke(colR);
          fill(250,219,214);
          rect(142,328,125,30);
        pop();
      
        textAlign(CENTER);
        textFont(Font2);
        textSize(20);
        fill(colR);
        text('STOP COOKING', 204, 350);
      pop();
}

// checks to see if the order matches what is made. Shows cooked waffle with color corresponding to the batter selection. 
function cookedWaffle(img_num){
    let batterType2 = [0,img1c,img2c,img3c,img4c];
    background(back);
    image(batterType2[img_num], 105.5, 63);
    
    if (order[0] == img_num && order[1] == fiveSec){
      textAlign(CENTER);
      textFont(Font1);
      textSize(87);
      fill(61,128,110);
      text('Great Job!', 205, 367);
      count--;
    }
    if (order[0] != img_num || order[1] != fiveSec){
      textAlign(CENTER);
      textFont(Font2);
      textSize(60);
      fill(colR);
      text('WRONG ORDER!', 200, 370);
      count--;
    }
}







