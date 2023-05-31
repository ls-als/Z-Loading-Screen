var backgroundList = []; // Array to store background image indices
var backgroundIndex = 0; // Index to track current background image

var onScreen = true; // Flag to control if the animation is on screen
var a = true; // Flag to alternate animation directions

// Init stuff
$(document).ready(function() {
    generateList(); // Generate and shuffle the image list
    $("#container").fadeIn(fadeDuration); // Fade in the container

    change(); // Start the animation
});

// Generate and shuffle the background images list
var backgroundImagesCount = 11; // Total number of background images

function generateList() {
    for (let i = 0; i < backgroundImagesCount; i++) {
        backgroundList.push(i); // Add indices to the background list
    }
    backgroundList = shuffle(backgroundList); // Shuffle the background list
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

// ANIMATION
var duration = 10000; // Duration for each image to be shown
var fadeDuration = 1000; // Fade in/out duration for images

function manage() {
    if (onScreen) {
        setTimeout(change, duration); // Schedule next image change
    } else {
        $("#container").fadeOut(fadeDuration); // Fade out the container
    }
}

function change() {
    var background = $("#background");
    background.fadeOut(fadeDuration).fadeIn(fadeDuration); // Fade out/in the background image

    setTimeout(changeImg, fadeDuration, background); // Change the image after fade

    manage(); // Manage the animation cycle
}

function changeImg(bground) {
    if (backgroundIndex > backgroundList.length - 1) {
        backgroundIndex = 0; // Reset background index if it exceeds the list length
    }

    // Update the background image with the current index
    bground.css('background-image', 'url(assets/background/' + backgroundList[backgroundIndex] + '.jpg)');

    if (a) {
        a = false;
        // Animate background image from left to right
        bground.removeClass("backgroundToLeftAnim").addClass("backgroundToRightAnim");
    } else {
        a = true;
        // Animate background image from right to left
        bground.removeClass("backgroundToRightAnim").addClass("backgroundToLeftAnim");
    }

    backgroundIndex++;
}