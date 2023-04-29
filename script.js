let heartLossDet = 9
let coconutNum = sessionStorage.getItem("coconutAm")
console.log(sessionStorage.getItem("coconutAm"))
function easy() {
  location.href = "index.html"
  coconutNum = 2
}
function medium() {
  coconutNum = 4
  console.log(coconutNum)
  location.href = "index.html"
}
function hard() {
  coconutNum = 6
  console.log(coconutNum)
  location.href = "index.html"
}
function defPos() {
  backMusic.loop()
    for(let w = 0; w < 1000; w++) {
        let rP = random(350,500);
        sessionStorage.setItem("rpSession"+w,rP)
    }
    for(let bananaYDet = 0;bananaYDet<5;bananaYDet++){
      let a = Math.random(0,h) * 400;
      let z = a + w
      sessionStorage.setItem("bananaPos"+bananaYDet,a)
      sessionStorage.setItem("bananaPosX"+bananaYDet,z)
    }
    for(let enemyPosDet = 0;enemyPosDet<coconutNum;enemyPosDet++){
      let randomNum = Math.random(0,h) * 400;
      let thirtyTwo = w + randomNum
      sessionStorage.setItem("hurtPosY"+enemyPosDet,randomNum)
      sessionStorage.setItem("hurtPosX" + enemyPosDet,thirtyTwo)
    }
    for(let hSpa = 0; hSpa < 10; hSpa++) {
      sessionStorage.setItem("heaW"+hSpa,50)
      sessionStorage.setItem("heaH"+hSpa,50)
    }
   
}
function player() {
  this.mPosX = 0;
  this.mPosY = 450;
  this.gravity = 0.5;
  this.lift = -15;
  this.right = 1;
  this.left = -1;
  this.velocityX = 0;
  this.velocityY = 0;
  this.objectSpeedX = 10;
  this.treeVelocity = 0;
    

  this.show = function() {
    //show trees

    for (let i = 0; i<1000; i++) {
      rectMode(CORNER);
      let xP = 500 * i;
      //let pX = Math.random() * 1000
      //sessionStorage.setItem("pX" + i,pX)
      let wd = ((parseInt(sessionStorage.getItem("rpSession" + i))) * i);
      
      image(bananaTree, this.objectSpeedX + wd, 45);
      //fill(255, 255, 0, 50);

      hit = collideRectRect(this.objectSpeedX + 185 + wd, 350,30,400,this.mPosX,this.mPosY,200,175);
      //rect(this.objectSpeedX + 185 + wd, 350, 30, 400);
      sessionStorage.setItem("hitSens" + i, hit);
    }
    //show monkey
    image(monkey, this.mPosX, this.mPosY, 200, 175);
    sessionStorage.setItem("monkPosX",this.mPosX)
    sessionStorage.setItem("monkPosY",this.mPosY)
  };
  this.jump = function () {
    for (let i = 0; i < 500; i++) {
      let hitDetect = sessionStorage.getItem("hitSens" + i);
      //hit = collideRectRect(p + this.objectSpeedX + 180,350,40,400,this.mPosX,this.mPosY,200,175)
      //console.log(hitDetect);
      if (hitDetect === "true" && keyCode === 38) {
        this.velocityY += this.lift;
        jump.play()
      }
    }
  };
  this.down = function() {
    for (let i = 0; i < 500; i++) {
      let hitDetect = sessionStorage.getItem("hitSens" + i);
      //hit = collideRectRect(p + this.objectSpeedX + 180,350,40,400,this.mPosX,this.mPosY,200,175)
      //console.log(hitDetect);
      if (hitDetect === "true" && keyCode === 40) {
        this.velocityY -= this.lift;
        jump.play()
      }
    }
  }
  this.goRight = function () {
    /*this.velocityX += this.right*/
    this.treeVelocity -= this.right;
    
  };
  //this.goLeft = function () {
    /*this.velocityX += this.left*/
    //this.treeVelocity -= this.left;
  //};
  this.update = function () {
    /*for(let i = 0; i<100; i++) {
            let p = 500*i
            hit = collideRectRect(p + this.objectSpeedX + 190,550,40,500,this.mPosX,this.mPosY,200,175)
            if(hit === true && keyCode === 32) {
                this.jump()
            }
        } */
    //move the trees accordingly to the monkey
    this.mPosX += this.velocityX;
    this.velocityX *= 0.9;
    this.velocityY += this.gravity;
    this.mPosY += this.velocityY;
    //air resistance
    this.velocityY *= 0.9;
    this.objectSpeedX += this.treeVelocity;
    this.treeVelocity *= 0.9;
    if (this.mPosY > 450) {
      this.mPosY = 450;
      this.velocityY = 0;
    }
    if (this.mPosY < 0) {
      this.mPosY = 0;
      this.velocityY = 0;
    }
    this.objectSpeedX -= 1
  };
}
function banana() {
    this.show = function() {
      for(let loop = 0;loop<5;loop++){
        this.x = sessionStorage.getItem("bananaPosX"+loop)
        this.y = sessionStorage.getItem("bananaPos"+loop)
        image(bananaIm,this.x,this.y,100,100)
        let mX = parseInt(sessionStorage.getItem("monkPosX"))
        let mY = parseInt(sessionStorage.getItem("monkPosY"))
        //banana monkey hitbox and point counter
        pointHits = collideRectRect(mX,mY,200,175,this.x, this.y,150,150);
        sessionStorage.setItem("oogabooga"+loop,pointHits)
        //fill(255, 255, 0, 50);
        //rectMode(CORNER)
        //rect(this.x,this.y,100,100)
        //rect(mX,mY,200,175)
      }
      
    }
    this.update = function() {
      
      //console.log(this.x)
        //console.log(pointHits)
        for(let bananaLoop = 0; bananaLoop < 5; bananaLoop++) {
          let p1 = sessionStorage.getItem("oogabooga"+bananaLoop)
          let c = sessionStorage.getItem("bananaPosX"+bananaLoop)
          c -= 10
          sessionStorage.setItem("bananaPosX"+bananaLoop,c)
          if(p1 === "true") {
            collectSound.play()
            let a = Math.random(0,h) * 400;
            sessionStorage.setItem("bananaPos"+bananaLoop,a)
            sessionStorage.setItem("bananaPosX"+bananaLoop,w)
            pointCounter += 6
            document.getElementById("score").innerHTML = pointCounter
            sessionStorage.setItem("score",document.getElementById("score").innerHTML)
            //console.log(pointCounter)
          }
          if((parseInt(sessionStorage.getItem("bananaPosX"+bananaLoop)))<-100) {
            let a = Math.random(0,h) * 400;
            sessionStorage.setItem("bananaPos"+bananaLoop,a)
            sessionStorage.setItem("bananaPosX"+bananaLoop,w)
            
          
          }
        }
    }
    this.updateIfMoved = function() {
      for(let moveBanana = 0; moveBanana < 5; moveBanana++) {
        let d = sessionStorage.getItem("bananaPosX"+moveBanana)
        d -= 7
        sessionStorage.setItem("bananaPosX"+moveBanana,d)
    }
  }
    
}
function enemy() {
  /*this.show = function() {
    for(let setPos = 0;setPos < 5; setPos++) {
      this.x = parseInt(sessionStorage.getItem("hurtPosX"+setPos))
      this.y = parseInt(sessionStorage.getItem("hurtPosY"+setPos))
      
    }
  }*/
  this.show = function() {
    let eDet = random(0,2)
    //health code
    for(let hSpawn = 0; hSpawn < 10; hSpawn++) {
      hX = 50*hSpawn
      let hW = sessionStorage.getItem("heaW"+hSpawn)
      let hH = sessionStorage.getItem("heaH"+hSpawn)
      image(heart,hX,0,hW,hH)
    }

    for(let loopE = 0;loopE<coconutNum;loopE++){
      this.x = sessionStorage.getItem("hurtPosX"+loopE)
      this.y = sessionStorage.getItem("hurtPosY"+loopE)
      image(coconut,this.x,this.y,100,100)
      let monX = parseInt(sessionStorage.getItem("monkPosX"))
      let monY = parseInt(sessionStorage.getItem("monkPosY"))
      //enemy monkey hitbox and poijnt counter
      dead = collideRectRect(monX,monY,200,175,this.x, this.y,150,150);
      sessionStorage.setItem("enemyCollide"+loopE,dead)

    }
  }
  this.update = function() {
    
      for(let updateL = 0; updateL < coconutNum; updateL++) {
        let hitTrue = sessionStorage.getItem("enemyCollide"+updateL)
        let c = sessionStorage.getItem("hurtPosX"+updateL)
        c -= 5
        sessionStorage.setItem("hurtPosX"+updateL,c)
        rotate(720)
        if(hitTrue === "true") {
          hitS.play(-2,1,10,0,2)
          let a = Math.random(0,h) * 400;
          sessionStorage.setItem("hurtPosY"+updateL,a)
          sessionStorage.setItem("hurtPosX"+updateL,w)
          //console.log(pointCounter)
         
          sessionStorage.setItem("heaW"+heartLossDet,0)
          sessionStorage.setItem("heaH"+heartLossDet,0)
          heartLossDet -= 1
          if(heartLossDet <= -1) {
            sessionStorage.setItem("heaW0",0)
            sessionStorage.setItem("heaH0",0)
            sessionStorage.setItem("points",document.getElementById("score").innerHTML)
            lossSound.play()
            location.href = "lossPage.html"
          }
        }
        if((parseInt(sessionStorage.getItem("hurtPosX"+updateL)))<-100) {
          let a = Math.random(0,h) * 400;
          sessionStorage.setItem("hurtPosY"+updateL,a)
          sessionStorage.setItem("hurtPosX"+updateL,w)
          
        
        }
      }
  }
  this.updateIfMoved = function() {
    for(let moveE = 0; moveE < coconutNum; moveE++) {
      let d = sessionStorage.getItem("hurtPosX"+moveE)
      d -= 8
      sessionStorage.setItem("hurtPosX"+moveE,d)
  }
}
}
