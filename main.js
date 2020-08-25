document.querySelector(".control-buttons span").onclick = function () {
    let yourName = prompt("What is Your Name?");

    if (yourName== null || yourName == "") {
        document.querySelector(".name span").innerHTML = 'UnKnoun';

    } else {
        document.querySelector(".name span").innerHTML = yourName;
    }

    document.querySelector(".control-buttons").remove();

};

let duration = 1000;

let blockContainer = document.querySelector('.memory-game-blocks');

let blocks = Array.from(blockContainer.children);

// let orderRange = [...Array(blocks.length).keys()];

let orderRange = Array.from(Array(blocks.length).keys());


shuffle(orderRange);




blocks.forEach((block, index) => {

    block.style.order = orderRange[index];

    block.addEventListener('click', function () {
        flipBlock(block);
    });

});




function flipBlock(selectedBlock) {

    selectedBlock.classList.add('is-flipped');

    let allFlipBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'));

    if(allFlipBlocks.length === 2) {

        stopClicking();

        checkMathBlocks(allFlipBlocks[0], allFlipBlocks[1]);


    }
}




function stopClicking() {

    blockContainer.classList.add('no-clicking');

    setTimeout(() => {

        blockContainer.classList.remove('no-clicking')

    }, duration);

}


function checkMathBlocks(firstBlock, secondBlock) {

    let triesElement = document.querySelector('.tries span');

    if (firstBlock.dataset.social === secondBlock.dataset.social) {

        firstBlock.classList.remove('is-flipped');
        secondBlock.classList.remove('is-flipped');

        firstBlock.classList.add('has-match');
        secondBlock.classList.add('has-match');

    } else {

        triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;

        setTimeout(() => {

            firstBlock.classList.remove('is-flipped');
            secondBlock.classList.remove('is-flipped');
            
        }, duration);

    }

}






function shuffle(array) {

    let current = array.length,
        temp,
        random;
    
    while (current > 0) {

    random = Math.floor(Math.random() * current);

    current--;

    temp = array[current];

    array[current] = array[random];

    array[random] = temp;

    }

    return array;
}