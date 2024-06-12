const canvas = document.querySelector("canvas");
// Setting canvas height and width
canvas.height = innerHeight * (2 / 3);
canvas.width = innerWidth;

let canvasHeight = canvas.height;
let canvasWidth = canvas.width;

// Creating context
const c = canvas.getContext("2d");

//accesing game start stop related buttons and adding logic

let gameContainer=document.querySelector(".gameContainer");
let canvasDiv=document.querySelector(".canvasDiv");

let startGame=document.querySelector("#startGame");



// walking animationg

const IdleArray = [];
const runArray = [];
const jumpArray = [];
const dinoRunArray = [];
let  idleImagesLoaded = 0;
let  runImagesLoaded = 0;
let  jumpImagesLoaded = 0;
let  dinoRunLoaded = 0;
const totalIdleImage = 10;
const totalRunImage = 8;
const totalJumpImage = 10;
const totalDinoRunImage = 8;
let runFlag=false;
let idleFlag = false;
let jumpFlag = false;
let dinoRunFlag = false;



// Load images
for (let i = 1; i <= totalIdleImage; i++) {
    let idleState = new Image();
    idleState.src = `./assets/Idle (${i}).png`;
    idleState.onload = () => {
        idleImagesLoaded++;
        if (idleImagesLoaded === totalIdleImage) {
      idleFlag=true;
      checkIfAllImagesLoaded();
        }
    };
    IdleArray.push(idleState);
}
for (let i = 1; i <= totalJumpImage; i++) {
    let jumpState = new Image();
    jumpState.src = `./assets/Jump (${i}).png`;
    jumpState.onload = () => {
        jumpImagesLoaded++;
        if (jumpImagesLoaded === totalJumpImage) {
      jumpFlag=true;
      checkIfAllImagesLoaded();
        }
    };
    jumpArray.push(jumpState);
}
for (let i = 1; i <= totalRunImage; i++) {
    let runState = new Image();
    runState.src = `./assets/Run (${i}).png`;
    runState.onload = () => {
        runImagesLoaded++;
        if (runImagesLoaded === totalRunImage) {
      runFlag = true;
      checkIfAllImagesLoaded();
        }
    };
    runArray.push(runState);
}
for (let i = 1; i <= totalDinoRunImage; i++) {
    let runState = new Image();
    runState.src = `./assets/dinoRun (${i}).png`;
    runState.onload = () => {
        dinoRunLoaded++;
        if (dinoRunLoaded === totalDinoRunImage) {
      dinoRunFlag = true;
      checkIfAllImagesLoaded();
        }
    };
    dinoRunArray.push(runState);
}




let bheem;
function checkIfAllImagesLoaded() {
    if (runFlag && idleFlag && jumpFlag && dinoRunFlag) {
        bheem= new Charector();
        animate();
        showHealth();
        
    }
}











let pauseBtn=document.querySelector("#handlePlay");

let gamePaused = false ;


window.onload =()=>{

    canvasDiv.classList.add("unclickble")
    RateFire.classList.add("hidden");
    mediKit.classList.add("hidden");
    gunTypeBtn.classList.add("hidden")
    reLoad.classList.add("hidden")
    bulletShow.classList.add("hidden");

}

startGame.addEventListener("click" , () => {

    pauseBtn.innerHTML =pauseSvg
    RateFire.classList.remove("hidden");
    mediKit.classList.remove("hidden");
    gunTypeBtn.classList.remove("hidden")
    reLoad.classList.remove("hidden")
    bulletShow.classList.remove("hidden");
    addBlock.remove()
    canvasDiv.classList.remove("unclickble")
    createJombie();
    startGame.remove();
})


const pauseSvg = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
</svg>`
const playSvg = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
</svg>
`


pauseBtn.addEventListener('click', () => {
    gamePaused = !gamePaused; 
    pauseBtn.innerHTML = gamePaused ? playSvg : pauseSvg
    if (gamePaused) {
        // Game is paused, so stop the animation loop
        cancelAnimationFrame(animationID);
        clearInterval(intervalID);
        gameContainer.classList.add("unclickble")
    } else {
        // Game is resumed, so start the animation loop
        animate();
        gameContainer.classList.remove("unclickble")
        createJombie();

    }
});


//adding idea for players health

