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
let Font3;


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
  Font3 = loadFont('brevia7.otf');
}

function setup() {
  createCanvas(600, 600);
  batterType = [0,img1,img2,img3,img4]
  order[0] = int(random(1,5));
  order[1] = int(random(1,5));
  
  for (let i = 0; i < steamNum; i++)
   {
      stmX[i] = random(225,375);
      stmY[i] = random(90,195);
      stmS[i] = random(0.6, 1.05);
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
  button.style('font-size', '15px');
  button.style('font-family', 'Brevia Medium');
  button.style('color', color(250));
  button.style('background-color', colL);
  button.style('border-width', 0);
  button.position(538.5,571.5);
}

function draw(){
  background(back);
  waffleHouse();
}

function drawSpacedText(txt, x, y, extraSpacing) {
  let xOffset = x;
  for (let i = 0; i < txt.length; i++) {
    text(txt[i], xOffset, y);
    xOffset += textWidth(txt[i]) + extraSpacing;
  }
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
        image(waf3, 158.25, 94.5);
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
    translate(300,150);
    textFont(Font1);
    textAlign(CENTER);
    textSize(225);
    fill(colDG);
    text('affle',-4.5, 45);
    text('W',-180, 45);
    textSize(41);
    textFont(Font3);
    drawSpacedText("HOUSE", 119, 30,-2.5);
    noStroke();
    triangle(105, -3, 169.5, -75, 235.5, -3);
    rect(120, -60, 15, 51);
    fill(colO);
    rect(118.5, -60, 18, 6);
    image(waf1, -141.75, 30);
    noStroke();
    fill(color( 50, 51, 53));
    rect(-46.5,210,99,48);
    textSize(25);
    fill(back);
    drawSpacedText('START', -27.5, 244, -1);
    scale(1.05);
    image(wafH, 113, -110);
  pop();
}

// draws a random customer order 
function customerOrder(batterType, order){
  push();
    translate(22.5,10.5);
    push();
      noStroke();
      fill(colL);
      rect(450, 0,114,145.5);
      scale(0.60);
      image(batterType[order[0]], 805, 80);
    pop();
  
    push();
    rect(469.5, 120,75,10.5);
    for (let i = 1; i <= order[1]; i++){
      fill(colR);
      rect(469.5, 120,15*i,10.5);
    }
    pop();

    textFont(Font3);
    textSize(25);
    fill(colB);
    drawSpacedText('ORDER', 466, 37.5, -1);
  pop();
}

// draws the batter cups 
function batter(){ 
    image(waf2, 158.25, 94.5);
    push();
      translate(0,45);
      image(img1, 45, 0);
      image(img2, 45, 135);
      image(img3, 45, 270);
      image(img4, 45, 405);
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
        rect(45,((img_num-1)*135)+45, 81, 111);
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
      image(batterType2[img_num], 228, 339);
      push();
        push();
          stroke(colR);
          fill(250,219,214);
          rect(205.5,492,202.5,45);
        pop();
      
        textAlign(CENTER);
        textFont(Font3);
        textSize(25);
        fill(colR);
        drawSpacedText('READY TO COOK', 221, 524, -1);
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
        steamPiece(75);
        steamPiece(150);
        steamPiece(225);
      pop();
   }
  for (let i = 0; i < steamNum; i++)
   {
      stmY[i] += random(-0.5,-0.05);
      if (stmY[i] < 40 || 110 < stmY[i]){
        stmY[i] = 110;
      } 
   }
}

// draws the steam pieces
function steamPiece(s){
      let sw=random(15,37.5);
      let sh=random(22.5,45);
      noStroke();
      fill(255,255,255,95);
      arc(0, s, sw, sh, 3*PI/2, PI/2);
      arc(0, 37.5+s, sw, sh, PI/2, 3*PI/2);
}

// sets the various clicks 
function mouseClicked(){
  //click to start
  if (mouseX > 195 && mouseX < 405 && mouseY > 270 && mouseY < 484.5 && sceneNum == 0){
    p1_click = true;
    sceneNum++;
  }
  
  //click to pick the batter
  for (let i = 135; i < 541.5; i=i+135){
    if (mouseX > 45 && mouseX < 123 && mouseY > -90+i && mouseY < 15+i && sceneNum == 1){
    type = true;
    one_try += 1;
    img_num = i/135;
    }
  }
      
  //click to pour the batter
  if (mouseX > 195 && mouseX < 405 && mouseY > 300 && mouseY < 450 && sceneNum == 1){
    p2_click++;
  }
  
  //click to cook
  if (mouseX > 213 && mouseX < 402 && mouseY > 492 && mouseY < 537 &&  3 > sceneNum > 0 && p2_click == 2){ 
    p2_cook++;
    sceneNum++;
  }
  
}

// runs clock and prints cook time, prints error if overcooked
function clockStuff(){
    push();
      scale(2);
      translate(114.75,274.5);
      rect(0, 0,75,10.5);
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
        translate(114.75,274.5);
        rect(0, 0,75,10.5);
        fill(colR);
        rect(0, 0,15*fiveSec,10.5);
      pop();
      }
      if (fiveSec > 5){
        push();
          background(230,130,100);
          textAlign(CENTER);
          textFont(Font3);
          textSize(90);
          fill(colR);
          text("IT'S BURNT!", 300, 360);
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
          rect(213,492,187.5,45);
        pop();
      
        textAlign(CENTER);
        textFont(Font3);
        textSize(25);
        fill(colR);
        drawSpacedText('STOP COOK', 228, 525, -1);
        drawSpacedText('I', 357, 525, -1);
        drawSpacedText('NG', 369, 525, -1);
      pop();
}

// checks to see if the order matches what is made. Shows cooked waffle with color corresponding to the batter selection. 
function cookedWaffle(img_num){
    let batterType2 = [0,img1c,img2c,img3c,img4c];
    background(back);
    image(batterType2[img_num], 158.25, 94.5);
    
    if (order[0] == img_num && order[1] == fiveSec){
      textAlign(CENTER);
      textFont(Font1);
      textSize(130.5);
      fill(61,128,110);
      text('Great Job!', 307.5, 550.5);
      count--;
    }
    if (order[0] != img_num || order[1] != fiveSec){
      textAlign(CENTER);
      textFont(Font3);
      textSize(64);
      fill(colR);
      drawSpacedText('W', 100, 555, -5);
      drawSpacedText('RONG ORDER!', 152, 555, -3);
      count--;
    }
}
