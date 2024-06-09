const canvas = document.querySelector("canvas");
// Setting canvas height and width
canvas.height = innerHeight * (2 / 3);
canvas.width = innerWidth;

let canvasHeight = canvas.height;
let canvasWidth = canvas.width;

// Creating context
const c = canvas.getContext("2d");

//accesing game start stop related buttons and adding logic
let pauseBtn=document.querySelector("#handlePlay");
let startGame=document.querySelector("#startGame");
let gameContainer=document.querySelector(".gameContainer");
let createBase=document.querySelector("#createBase");


let gamePaused = false ;


window.onload =()=>{
    pauseBtn.classList.add("hidden");
    gameContainer.classList.add("unclickble")

}

startGame.addEventListener("click" , () => {
    pauseBtn.classList.remove("hidden");
    gameContainer.classList.remove("unclickble")
    createJombie();
    startGame.remove();
})


pauseBtn.addEventListener('click', () => {
    gamePaused = !gamePaused; // Toggle the gamePaused variable
    pauseBtn.innerText = gamePaused ? "Resume" : "Pause"
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

createBase.addEventListener("click",()=>{
    placeInitialBlocks();
    createBase.remove();

})
//design for backGround 

function backGroundDesign(){

    c.beginPath();
    c.moveTo(0, canvasHeight - 2 * blockHeight); // Start point
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
  
        let radius= Math.random() * 3
        let x= Math.random() * canvasWidth;
        let y = Math.random() * canvasHeight / 3 +20
          c.beginPath();
          c.arc(x,y,radius, 0, 2 * Math.PI);
          c.fillStyle = "whitesmoke";
          c.fill();





    
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

function createGun() {
    let xPos = canvasWidth / 2 - 30;
    let yPos = 0;
    let gunHeight = canvasHeight / 12;
    let gunWidth = 60;

    // Load the image
    const image = new Image();
    image.src = './assets/tank.png';
    const self = this;

    this.x = xPos;
    this.y = yPos;
    this.width = gunWidth;
    this.height = gunHeight;

    this.draw = function() {
        c.drawImage(image, self.x, self.y, self.width, self.height);
    };


    //to know the logic
    image.onload = () => {
        // Draw the image only after it has loaded
        self.draw();
    };

    // Optionally, you can draw the image initially if it's already loaded
    if (image.complete) {
        self.draw();
    }
}


//declaring surviver
function Charector() {
    let height = canvasHeight / 4 - 10;
    let width = 80;
    let xPos = canvasWidth / 2 - 30;
    let yPos = canvasHeight - canvasHeight / 4;
    
    // Declaring gravity
    const gravity = 0.01; 

    // Load the image
    const image = new Image();
    image.src = './assets/charecter.png';
    const self = this;

    this.x = xPos;
    this.y = yPos;
    this.width = width;
    this.height = height;
    this.velocity = {
        x: 0,
        y: 0
    };

    image.onload = () => {
        // Draw the image only after it has loaded
        self.draw();
    };

    this.draw = function() {
        c.drawImage(image, self.x, self.y, self.width, self.height);
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
            } else {
                // If character hits the ground, reset velocity
                this.y = canvasHeight - this.height;
                this.velocity.y = 0;
            }
        }
        
        this.draw();
    };
}


const bheem= new Charector();



//logic for movement of charector

const leftKey =document.querySelector("#leftKey");
const rightKey =document.querySelector("#rightKey");


document.addEventListener("keydown",() => {
    if (event.keyCode === 32){
        if(bheem.y + bheem.height < canvasHeight) return;
        bheem.velocity.y = 0;
        bheem.velocity.y = -2   ;
    }

 

})

rightKey.addEventListener("click" , () => {

    let collision = false
    blockArray.forEach(block => {
        if((bheem.x + bheem.width + 5 > block.x && bheem.x < block.x + block.width) &&
        (bheem.y + bheem.height > block.y && bheem.y < block.y + block.height)){
            collision = true;
            
        }
    })

    if(!collision){
        bheem.x += 5
    }


})
leftKey.addEventListener("click" , () => {
    let collision = false
    blockArray.forEach(block => {
        if((bheem.x - 5 < block.x + block.width && bheem.x > block.x + block.width) &&
        (bheem.y + bheem.height > block.y && bheem.y < block.y + block.height)){
            collision = true;
            
        }
    })

    if(!collision){
        bheem.x -= 5
    }
})



//declaring variable for player zone, 

const startPlayerZone = canvasWidth / 3;
const endPlayerZone = canvasWidth * ( 2/3 );
const blockWidth=100;
const blockHeight=canvasHeight/4 - 10;

const blockArray=[];



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




function placeInitialBlocks() {
    

    let postionArr=[
        {x:startPlayerZone, y :(canvasHeight -  blockHeight),color:"#AA4A44"},
        {x:startPlayerZone -blockWidth, y :(canvasHeight -  2 * blockHeight),color:" #B22222 "},
        {x:startPlayerZone-blockWidth, y :(canvasHeight  -  blockHeight),color:"#BC4A3C"},
        {x:endPlayerZone - blockWidth, y :(canvasHeight -  blockHeight),color:" #B22222 "},
        {x:endPlayerZone - blockWidth/2, y :(canvasHeight -  2 * blockHeight),color:"#BC4A3C"},
        {x:endPlayerZone, y :(canvasHeight -  blockHeight),color:"#AA4A44"},
    ]
    postionArr.forEach( block => {
        let newBlock=new Block(block.x,block.y,block.color);
        blockArray.push(newBlock)
    })


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
    let gravity = 0.01;



    this.x = x;
    this.y = y;
    this.velocity = {
        x: direction === 'left' ? -2.2 : 2.2,
        y: 0.3
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
        this.velocity.y += gravity;
        this.x += this.velocity.x;
        this.y += this.velocity.y;
    };
}


// initialising bullet array to keep eye upon bullets
const bulletArray = [];

// 


// event listener on the canvas such that bullet will be released according to the side
canvas.addEventListener("click", (event) => {
    const clickX = event.clientX;
    let direction = clickX < canvasWidth * (1/3) ? 'left' : clickX >  canvasWidth * (2/3) ? 'right' : null;
    
    if (direction) { //&& startFlag
        let newBullet = new Bullet(direction);
        bulletArray.push(newBullet);
    }
});

// Jombie creation
function Jombie() {


   // Load the image
   const image = new Image();
    image.src = './assets/jombie.png';
    const self = this; 

    // Ensuring the jombie should originate from the start
    let height = canvas.height / 4 - 20 ;
    let width = 40;
    let x = 0;
    let y = canvas.height - height;
    let color = "whitesmoke";

    this.x = x;
    this.y = y;
   //idea to increase speed with time interval
   let speedX;
   if(Score >300){
    speedX = 1.3
   }else if(Score > 200){
    speedX =.9
   } else if(Score >100){
    speedX=.7
   }else{
    speedX=0.6
   }


    this.velocity = {
        x: speedX,
        y: 0,
    };
    this.height = height;
    this.width = width;
    this.color = color;
    image.onload = function() {
        // Draw the image only after it has loaded
        self.draw();
    };

    this.draw = function() {
        // c.fillStyle = this.color;
        // c.fillRect(this.x, this.y, this.width, this.height);
        c.drawImage(image, self.x, self.y, self.width,self.height);
    };

    this.update = function() {
        this.draw();
        this.x += this.velocity.x;
        this.y += this.velocity.y;
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
            newJombie.x = canvas.width - newJombie.width;
            newJombie.velocity.x = -newJombie.velocity.x;
            jombieArray.push(newJombie);
        }
    }
    intervalID=setInterval(start, 4500);
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
            let newParticle = new Particle(bullet.x , bullet.y + bullet.size ,jombie.color)
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
    if ((jombie.x + jombie.width > block.x && jombie.x < block.x + block.width) &&
    (jombie.y + jombie.height > block.y && jombie.y < block.y + block.height)){
        for(let i=0 ; i< 20 ; i++){
            let newParticle = new Particle(block.x + block.width/2,block.y + block.height/2 ,block.color)
            parcticleArray.push(newParticle);
        }
        blockArray.splice(blockIndex,1);
        
    }


}