function PlayerHealth(x,y,color){
   
    this.height=10;
    this.width=10;
    this.x=x;
    this.y=y;
    this.color=color

    this.draw=function (){
        c.fillStyle=this.color
        c.fillRect(this.x,this.y,this.width,this.height);
    }
    this.update=function (){
        this.draw();
    }

}
//showing health on screen
let healthArr = [];

function showHealth(){

     const width=10;
     const height=10;
     let xPos = canvasWidth - canvasWidth/6;
     let yPos =   canvasHeight / 8;

     for(let i=0;i<10;i++){
      let color = i < 3 ? "orange" : "lightgreen"
      let newHealth=new PlayerHealth((xPos + i * width),yPos,color);
      healthArr.push(newHealth);
         
     }

}
//button for using medikit
let mediKit=document.querySelector("#mediKit");
let healthKitCount =2;

mediKit.addEventListener("click",increaseHP);

function increaseHP(){
  if(healthKitCount == 0){
    alert(" You Have Used 2 Medikits !!");
    return;
  }
    if(healthArr.length == 10 ) return;

    if(healthArr.length<10){
   healthArr = [];
   showHealth();
   healthKitCount -- ;
   mediKit.innerText=`HealthKit(${healthKitCount})`

    }


}

//design for backGround 

function backGroundDesign(){

    //line
    c.beginPath();
    c.moveTo(0, canvasHeight - 2 * blockHeight -10); // Start point
    c.lineTo(canvasWidth, canvasHeight - 2 * blockHeight - 10); // End point
    c.strokeStyle = "white"; // Line color
    c.lineWidth = 0.1; // Line width
    c.stroke(); // Draw the line


//moon
    const image = new Image();
    image.src = './assets/moon.jpeg';
    const self = this;
    this.height=100
    this.width=130
    image.onload = () => {
        // Draw the image only after it has loaded
        self.draw();
    };
    c.drawImage(image,0,0, self.width,self.height);
//clouds
   const cloudimage = new Image();
    cloudimage.src = './assets/cloud.png';
    const cloudThis = this;
    this.height=80
    this.width=100
    cloudimage.onload = () => {
        // Draw the image only after it has loaded
        self.draw();
    };
    c.drawImage(cloudimage,canvasWidth/4,5, cloudThis.width,cloudThis.height);
    c.drawImage(cloudimage,canvasWidth* (3/5),canvasHeight/5, cloudThis.width,cloudThis.height);



    //stars
  for(let i=0 ; i< 2 ; i++){
    let radius= Math.random() * 3
    let x= Math.random() * canvasWidth;
    let y = Math.random() * canvasHeight / 2
      c.beginPath();
      c.arc(x,y,radius, 0, 2 * Math.PI);
      c.fillStyle = "whitesmoke";
      c.fill();

  }


 // trees
 let yTree=canvasHeight - 2 * blockHeight - 95;

 const treeImage = new Image();
 treeImage.src = './assets/tree.png';
 const treeSelf = this;
 this.height=95
 this.width=80
 treeImage.onload = () => {
     // Draw the image only after it has loaded
     treeSelf.draw();
 };
 c.drawImage(treeImage,-15,yTree, treeSelf.width,treeSelf.height);
 c.drawImage(treeImage,canvasWidth/3,yTree, treeSelf.width,treeSelf.height);
 c.drawImage(treeImage,canvasWidth *( 2/3),yTree, treeSelf.width,treeSelf.height);
 c.drawImage(treeImage,canvasWidth - 90,yTree, treeSelf.width,treeSelf.height);

  // laptop
  const lapImage = new Image();
  lapImage.src = './assets/laptop.png';
  const lapSelf = this;
  this.height=150
  this.width=180
  lapImage.onload = () => {
      // Draw the image only after it has loaded
      lapSelf.draw();
  };
  c.drawImage(lapImage,canvasWidth/2 -100,canvasHeight - self.height -10, lapSelf.width,lapSelf.height);



    
}


// Function to show the score
let Score=0;
let jombieCount=0;
function showScore() {
    const labelXPos = canvasWidth - canvasWidth / 3;
    const labelYPos = canvasHeight / 8 - 30; 
    c.font = '16px Arial'; 
    c.textAlign = 'left';
    c.textBaseline = 'middle'; 
    c.fillStyle = 'white';
    c.fillText(`Score : ${Score}`, labelXPos, labelYPos);
}




// Creating shooting item for player

let gunType = "tank";

