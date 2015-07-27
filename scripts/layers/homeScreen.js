console.log('from homeScreen');
var homeScreen = new Kinetic.Layer(),
    CONSTANTS = {
        STAGE_WIDTH: 800,
        STAGE_HEIGHT: 600,
        BUTTONS_WIDTH: 165,
        BUTTONS_HEIGHT: 101,
        HOW_TO_PLAY_WIDTH: 285,
        HOW_TO_PLAY_HEIGHT: 140
    },
    NAVIGATE_SCREEN_EVENT = {
        HOME: 'navigateToHomeScreen',
        OPTIONS: 'navigateToOptionsScreen',
        INGAME: 'navigateToIngameScreen'
    };

//------- start background   
var backround = new Kinetic.Rect({
    width: CONSTANTS.STAGE_WIDTH,
    height: CONSTANTS.STAGE_HEIGHT,
    x: 0,
    y: 0,
    fillPriority: "pattern"
});

var backroundImage = new Image();
backroundImage.src = 'images\\Navigation\\background.png';
backroundImage.onload = function() {
    backround.setFillPatternImage(backroundImage);
};
//------- end background   

//------- start howToPlay   
var howToPlay = new Kinetic.Rect({
    width: CONSTANTS.HOW_TO_PLAY_WIDTH,
    height: CONSTANTS.HOW_TO_PLAY_HEIGHT,
    x: CONSTANTS.STAGE_WIDTH * 0.5 - CONSTANTS.HOW_TO_PLAY_WIDTH * 0.5,
    y: CONSTANTS.STAGE_HEIGHT - CONSTANTS.HOW_TO_PLAY_HEIGHT,
    fillPriority: "pattern"
});

var howToPlayImage = new Image();
howToPlayImage.src = 'images\\Navigation\\howToPlay.png';
howToPlayImage.onload = function() {
    howToPlay.setFillPatternImage(howToPlayImage);
};
//------- end howToPlay   

//------- start btnOptions   
var btnOptions = new Kinetic.Rect({
    width: CONSTANTS.BUTTONS_WIDTH,
    height: CONSTANTS.BUTTONS_HEIGHT,
    x: CONSTANTS.STAGE_WIDTH * 0.5 + CONSTANTS.BUTTONS_WIDTH * 0.5,
    y: CONSTANTS.STAGE_HEIGHT * 0.5,
    fillPriority: "pattern"
});

var optionsButtonImage = new Image();
optionsButtonImage.src = 'images\\Navigation\\buttonOptions.png';
optionsButtonImage.onload = function() {
    btnOptions.setFillPatternImage(optionsButtonImage);
};
//------- end btnOptions 

//------- start btnStart   
var btnStart = new Kinetic.Rect({
    width: CONSTANTS.BUTTONS_WIDTH,
    height: CONSTANTS.BUTTONS_HEIGHT,
    x: CONSTANTS.STAGE_WIDTH * 0.5 - CONSTANTS.BUTTONS_WIDTH * 1.5,
    y: CONSTANTS.STAGE_HEIGHT * 0.5,
    fillPriority: "pattern"
});

var startButtonImage = new Image();
startButtonImage.src = 'images\\Navigation\\buttonPlay.png';
startButtonImage.onload = function() {
    btnStart.setFillPatternImage(startButtonImage);
};
//------- end btnStart 

homeScreen.add(backround);
homeScreen.add(howToPlay);
homeScreen.add(btnOptions);
homeScreen.add(btnStart);



//--------- start 'creating and dispatching events'
var navToHome = new CustomEvent(NAVIGATE_SCREEN_EVENT.HOME, {
    detail: {},
    bubbles: true,
    cancelable: false
});

btnStart.addEventListener('click', function(ev) {
    this.dispatchEvent(navToHome);
});
window.addEventListener(NAVIGATE_SCREEN_EVENT.HOME, function() {
    console.log('we change screen to HOME');
}, true);


var navToOptions = new CustomEvent(NAVIGATE_SCREEN_EVENT.OPTIONS,{
    detail: {},
    bubbles: true,
    cancelable: false
});

btnOptions.addEventListener('click', function() {
    this.dispatchEvent(navToOptions);
});
window.addEventListener(NAVIGATE_SCREEN_EVENT.OPTIONS, function() {
    console.log('we change screen to OPTIONS');
}, true);
//--------- end 'creating and dispatching events'