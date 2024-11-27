const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';


class Field {
    constructor(field) {
        this.field = field,
        this.playerY = 0;
        this.playerX = 0;
        this.field[this.playerY][this.playerX] = pathCharacter;
    }

    print() {
        console.log(this.field.map((value) => value.join('')).join('\r\n'))
    }
    
    playGame() {
        let playing = true;
        while (playing) {
            this.print();
            const direction = prompt('Wich way? ');
            this.movePlayer(direction);

            if (this.checkWin()) {
                console.log('You found the hat!');
                playing = false;
            } else if (this.checkLoss()) {
                console.log('Game over!');
                playing = false;
            } else {
                this.field[this.playerY][this.playerX] = pathCharacter;
            }

        }
    }

    movePlayer(direction) {
        if (direction === 'up') {
            this.playerY -= 1
        } else if (direction === 'down') {
            this.playerY += 1
        } else if (direction === 'left') {
            this.playerX -= 1
        } else if (direction === 'right') {
            this.playerX += 1
        }
    }


    checkWin() {
        return this.field[this.playerY][this.playerX] === hat;
    }

    checkLoss() {
        if (this.field[this.playerY][this.playerX] === hole) {
            return true;
        } else if (this.playerX < 0 || this.playerX >= this.field[0].length || this.playerY < 0 || this.playerY >= this.field.length) {
            return true;
        } else {
            return false;
        }
    }

    static generateField(height, width, percentage) {
        const field = [];
        // Initialize the field with fieldCharacter
        for (let i = 0; i < height; i++) {
            field.push(new Array(width).fill(fieldCharacter));
        }

        //Place the hat
        let hatPlaced = false;
        while (!hatPlaced) {
            const hatX = Math.floor(Math.random() * width);
            const hatY = Math.floor(Math.random() * height);
            if (hatX !== 0 || hatY !== 0) {
                field[hatY][hatX] = hat;
                hatPlaced = true;
            }
        }

        //Calculate the number of holes
        const numHoles = Math.floor(height * width * percentage);

        //Place the Holes
        let holesPlaced = 0;
        while (holesPlaced < numHoles) {
            const holeX = Math.floor(Math.random() * width);
            const holeY = Math.floor(Math.random() * height);
            if (field[holeY][holeX] === fieldCharacter && (holeX !== 0 || holeY !== 0)) {
                field[holeY][holeX] = hole;
                holesPlaced++
            }
        }
        return field;
    }
}

const myField = new Field(Field.generateField(5, 5, 0.2));
myField.playGame();