let gunTypeBtn =document.querySelector("#gunType")

gunTypeBtn.addEventListener("click" , () =>{
    //Machine Gun

gunType = gunType == "tank" ? "machineGun" : "tank";

    
})

function createGun() {
    let xPos = canvasWidth / 2 - 30;
    let yPos = 0;
    let gunHeight = canvasHeight / 12;
    let gunWidth = 60;

    // Load the image
    const image = new Image();
    if(gunType == "tank"){
        image.src = './assets/tank.png';
    }else{
        image.src = './assets/machineGun.jpeg';
    }

    const self = this;

    this.x = xPos;
    this.y = yPos;
    this.width = gunWidth;
    this.height = gunHeight;

    this.draw = function() {
        c.drawImage(image, self.x, self.y, self.width, self.height);
    };


    // //to know the logic
    // image.onload = () => {
    //     // Draw the image only after it has loaded
    //     self.draw();
    // };

    if (image.complete) {
        self.draw();
    }
}

let handlerArray = [];
let frame = 0;
let refreshRate =12
let refreshCount = 0;

//declaring surviver
function Charector() {
    let height = canvasHeight / 4 - 10;
    let width = 80;
    let xPos = canvasWidth / 2 - 30;
    let yPos = canvasHeight - canvasHeight / 4;
    
    // Declaring gravity
    const gravity = 0.02; 


    this.x = xPos;
    this.y = yPos;
    this.width = width;
    this.height = height;
    this.velocity = {
        x: 0,
        y: 0
    };

    this.image = IdleArray[0];
    this.state = "Idle"
    this.flipped = false;



    this.draw = function(image) {
     if (image && image.complete) {
                c.save();
        if (this.flipped) {
            // Flip the image horizontally
            c.translate(this.x + this.width / 2, this.y + this.height / 2);
            c.scale(-1, 1);
            c.drawImage(image, -this.width / 2, -this.height / 2, this.width, this.height);
        } else {
            c.drawImage(image,
                this.x,
                this.y,
                this.width,
                this.height);
        }
        c.restore();
    }else{
        c.save();
        if (this.flipped) {
            // Flip the image horizontally
            c.translate(this.x + this.width / 2, this.y + this.height / 2);
            c.scale(-1, 1);
            c.drawImage(handlerArray[5], -this.width / 2, -this.height / 2, this.width, this.height);
        } else {
            c.drawImage(handlerArray[5],
                this.x,
                this.y,
                this.width,
                this.height);
        }
        c.restore();
    }
    };

    this.update = function() {
        let isOnBlock = false;
        for (let i = 0; i < blockArray.length; i++) {
            const block = blockArray[i];
            
            // Check if the character is above the block and within the block's width
            if (
                this.x < block.x + block.width &&
                this.x + this.width > block.x &&
                this.y + this.height <= block.y &&
                this.y + this.height + this.velocity.y >= block.y
            ) {
                // Character is on the block
                this.velocity.y = 0;
                isOnBlock = true;
                break;
            }
        }
        
        // If not on a block, apply gravity and check for ground collision
        if (!isOnBlock) {
            if (this.y + this.height + this.velocity.y <= canvasHeight) {
                this.velocity.y += gravity;
                this.y += this.velocity.y;
            }
             else {
                // If character hits the ground, reset velocity
                this.y = canvasHeight - this.height;
                this.velocity.y = 0;
            }
        }
            if(this.state == "Idle"){
        handlerArray = IdleArray
       }else if(this.state == "run"){
        handlerArray =runArray
       }else if(this.state == "jump"){
        handlerArray = jumpArray
       }
        refreshCount++;
        if(refreshCount == refreshRate){
            frame++;
            if (frame >= handlerArray.length) {
                frame = 0;
            }
            refreshCount =0
    
        }




        
     this.draw(handlerArray[frame]);
     };
}






//logic for movement

//adding keyBased movment for ease in PC
document.addEventListener('keydown', handleKeyPressed);
document.addEventListener('keyup', handleKeyUp);
let collision;



