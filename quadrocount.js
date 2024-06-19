let player = 'white_1';

let numcell_x = 4;
let numcell_y = 4;
let mul = numcell_x * numcell_y - 1;
let grid_w = 475;
let grid_h = 475;
let cell_w = grid_w / numcell_x;
let cell_h = grid_h / numcell_y;
let dim = least(cell_w, cell_h);
let start_x = 37.5;
let start_y = 87.5;
let diagonal = Math.sqrt(cell_w * cell_w + cell_h * cell_h);

let cell_x = [];
let cell_y = [];
let error_message = '';
let w_removed = [];
let b_removed = [];
let w_rem2 = [];
let b_rem2 = [];

let w_positions = [[start_x + 1.5 * cell_w, start_y + 0.5 * cell_h], [start_x + 0.5 * cell_w, start_y + 1.5 * cell_h]];
let b_positions = [[start_x + (numcell_x - 1.5) * cell_w, start_y + (numcell_y - 0.5) * cell_h], [start_x + (numcell_x - 0.5) * cell_w, start_y + (numcell_y - 1.5) * cell_h]];
let w_pos_num = [numcell_y, 1];
let b_pos_num = [mul - numcell_y, mul - 1];
let occupied = [w_pos_num[0], w_pos_num[1], b_pos_num[0], b_pos_num[1]];
let currentscore = score();
let prevscore = currentscore + 1;

function setup() {
    //createCanvas(windowWidth, windowHeight);
    createCanvas(800, 600);
    background(30, 100, 120);
    let start_x = 37.5;
    let start_y = 87.5;
    for (let i = 0; i < numcell_x; i++) {
        for (let j = 0; j < numcell_y; j++) {
            let c_x = start_x + i * cell_w + cell_w / 2;
            let c_y = start_y + j * cell_h + cell_h / 2;
            cell_x.push(c_x);
            cell_y.push(c_y);
        }
    }
    let inputX = createInput(numcell_x);
    inputX.position(970, 200);
    inputX.size(50);
    let inputY = createInput(numcell_y);
    inputY.position(1030, 200);
    inputY.size(50);

    let updateGridButton = createButton('Update Grid');
    updateGridButton.position(990, 230);
    updateGridButton.mousePressed(() => {
        let newX = parseInt(inputX.value());
        let newY = parseInt(inputY.value());
        if (newX > 0 && newY > 0) {
            numcell_x = newX;
            numcell_y = newY;
            resetGame();
        }
    });

    let restartButton = createButton('Restart Game');
    restartButton.position(980, 500);
    restartButton.mousePressed(resetGame);
}

function resetGame() {
    player = 'white_1';
    mul = numcell_x * numcell_y - 1;
    grid_w = 475;
    grid_h = 475;
    cell_w = grid_w / numcell_x;
    cell_h = grid_h / numcell_y;
    dim = least(cell_w, cell_h);
    start_x = 37.5;
    start_y = 87.5;

    cell_x = [];
    cell_y = [];
    w_removed = [];
    b_removed = [];

    w_positions = [[start_x + 1.5 * cell_w, start_y + 0.5 * cell_h], [start_x + 0.5 * cell_w, start_y + 1.5 * cell_h]];
    b_positions = [[start_x + (numcell_x - 1.5) * cell_w, start_y + (numcell_y - 0.5) * cell_h], [start_x + (numcell_x - 0.5) * cell_w, start_y + (numcell_y - 1.5) * cell_h]];
    w_pos_num = [numcell_y, 1];
    b_pos_num = [mul - numcell_y, mul - 1];
    occupied = [w_pos_num[0], w_pos_num[1], b_pos_num[0], b_pos_num[1]];
    currentscore = score();
    prevscore = currentscore + 1;
    error_message = '';
    setup();
    redraw();
}

function draw() {
    background(30, 100, 120);
    noFill();
    stroke(0);
    strokeWeight(6);

    for (let i = 0; i <= numcell_x; i++) {
        let x = start_x + i * cell_w;
        line(x, start_y, x, start_y + grid_h);
    }
    for (let i = 0; i <= numcell_y; i++) {
        let y = start_y + i * cell_h;
        line(start_x, y, start_x + grid_w, y);
    }

    noStroke();
    for (let k = 0; k < w_positions.length; k++) {
        fill(255); // White
        ellipse(w_positions[k][0], w_positions[k][1], 50, 50);
    }
    for (let pos of b_positions) {
        fill(0); // Black
        ellipse(pos[0], pos[1], 50, 50);
    }

    // Headline ---
    fill(20, 150, 80);
    noStroke();
    rect(0, 0, width, 50);
    fill(255);
    textSize(15)
    wrappedText("Enter number of columns and rows:", 660, 170, 300)
    rect(571, 269, 180, 40);
    fill(250, 10, 10);
    textAlign(CENTER);
    textSize(32);
    text("QuadroCount",
        width / 2, 33);

    fill(0);
    textSize(30);
    text("SCORE: " + currentscore, 660, 300);

    if (error_message !== '') {
        fill(255);
        rect(571, 385, 180, 40);
        textSize(12)
        fill(255, 0, 0)
        wrappedText(error_message, 660, 400, 180);
    }
}

