window.onload = function () {
    var CONSTANTS = {
        STAGE_WIDTH: 800,
        STAGE_HEIGHT: 600,
        JUMP_SPEED: 60,
        GRAVITY: 3,
        INITIAL_BIRD_X: 100
    };

    var stage = new Kinetic.Stage({
        container: 'container',
        width: CONSTANTS.STAGE_WIDTH,
        height: CONSTANTS.STAGE_HEIGHT
    });

    var birdLayer = new Kinetic.Layer();
    var drinkLayer = new Kinetic.Layer();
    var obstaclesLayer = new Kinetic.Layer();

    var bird = drunkBird.init(CONSTANTS.INITIAL_BIRD_X, CONSTANTS.STAGE_HEIGHT / 2);

    var birdShape = new Kinetic.Circle({
        x: bird.x,
        y: bird.y,
        radius: bird.radius,
        fill: 'red',
        stroke: 'black',
        strokeWidth: 4
    });

    birdLayer.add(birdShape);
    //put kinetic layers here e.g stage.add(layerName);
    function birdAnimationFrame() {
        bird.y += CONSTANTS.GRAVITY;
        if (bird.y >= CONSTANTS.STAGE_HEIGHT - bird.radius) {
            bird.y = CONSTANTS.STAGE_HEIGHT - bird.radius;
            bird.isFlying = false;

            birdShape.setY(bird.y);
            birdLayer.draw();

            alert('Game Over! Bird is not flying!');
            return;
        }

        birdShape.setY(bird.y);

        birdLayer.draw();

        requestAnimationFrame(birdAnimationFrame);
    }

    function performJump(bird) {
        if (bird.y - bird.radius >= CONSTANTS.JUMP_SPEED) {
            bird.y -= CONSTANTS.JUMP_SPEED;
        } else {
            bird.y = 0 + bird.radius;
        }
    }

    (function () {
        //if you want to jump as long as you press SPACE btn comment 'keyup EventListener'
        //and the logic with btnIsDown
        var btnIsDown = false;
        window.addEventListener('keydown', function (ev) {
            if (ev.keyCode === 32) {
                if (btnIsDown) {
                    return;
                }
                btnIsDown = true;
                performJump(bird);
                birdShape.setY(bird.y);
            }
        });

        window.addEventListener('keyup', function (ev) {
            if (ev.keyCode === 32) {
                btnIsDown = false;
            }
        });
    } ());

    birdAnimationFrame();
    
    function areColliding(bird, drawableObject) {
        var inBottomLeft = false,
            inBottomRight = false,
            inTopLeft = false,
            inTopRight = false;

        var distanceBottomLeft = Math.pow(bird.x - drawableObject.x, 2) + Math.pow(bird.y - drawableObject.y, 2);
        var distanceTopLeft = Math.pow(bird.x - drawableObject.x, 2) + Math.pow(bird.y - (drawableObject.y + drawableObject.height), 2);
        var distanceTopRight = Math.pow(bird.x - (drawableObject.x + drawableObject.width), 2) + Math.pow(bird.y - (drawableObject.y + drawableObject.height), 2);
        var distanceBottomRight = Math.pow(bird.x - (drawableObject.x + drawableObject.width), 2) + Math.pow(bird.y - drawableObject.y, 2);

        if (distanceBottomLeft <= bird.radius * bird.radius) {
            inBottomLeft = true;
        }

        if (distanceTopRight <= bird.radius * bird.radius) {
            inTopRight = true;
        }

        if (distanceTopLeft <= bird.radius * bird.radius) {
            inTopLeft = true;
        }

        if (distanceBottomRight <= bird.radius * bird.radius) {
            inBottomRight = true;
        }

        return inTopLeft || inBottomLeft || inTopRight || inBottomRight;
    }
    
    /*    var testBird = drunkBird.init(50, 50);
        var testObstacle = obstacle.init(50, 50, 20, 20);
    
        console.log('collision: ' + areColliding(testBird, testObstacle));*/

    var initialIntervalMaxX = stage.getWidth(),
        initialIntervalMinY = 100,
        initialIntervalMaxY = stage.getHeight() - 100,
        cocktailSources = [
            'images/Cocktails/cocktailOne.png',
            'images/Cocktails/cocktailTwo.png',
            'images/Cocktails/cocktailThree.png',
            'images/Cocktails/cocktailFour.png',
            'images/Cocktails/cocktailFive.png'
        ], softDrinkSources = [
            'images/SoftDrinks/softDrinkOne.png',
            'images/SoftDrinks/softDrinkTwo.png',
            'images/SoftDrinks/softDrinkThree.png',
            'images/SoftDrinks/softDrinkFour.png',
            'images/SoftDrinks/softDrinkFive.png'
        ], obstacleAboveSources = [
            'images/Obstacles/cable_above.png',
            'images/Obstacles/chandelier_above.png',
            'images/Obstacles/speaker_above.png'
        ],
        basicSpeed = -3,
        drinkCount = 0,
        drinkArr = [],
        drinkWidth = 30,
        drinkHeight = 50,
        obstacleAboveWidth = 70,
        obstacleAboveHeight = 30,
        obstacleX = 0,
        obstacleY = 0,
        speed = 3;

    function randomNumberInInterval(min, max) {
        var randomNumber = Math.floor(Math.random() * (max - min) + min);
        return randomNumber;
    }

    function setSoftDrinkImage(softDrinkObject) {
        var softDrinkImage = new Image();
        var number = Math.round(Math.random() * 4);
        softDrinkImage.src = softDrinkSources[number];

        softDrinkImage.onload = function () {
            softDrinkObject.setFillPatternImage(softDrinkImage);
            softDrinkObject.fillPatternScaleX(0.5);
            softDrinkObject.fillPatternScaleY(0.5);
            stage.draw();
        };

        return softDrinkImage;
    }

    function setCocktailImage(cocktailObject) {
        var cocktailImage = new Image();
        var number = Math.round(Math.random() * 4);
        cocktailImage.src = cocktailSources[number];

        cocktailImage.onload = function () {
            cocktailObject.setFillPatternImage(cocktailImage);
            cocktailObject.fillPatternScaleX(0.5);
            cocktailObject.fillPatternScaleY(0.5);
            stage.draw();
        };

        return cocktailImage;
    }

    function setObstacleImage(obstacleObject){
            var obstacleImage = new Image();
            var number = Math.round(Math.random()*3);
            obstacleImage.src = obstacleAboveSources[number];

            obstacleImage.onload = function () {
                obstacleObject.setFillPatternImage(obstacleImage);
                obstacleObject.fillPatternScaleX(1);
                obstacleObject.fillPatternScaleY(1);
                stage.draw();
            };

            return obstacleImage;
    }

    function generateObject(x, y, width, height, type) {

        var drink = new Kinetic.Rect({
            x: x,
            y: y,
            width: width,
            height: height,
            fillPriority: 'pattern'
        });

        if (type) {
            setCocktailImage(drink);
        } else {
            setSoftDrinkImage(drink);
        }
        return drink;
    }

    function generateObstacleObject(){
            var obstacle = new Kinetic.Rect({
                x: initialIntervalMaxX,
                y: initialIntervalMinY,
                width: 100,
                height: 50,
                fillPriority: 'pattern'
            });

            return obstacle;
    }

    setInterval(function () {
        ++drinkCount;
        if (drinkCount % 3 === 0) {
            var cocktailObject = Object.create(cocktail).init(initialIntervalMaxX, randomNumberInInterval(initialIntervalMinY, initialIntervalMaxY), drinkWidth, drinkHeight);
            cocktailObject.speed = basicSpeed;
            cocktailObject.kineticObject = generateObject(cocktailObject.x, cocktailObject.y, cocktailObject.width, cocktailObject.height, cocktail.isPrototypeOf(cocktailObject));
            drinkLayer.add(cocktailObject.kineticObject);
            drinkArr.push(cocktailObject);
        } else {
            var softDrinkObject = Object.create(softDrink).init(initialIntervalMaxX, randomNumberInInterval(initialIntervalMinY, initialIntervalMaxY), drinkWidth, drinkHeight);
            softDrinkObject.speed = basicSpeed;
            softDrinkObject.kineticObject = generateObject(softDrinkObject.x, softDrinkObject.y, softDrinkObject.width, softDrinkObject.height, cocktail.isPrototypeOf(softDrinkObject));
            drinkLayer.add(softDrinkObject.kineticObject);
            drinkArr.push(softDrinkObject);
        }
    }, 1000);

    function animateDrinks() {
        drinkArr.forEach(function (drinkObject, index) {

            var updateX = drinkObject.speed;

            var x = drinkObject.kineticObject.getX() + updateX;

            drinkObject.kineticObject.setX(x);
            drinkObject.x = x;

            if (drinkObject.kineticObject.getX() + drinkObject.kineticObject.getWidth() < 0) {
                drinkObject.kineticObject.remove();
                drinkArr.splice(index, 1);
            }
            
            if(areColliding(bird, drinkObject)){
                drinkObject.kineticObject.remove();
                drinkArr.splice(index, 1);
            }
            // console.log(birdArr.length);
        });
        drinkLayer.draw();
        requestAnimationFrame(animateDrinks);
    } 



    var obstacleObject = generateObstacleObject();
    setObstacleImage(obstacleObject);

    function animateObstacleFrame(){
        obstaclesLayer.add(obstacleObject);

        obstacleX = obstacleObject.getX();
        obstacleX -= speed;
        obstacleObject.setX(obstacleX);

        obstaclesLayer.draw();

        requestAnimationFrame(animateObstacleFrame);

        if(obstacleX < 0){
            obstacleObject.setX(800);
            //obstacleObject.setY(randomNumberInInterval(initialIntervalMinY, initialIntervalMaxY));
            setObstacleImage(obstacleObject);
        }
    }
    
    animateObstacleFrame();
    animateDrinks();

    stage.add(background);
    stage.add(drinkLayer);
    stage.add(obstaclesLayer);
    //uncomment the 1 line below to see homePage......
    // yet still dont know how to catch events here(engine) from there(homeScreen)
    //stage.add(homeScreen);
    stage.add(birdLayer);
};