function handleKeyPressed(event) {
// console.log(event.key)
    switch (event.key) {
      case 'w':
        if(bheem.velocity.y < 0) return;
        // if(!onceJump) return;
        bheem.velocity.y = 0;
        bheem.velocity.y = -2.5 ;
             bheem.state = "jump"
             
        break;
      case 'a':
        collision = false
        blockArray.forEach(block => {
            if((bheem.x - 5 < block.x + block.width && bheem.x + bheem.width > block.x + block.width) &&
            (bheem.y + bheem.height > block.y && bheem.y < block.y + block.height)){
                collision = true;
                
            }
        })
        if(!collision   && (bheem.x - 5 > 0)){
        bheem.state = "run"
        bheem.flipped= true
        bheem.x -= 5

        }
        break;
      case 'd':
        collision = false
        blockArray.forEach(block => {
            if((bheem.x + bheem.width + 5 > block.x && bheem.x < block.x + block.width) &&
            (bheem.y + bheem.height > block.y && bheem.y < block.y + block.height) ){
                collision = true;
                
            }
        })
    
        if(!collision && (bheem.x + bheem.width + 5 < canvasWidth)){
            bheem.state = "run"
            bheem.x += 6
        }
        break;
      default:
        return;
    }
  }
function handleKeyUp(event) {
    switch (event.key) {
      case 'w':
             bheem.state = "Idle"
        break;
      case 'a':
        bheem.state= "Idle";
        bheem.flipped=false
        break;
      case 'd':
        bheem.state= "Idle"
        break;

      default:
        return;
    }
  }








//declaring variable for player zone, 

const startPlayerZone = canvasWidth / 3;
const endPlayerZone = canvasWidth * ( 2/3 );
const blockWidth=100;
const blockHeight=canvasHeight/4 - 10;
const blockArray=[];



 

  
//adding blocks for barrier
function Block(x,y,color){

    // Load the image
    const image = new Image();
    image.src = './assets/brickWall.jpeg';
    const self = this;
const gravity=0.005;
this.x=x;
this.y=y;
this.height=blockHeight;
this.width=blockWidth;
this.color=color
this.velocity={
    x:0,
    y:0
}

image.onload = () => {
    // Draw the image only after it has loaded
    self.draw();
};

this.draw=function(){
    c.drawImage(image, self.x, self.y, self.width, self.height);
}
this.update=function(){

    

    if((this.velocity.y)){
        if( (this.y + this.height + this.velocity.y < canvas.height)){
        
            this.y += this.velocity.y;
            this.velocity.y += gravity
        }
        else{
            this.y = canvasHeight - this.height;
            this.velocity.y =0;
        }

    }
   

 this.draw();
}

}  
//button for adding block
let addBlock = document.querySelector("#addBlock");
addBlock.addEventListener("click",placeInitialBlocks)



function placeInitialBlocks() {
    let placeFlag =true

 if(blockArray.length >= 6){
    alert("You can Maximum place 6 blocks");
    return;
 }   
  
    
if(blockArray.length){
blockArray.forEach(block => {
if(bheem.x < block.x + block.width && 
    bheem.x + blockWidth > block.x &&
    bheem.y > block.y
){
    placeFlag = false;
}
})
}

if(!placeFlag){
    alert("No sufficient Place , please select other place")
}
else{

    if(bheem.y < canvasHeight/2 - 20){
        alert("you can place only 2 block in a coloumn")
        return
    }

    let newBlock=new Block(bheem.x,bheem.y ,"brown");
    blockArray.push(newBlock)
    bheem.y =bheem.y - bheem.height  ;
}


}




//declaring particles to add jombie remove effect
const parcticleArray = [];
function Particle(x,y,color){
    const gravity=0.01;
    this.x=x;
    this.y=y;
   this.radius =(Math.random() * 4) + 0.5
    this.color=color
    this.velocity={
        x:(Math.random() - 0.5 ) ,
        y:(Math.random() - 0.5 ) 
    }

    this.draw=function(){
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        c.fillStyle = this.color;
        c.fill();
    }
    this.update=function(){

        if( this.y < canvasHeight){
            this.x += this.velocity.x;
            this.y += this.velocity.y;
            this.velocity.y +=gravity;
        }


    this.draw();
    }

} 