function mousePressed() {
    if (player === 'white_1') {
        for (let i = 0; i < w_positions.length; i++) {
            let distance = dist(mouseX, mouseY, w_positions[i][0], w_positions[i][1]);
            if (distance < 0.4 * dim) {
                player = 'white_2';
                //print(w_positions)
                w_rem2 = [w_positions[i][0], w_positions[i][1]];
                print(w_rem2);
                w_removed = [w_positions[i], w_pos_num[i]]
                w_positions.splice(i, 1);
                w_pos_num.splice(i, 1);
                redraw();
                error_message = ''
            } else {
                error_message = 'Its White Player\'s Turn'
            }
        }
    } else if (player === 'white_2') {
        for (let i = 0; i < cell_x.length; i++) {
            let distance = dist(mouseX, mouseY, cell_x[i], cell_y[i]);
            if (distance < 0.4 * cell_w) {
                let distance1 = dist(cell_x[i], cell_y[i], w_rem2[0], w_rem2[1]);
                if (distance1 < 1.2 * diagonal) {
                    player = 'black_1';
                    w_positions.push([cell_x[i], cell_y[i]]);
                    w_pos_num.push(i);
                    let temp = prevscore;
                    prevscore = currentscore;
                    currentscore = score();
                    if (prevscore <= currentscore) {
                        error_message = "The move is invalid. The game score does not decrease"
                        w_positions.splice(1, 1);
                        w_positions.push(w_removed[0]);
                        w_pos_num.splice(1, 1);
                        w_pos_num.push(w_removed[1]);
                        currentscore = prevscore;
                        prevscore = temp;
                        player = 'white_1'
                    } else if (isInArray(i, occupied)) {
                        error_message = 'Invalid move. Existing piece present'
                        w_positions.splice(1, 1);
                        w_positions.push(w_removed[0]);
                        w_pos_num.splice(1, 1);
                        w_pos_num.push(w_removed[1]);
                        currentscore = prevscore;
                        prevscore = temp;
                        player = 'white_1'
                    } else {
                        error_message = ''
                        updateOccupied();
                        gameEnd('w');
                    }
                } else {
                    error_message = 'Invalid move. You are moving out of bounds';
                }
            }
        }
        return;
    } else if (player === 'black_1') {
        for (let i = 0; i < b_positions.length; i++) {
            let distance = dist(mouseX, mouseY, b_positions[i][0], b_positions[i][1]);
            if (distance < 0.4 * cell_w) {
                player = 'black_2';
                b_rem2 = [b_positions[i][0], b_positions[i][1]];
                print(b_rem2);
                b_removed = [b_positions[i], b_pos_num[i]]
                b_positions.splice(i, 1);
                b_pos_num.splice(i, 1)
                redraw();
                error_message = ''
            } else {
                error_message = 'Its Black Player\'s Turn'
            }
        }
    } else if (player === 'black_2') {
        for (let i = 0; i < cell_x.length; i++) {
            let distance = dist(mouseX, mouseY, cell_x[i], cell_y[i]);
            if (distance < 0.4 * cell_w) {
                let distance1 = dist(cell_x[i], cell_y[i], b_rem2[0], b_rem2[1]);
                if (distance1 < 1.2 * diagonal) {
                    player = 'white_1';
                    b_positions.push([cell_x[i], cell_y[i]]);
                    b_pos_num.push(i);
                    let temp = prevscore;
                    prevscore = currentscore;
                    currentscore = score();
                    if (prevscore <= currentscore) {
                        error_message = "The move is invalid. The game score does not decrease"
                        b_positions.splice(1, 1);
                        b_positions.push(b_removed[0]);
                        b_pos_num.splice(1, 1);
                        b_pos_num.push(b_removed[1]);
                        currentscore = prevscore;
                        prevscore = temp;
                        player = 'black_1'
                    } else if (isInArray(i, occupied)) {
                        error_message = 'Invalid move. Existing piece present'
                        b_positions.splice(1, 1);
                        b_positions.push(b_removed[0]);
                        b_pos_num.splice(1, 1);
                        b_pos_num.push(b_removed[1]);
                        currentscore = prevscore;
                        prevscore = temp;
                        player = 'black_1';
                    } else {
                        error_message = ''
                        updateOccupied();
                        gameEnd('b');
                    }
                } else {
                    error_message = 'Invalid move. You are moving out of bounds';
                }
            }
        }
        return;
    }
}

