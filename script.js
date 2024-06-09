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

    this.draw=function(){
        c.fillStyle=this.color
        c.fillRect(this.x,this.y,this.width,this.height);
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
    
    let colorArr=["brown","bisque","cadetblue"]
    let postionArr=[
        {x:startPlayerZone, y :(canvasHeight -  blockHeight),color:"brown"},
        {x:startPlayerZone -blockWidth, y :(canvasHeight -  2 * blockHeight),color:"bisque"},
        {x:startPlayerZone-blockWidth, y :(canvasHeight  -  blockHeight),color:"cadetblue"},
        {x:endPlayerZone - blockWidth, y :(canvasHeight -  blockHeight),color:"bisque"},
        {x:endPlayerZone - blockWidth/2, y :(canvasHeight -  2 * blockHeight),color:"cadetblue"},
        {x:endPlayerZone, y :(canvasHeight -  blockHeight),color:"brown"},
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
    this.velocity = {
        x: 0.5,
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
        jombieArray.splice(jombieIndex,1);
        healthArr.pop()

    }


}


//adding idea for players health

function PlayerHealth(x,y,color){
   
    this.height=8;
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
    const height=8;
     let xPos = canvasWidth - canvasWidth/6;
     let yPos =   canvasHeight / 8;


     for(let i=0;i<8;i++){
        let color = i < 3 ? "orange" : "lightgreen"
      let newHealth=new PlayerHealth((xPos + i * width),yPos,color);
      healthArr.push(newHealth);
         
     }

}

// Animation Loop
function animate() {
    animationID = requestAnimationFrame(animate);

    if (gamePaused) return;
 
    c.clearRect(0, 0, canvas.width, canvas.height);
    createGun();
    bheem.update()
    
  

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
}




animate();
showHealth()