// Creating bullet
function Bullet(direction) {

    const image = new Image();
    image.src = './assets/bomb.png';
    const self = this;

    // Ensuring the bullet should originate from gun
    let x = canvasWidth / 2 - 5; // Adjust x to originate from the center of the gun
    let y = canvasHeight / 12 -25; // Adjust y to originate from the top of the gun
    let size = 25;
    let color = "red";
    let gravity = 0.015;


    this.gravity=gravity
    this.x = x;
    this.y = y;
    this.velocity = {
        x: direction === 'left' ? -2.2 : 2.2,
        y: 0.5
        ,
    };
    this.size = size;
    this.color = color;
    image.onload = () => {
        // Draw the image only after it has loaded
        self.draw();
    };

    this.draw = function() {
 
        // c.fillStyle = this.color;
        // c.fillRect(this.x, this.y, this.size, this.size);
        c.drawImage(image, self.x, self.y, self.size,self.size);

    };

    this.update = function() {
        this.draw();
        // Applying gravity
        this.velocity.y += this.gravity;
        this.x += this.velocity.x;
        this.y += this.velocity.y;
    };
}

//adding reload logic
let bulletShow = document.querySelector("#bulletCount");
let reLoad = document.querySelector("#reLoad");
let bulletCount =50

function bulletCountShow(){
    bulletShow.innerText = `Bullet : ${bulletCount}`
}
reLoad.addEventListener("click" , () => {
    setTimeout(()=>{
        bulletCount = 50;
    },2000)

})

// initialising bullet array to keep eye upon bullets
const bulletArray = [];

// 


// event listener on the canvas such that bullet will be released according to the side

let RateFire=document.querySelector("#RateFire");

let rateFireFlag = false;
RateFire.addEventListener("click", ()=>{
    rateFireFlag = !rateFireFlag;
    RateFire.innerText = RateFire.innerText == "Fire++" ? "Fire--" : "Fire++"
})


canvas.addEventListener("click", (event) => {
    const clickX = event.clientX;
    let direction = clickX < canvasWidth * (1/3) ? 'left' : clickX >  canvasWidth * (2/3) ? 'right' : null;
    
    if (direction && bulletCount > 0) { //&& startFlag
        let newBullet = new Bullet(direction);
        if(gunType == "machineGun"){
            newBullet.gravity = 0;
            newBullet.velocity.y = 5;
            newBullet.velocity.x= direction == "right" ? 4 : -4
        }
        //bullet decrease logic
       if(bulletCount - 1 <= 0) return; 
          bulletCount --;
        bulletArray.push(newBullet);
        if(rateFireFlag){

            setTimeout(()=>{
                let newBullet = new Bullet(direction);
                if(gunType == "machineGun"){
                    newBullet.gravity = 0;
                    newBullet.velocity.y = 5;
                    newBullet.velocity.x= direction == "right" ? 4 : -4
                }
                //decreasing bullet value
                if(bulletCount -1 <= 0) return; 
                bulletCount --;
                bulletArray.push(newBullet);
            },100)
            setTimeout(()=>{
                let newBullet = new Bullet(direction);
                if(gunType == "machineGun"){
                    newBullet.gravity = 0;
                    newBullet.velocity.y = 5;
                    newBullet.velocity.x= direction == "right" ? 4 : -4
                }
                //bulet decrease
                if(bulletCount -1 < 0) return; 
                bulletCount --;
                bulletArray.push(newBullet);
            },200)
 
        }

    }

});