function isInArray(a, array) {
    for (let i = 0; i < array.length; i++) {
        if (a == array[i]) return true;
    }
    return false
}

function updateOccupied() {
    occupied = [w_pos_num[0], w_pos_num[1], b_pos_num[0], b_pos_num[1]]
}

function score() {
    let w1 = [w_pos_num[0] % numcell_y, Math.floor(w_pos_num[0] / numcell_y)] //row, column
    let w2 = [w_pos_num[1] % numcell_y, Math.floor(w_pos_num[1] / numcell_y)]
    let b1 = [b_pos_num[0] % numcell_y, Math.floor(b_pos_num[0] / numcell_y)]
    let b2 = [b_pos_num[1] % numcell_y, Math.floor(b_pos_num[1] / numcell_y)]
    let a = (Math.abs(b1[0] - w1[0]) + 1) * (Math.abs(b1[1] - w1[1]) + 1);
    let b = (Math.abs(b2[0] - w1[0]) + 1) * (Math.abs(b2[1] - w1[1]) + 1);
    let c = (Math.abs(b1[0] - w2[0]) + 1) * (Math.abs(b1[1] - w2[1]) + 1);
    let d = (Math.abs(b2[0] - w2[0]) + 1) * (Math.abs(b2[1] - w2[1]) + 1);
    return a + b + c + d;
}

function score2(i, j, k, l) {
    let w1 = [i % numcell_y, Math.floor(i / numcell_y)] //row, column
    let w2 = [j % numcell_y, Math.floor(j / numcell_y)]
    let b1 = [k % numcell_y, Math.floor(k / numcell_y)]
    let b2 = [l % numcell_y, Math.floor(l / numcell_y)]
    let a = (Math.abs(b1[0] - w1[0]) + 1) * (Math.abs(b1[1] - w1[1]) + 1);
    let b = (Math.abs(b2[0] - w1[0]) + 1) * (Math.abs(b2[1] - w1[1]) + 1);
    let c = (Math.abs(b1[0] - w2[0]) + 1) * (Math.abs(b1[1] - w2[1]) + 1);
    let d = (Math.abs(b2[0] - w2[0]) + 1) * (Math.abs(b2[1] - w2[1]) + 1);
    return a + b + c + d;
}

function wrappedText(txt, x, y, maxWidth) {
    let words = txt.split(' ');
    let line = '';
    let lineHeight = 20; // Set a fixed line height

    for (let n = 0; n < words.length; n++) {
        let testLine = line + words[n] + ' ';
        let testWidth = textWidth(testLine);
        if (testWidth > maxWidth && n > 0) {
            text(line, x, y);
            line = words[n] + ' ';
            y += lineHeight;
        } else {
            line = testLine;
        }
    }
    text(line, x, y);
}

function least(a, b) {
    if (a < b) return a
    else return b
}

function gameEnd(c) {
    if (noPossibleMoves(c)) {
        if (c == 'b') {
            error_message = 'Game ends, Black player wins'
        } else if (c == 'w') {
            error_message = 'Game ends, White player wins'
        }
    }
}

function noPossibleMoves(player) {
    let current = score();
    let counter = true
    if (player == 'b') {
        for (let i = 0; i <= mul; i++) {
            if (!(isInArray(i, occupied))) {
                let tempScore1 = score2(i, w_pos_num[1], b_pos_num[0], b_pos_num[1])
                if (tempScore1 < current) counter = false;
                let tempScore2 = score2(w_pos_num[0], i, b_pos_num[0], b_pos_num[1])
                if (tempScore2 < current) counter = false;
            }
        }
    } else if (player == 'w') {
        for (let i = 0; i <= mul; i++) {
            if (!(isInArray(i, occupied))) {
                let tempScore3 = score2(w_pos_num[0], w_pos_num[1], i, b_pos_num[1])
                if (tempScore3 < current) counter = false;
                let tempScore4 = score2(w_pos_num[0], w_pos_num[1], b_pos_num[0], i)
                if (tempScore4 < current) counter = false;
            }
        }
    }
    return counter;
}