function moveDownBlock(block, jombie,jombieIndex) {
   
    // Check if the jombie is directly below the block
    if (
        jombie.x + jombie.width > block.x && // jombie's right edge past block's left edge
        jombie.x < block.x + block.width && // jombie's left edge before block's right edge
        jombie.y  > block.y + block.height// jombie's bottom edge just below block's bottom edge
    ) {
       
        checkDownBlock(block,jombieIndex,jombie)
 
    }
}
//idea to not move the block if one more block is present inside
function checkDownBlock(block,jombieIndex,jombie) {
    
    let moveFlag=false;
    blockArray.forEach((item) => {
        if ((item.x + item.width > block.x && 
            item.x < block.x + block.width && 
            item.y  > block.y)){
                moveFlag=true;
                
            }
    })

    if(!moveFlag){
        for(let i=0 ; i< 20 ; i++){
            let newParticle = new Particle(jombie.x + jombie.width , jombie.y + 10 ,jombie.color)
            parcticleArray.push(newParticle);
        }
        jombieArray.splice(jombieIndex,1);
        //updating score
        jombieCount++;
        Score +=5;
        block.velocity.y = 0.1;
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
const healthArr = [];

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
    
  

parcticleArray.forEach(particle => {
    particle.update();
})
parcticleArray.forEach((particle , index) => {
    if(particle.x > canvasWidth || particle.x < 0 || particle.y >canvasHeight){
        parcticleArray.splice(index,1)
    }
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
    jombieArray.forEach((jombie,jombieIndex) => {
        blockArray.forEach((block,blockIndex) => {
        moveDownBlock(block, jombie,jombieIndex)
   
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


animate();
showHealth()


