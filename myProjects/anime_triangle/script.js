

let tl =anime.timeline({
    duration: 750,
    // loop: true,
    // direction: 'alternate'
});

tl.add({
    targets: '.tri',
    opacity: 0,
}).add({
    targets: '.triangle',
    strokeDashoffset: [anime.setDashoffset, 0],
    easing: 'easeInOutSine',
    duration: 800
}).add({
    targets: '.tri',
    opacity: 1,
});