// Jombie creation and movement logic
let dinoHandlerArray = [];
let dinoFrame = 0;
let dinoRefreshRate =8
let dinoRefreshCount = 0;
function Jombie() {
    
    gravity=0.05
     // Ensuring the jombie should originate from the start
    let height = canvas.height / 4 - 10 ;
    let width = 50;
    let x = 0;
    let y = canvas.height - height;
    let color = "green";
    
    
    this.x = x;
    this.y = y;
   //idea to increase speed with time interval
   let speedX = .8;



    this.velocity = {
        x: speedX,
        y: 0,
    };
    this.height = height;
    this.width = width;
    this.color = color;


    // this.image = dinoRunArray[0];
    this.state = "run"
    this.flipped = false;

    this.draw = function(image) {
        if (image && image.complete) {
            c.save();
            if (this.flipped) {
                // Flip the image horizontally
                c.translate(this.x + this.width / 2, this.y + this.height / 2);
                c.scale(-1, 1);
                c.drawImage(image, -this.width / 2, -this.height / 2, this.width, this.height);
            } else {
                c.drawImage(image,
                    this.x,
                    this.y,
                    this.width,
                    this.height);
            }
            c.restore();
        }else{
            c.save();
            if (this.flipped) {
                // Flip the image horizontally
                c.translate(this.x + this.width / 2, this.y + this.height / 2);
                c.scale(-1, 1);
                c.drawImage(dinoRunArray[5], -this.width / 2, -this.height / 2, this.width, this.height);
            }else{
                c.drawImage(dinoRunArray[5],
                    this.x,
                    this.y,
                    this.width,
                    this.height);
            }
            c.restore();

        }
    };

    this.update = function() {


        let isOnBlock = false;
        for (let i = 0; i < blockArray.length; i++) {
            const block = blockArray[i];
            
            // Check if the character is above the block and within the block's width
            if (
                this.x < block.x + block.width &&
                this.x + this.width > block.x &&
                this.y + this.height <= block.y &&
                this.y + this.height + this.velocity.y >= block.y
            ) {
                // Character is on the block
                this.y = block.y - this.height;
                this.velocity.y = 0;
                isOnBlock = true;
                break;
            }
        }
        
        // If not on a block, apply gravity and check for ground collision
        if (!isOnBlock) {
            if (this.y + this.height + this.velocity.y <= canvasHeight) {
                this.velocity.y += gravity;
                this.y += this.velocity.y;
            }
             else {
                // If character hits the ground, reset velocity
                this.y = canvasHeight - this.height;
                this.velocity.y = 0;
            }
        }



        if(this.state == "run"){
            dinoHandlerArray = dinoRunArray
           }
           dinoRefreshCount++;
           if(dinoRefreshCount == dinoRefreshRate){
               dinoFrame++;
               if (dinoFrame >= dinoHandlerArray.length) {
                   dinoFrame = 0;
               }   
               dinoRefreshCount =0
       
           }

        this.x += this.velocity.x;
        this.y += this.velocity.y;

        this.draw(dinoHandlerArray[frame]);
    };
}

//array for storing jombie and interval handling id
const jombieArray = [];
let intervalID;

function createJombie() {
    function start() {
        // Selecting direction
        let direction = Math.floor(Math.random() * 2);
        // 1 for right 0 for left direction
        let newJombie = new Jombie();
        if (direction) {
            jombieArray.push(newJombie);
        } else {
            newJombie.flipped = true
            newJombie.x = canvas.width - newJombie.width;
            newJombie.velocity.x = -newJombie.velocity.x;
            jombieArray.push(newJombie);
        }
    }
    intervalID=setInterval(start, 4000);
} 


//collision logics

function collisionCheckBullet(bullet, jombie, jombieIndex, bulletIndex) {
    // Check if the bullet overlaps with the jombie
    if (bullet.x < jombie.x + jombie.width && 
        bullet.x + bullet.size > jombie.x &&
        bullet.y < jombie.y + jombie.height &&
        bullet.y + bullet.size > jombie.y) {
        // Remove jombie and bullet from their arrays
        for(let i=0 ; i< 20 ; i++){
            let newParticle = new Particle(jombie.x + jombie.width , jombie.y + jombie.height/2  ,jombie.color)
            parcticleArray.push(newParticle);
        } 
        //updating scoree   
        Score += 10;
        jombieCount++;
        jombieArray.splice(jombieIndex, 1);
        bulletArray.splice(bulletIndex, 1);
    }
}
function collisionCheckBlock(block, jombie, jombieIndex, blockIndex) {
    // Check if the bullet overlaps with the jombie
    if ((jombie.x + jombie.width + jombie.velocity.x > block.x && jombie.x < block.x + block.width) &&
    (jombie.y + jombie.height > block.y && jombie.y < block.y + block.height)){
      console.log("entered")
      jombie.y = block.y - jombie.height;
      jombie.x =jombie.x;
        
    }


}


function checkBelowBheem() {


    if(bheem.y + bheem.height == canvasHeight) return;

  
    
    let moveFlag=true;
    let opposeBlock;
    blockArray.forEach((item) => {
        if ((item.x + item.width > bheem.x && 
            item.x < bheem.x + bheem.width && 
            item.y  > bheem.y)){
                // console.log(" got the oppose")
                moveFlag=false;
                opposeBlock=item
            }
    })

    if(!moveFlag && bheem.y + bheem.height + bheem.velocity.y >= opposeBlock.y){
         bheem.y = opposeBlock.y -bheem.height
    }

}



