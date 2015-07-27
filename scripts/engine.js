window.onload = function() {
    var CONSTANTS = {
        STAGE_WIDTH: 800,
        STAGE_HEIGHT: 600,
        JUMP_SPEED: 60,
        GRAVITY: 3,
        INITIAL_BIRD_X: 100
    }

    var stage = new Kinetic.Stage({
        container: 'container',
        width: CONSTANTS.STAGE_WIDTH,
        height: CONSTANTS.STAGE_HEIGHT
    });

    var birdLayer = new Kinetic.Layer();

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

    (function() {
        //if you want to jump as long as you press SPACE btn comment 'keyup EventListener'
        //and the logic with btnIsDown
        var btnIsDown = false;
        window.addEventListener('keydown', function(ev) {
            if (ev.keyCode === 32) {
                if (btnIsDown) {
                    return;
                }
                btnIsDown = true;
                performJump(bird);
                birdShape.setY(bird.y);
            }
        });

        window.addEventListener('keyup', function(ev) {
            if (ev.keyCode === 32) {
                btnIsDown = false;
            }
        });
    }());

    birdAnimationFrame();

    function obstacleFactory() {

        var minHeight = 100,
            randomHeightPart = 200,
            obstacleHeight = Math.round(Math.random() * randomHeightPart + minHeight),
            obstacleWidth = obstacleHeight * 0.3,
            // Never to be exactly sure where the object will apear -> TOP or BOTTOM
            obstacleYPosition = Math.random() > 0.5 ? 0 : CONSTANTS.STAGE_HEIGHT - obstacleHeight,
            obstacleXPosition = CONSTANTS.STAGE_WIDTH;

        var genericObstacle = obstacle.init(obstacleXPosition, obstacleYPosition, obstacleWidth, obstacleHeight);

        return genericObstacle;
    }

    // Drink Area
    var drinkInitialXPosition = stage.getWidth(),
        initialIntervalMinY = 100,
        initialIntervalMaxY = stage.getHeight() - 100,
        cocktailSources = [
            'images\\Cocktails\\cocktailOne.png',
            'images\\Cocktails\\cocktailTwo.png',
            'images\\Cocktails\\cocktailThree.png',
            'images\\Cocktails\\cocktailFour.png',
            'images\\Cocktails\\cocktailFive.png'
        ], softDrinkSources = [
            'images\\SoftDrinks\\softDrinkOne.png',
            'images\\SoftDrinks\\softDrinkTwo.png',
            'images\\SoftDrinks\\softDrinkThree.png',
            'images\\SoftDrinks\\softDrinkFour.png',
            'images\\SoftDrinks\\softDrinkFive.png'
        ],
        basicSpeed = -2,
        drinkCount = 0,
        drinkArr = [],
        drinkWidth = 30,
        drinkHeight = 50;

    setInterval(function () {
        ++drinkCount;
        if (drinkCount % 3 == 0) {
        var cocktailObject = Object.create(cocktail).init(drinkInitialXPosition, randomNumberInInterval(initialIntervalMinY, initialIntervalMaxY), drinkWidth, drinkHeight);
        cocktailObject.speed = basicSpeed - Math.round(Math.random() * 3);
        drinkArr.push(cocktailObject);
        } else {
        var softDrinkObject = Object.create(softDrink).init(drinkInitialXPosition, randomNumberInInterval(initialIntervalMinY, initialIntervalMaxY), drinkWidth, drinkHeight);
        softDrinkObject.speed = basicSpeed - Math.round(Math.random() * 3);
        drinkArr.push(softDrinkObject);
        }
    }, 750);

    stage.add(background);
    stage.add(birdLayer);


};