function collisionCheckSurviver(surviver,jombie, jombieIndex) {
    // Check if the bullet overlaps with the jombie
    if ((jombie.x + jombie.width > surviver.x + 5 && jombie.x + 5 < surviver.x + surviver.width) &&
    (jombie.y + jombie.height > surviver.y && jombie.y < surviver.y + surviver.height - 5)){
        for(let i=0 ; i< 20 ; i++){
            let newParticle = new Particle(jombie.x + jombie.width , jombie.y + jombie.height/2 ,jombie.color)
            parcticleArray.push(newParticle);
        }
        //updating score
        Score += 15 ;
        jombieCount++;
        jombieArray.splice(jombieIndex,1);
        healthArr.pop()

    }


}



// Function to draw the health label
function drawHealthLabel() {
    const labelXPos = canvasWidth - canvasWidth / 6;
    const labelYPos = canvasHeight / 8 - 30; 
    c.font = '16px Arial'; 
    c.textAlign = 'left';
    c.textBaseline = 'middle'; 
    c.fillStyle = 'white';
    c.fillText(`Health : ${healthArr.length} / 10 `, labelXPos, labelYPos);
}
function checkFlyingBlock(block) {
    
    let moveFlag=true;
    blockArray.forEach((item) => {
        if ((item.x + item.width > block.x && 
            item.x < block.x + block.width && 
            item.y  > block.y)){
                moveFlag=false;
                
            }
    })

    if(moveFlag){

        //giving a velocity to block
        block.velocity.y = 0.5;
    }

}


// Animation Loop
function animate() { 
   
    animationID = requestAnimationFrame(animate);

    if (gamePaused) return;
 
    c.clearRect(0, 0, canvas.width, canvas.height);
   
   backGroundDesign();
    createGun();
    bheem.update()
    drawHealthLabel();
    showScore()
    checkBelowBheem();
    bulletCountShow()
    
  

parcticleArray.forEach(particle => {
    particle.update();
})
parcticleArray.forEach((particle , index) => {
    if(particle.x > canvasWidth || particle.x < 0 || particle.y >canvasHeight){
        parcticleArray.splice(index,1)
    }
})


blockArray.forEach(block => {
    checkFlyingBlock(block)
})
       
    bulletArray.forEach((bullet, index) => {
        if (bullet.y > canvas.height) {
            bulletArray.splice(index, 1);
        }
    });


    jombieArray.forEach((jombie, index) => {
        if ((jombie.x + jombie.width) > canvas.width || jombie.x < 0) {
            jombieArray.splice(index, 1);
        }
    });
     
    //checking collision with player;
     jombieArray.forEach((jombie , jombieIndex) => {
     collisionCheckSurviver(bheem,jombie,jombieIndex)
    })

    //checking collision with bullet
    jombieArray.forEach((jombie,jombieIndex) => {
        bulletArray.forEach((bullet,bulletIndex) => {
        collisionCheckBullet(bullet,jombie,jombieIndex,bulletIndex)
        })
    })

    jombieArray.forEach((jombie,jombieIndex) => {
        blockArray.forEach((block,blockIndex) => {
        collisionCheckBlock(block, jombie, jombieIndex, blockIndex)
   
        })
    })


//updating current state of bullet and jombie
    bulletArray.forEach((bullet) => {
        bullet.update();
    });
    jombieArray.forEach((jombie) => {
        jombie.update();
    });

    //adding blocks 
    blockArray.forEach(block => {
        block.update();
    })
    //checking if block can move down


//
healthArr.forEach(health => {
    health.update()
})  

if((healthArr.length == 0) && Score){
    gameOver();
}
}

let gameOverContainer=document.querySelector(".gameOver");
let gameOverParent=document.querySelector(".gameOverParent");
// let gameContainer=document.querySelector(".gameContainer");   => defined above


function gameOver(){

  gameContainer.classList.add("hidden")
   gameOverParent.classList.remove("hidden");

    let score= document.createElement("p");
    score.innerText = `Your Score is : ${Score}`
    let jombieKilled = document.createElement("p");
    jombieKilled.innerText = `You have killed a total ${jombieCount} jombies !!`
    
     let newGame =document.createElement("button");
     newGame.innerText =" Let's Have a New Game "

     gameOverContainer.appendChild(score);
     gameOverContainer.appendChild(jombieKilled);
     gameOverContainer.appendChild(newGame);

     //clearing both frames
     clearInterval(intervalID)
     cancelAnimationFrame(animationID);


   newGame.addEventListener("click",()=>{
    location.reload();
   })

}





