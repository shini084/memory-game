
var images= {}
var cards  = {}
var cardsUpMax = 2
var animals = []
var game = document.getElementById('menu')
var numCards = 0
var animalsStr = []

function start(num, anima){
    animals = anima
    console.log(animals)
    numCards = num
    game.id = 'game'
    game = document.getElementById('game')
    var start = document.getElementById('istart')
    var again = document.querySelector('.playAgain')

    start.style.display = 'none'
    again.style.display = 'none'
    
    var cont = []
    for (c=0;c<numCards/2;c++){
        cont.push(0)
        images[c] = []
        animalsStr.push(`'${animals[c]}'`)
    }

    for (c=0; c<numCards; c++){
        
        while (true){
            var num = Math.floor(Math.random() * numCards/2)
            if (cont[num] < 2){
                break
            }
        }

        var backCardImg = document.createElement('img')
        var backCardDiv = document.createElement('div')
        var card = document.createElement('div')
        var imgCardImg = document.createElement('img')
        var imgCardDiv = document.createElement('div')
        
        cards[c] = [num, 0]
        backCardImg.src = '../images/back-card.jpg'

        for (n=0; n<numCards/2; n++){
            if (num == n){
                imgCardImg.src = `../images/${animals[n]}.jpg`
                cont[n]++
                images[n].push(c)
            }
        }

        imgCardImg.className = 'imgCardImg'
        backCardDiv.className = 'backCardDiv'
        backCardImg.className = 'backCardImg'
        backCardDiv.className = 'backCardDiv'
        imgCardDiv.className = 'imgCardDiv'
        card.className = 'card'

        card.id = `card${c}`
        backCardDiv.id = `backCardDiv${c}`

        card.setAttribute('onclick', `turn(${c})`)

        backCardDiv.appendChild(backCardImg)
        imgCardDiv.appendChild(imgCardImg)
        game.appendChild(card)
        card.appendChild(imgCardDiv)
        card.appendChild(backCardDiv)
    }
}

function cardsTurned(){
   let turn = [0, 0]
    for(c=0;c<numCards;c++){
        if (cards[c][1] == 0){
            turn[0]++
        } else{
            turn[1]++
        }
    }
    return turn
}

function turn(idCard){
    let cardTurn = document.getElementById(`backCardDiv${idCard}`)

    var controlTurn = cardsTurned()
    cardsUpMax = Number(pair()) * 2 + 2

    if (cards[idCard][1] == 0 && controlTurn[1] < cardsUpMax){
            cardTurn.setAttribute('style', 'z-index: -1;')
            cards[idCard][1]++
    } else if (controlTurn[1] == cardsUpMax){
        for(c=0;c<numCards;c++){
            if(cards[c][1] == 1){
                document.getElementById(`backCardDiv${c}`).setAttribute('style', 'z-index: 1;')
                cards[c][1] = 0
            }
        }
    }

    if (controlTurn[1] == numCards - 1){
        game.id = 'menu'
        let again = document.getElementById('iPlayAgain')
        again.style.display = 'inline-block'
        
        for(c=0;c<numCards;c++){
            let noCard = document.getElementById(`card${c}`)
            noCard.style.display = 'none'
        }
    }

}

function pair(){
    numPair = 0
    for (n=0;n<numCards/2;n++){
        if (cards[images[n][0]][1] != 0 && cards[images[n][1]][1] != 0){
            cards[images[n][0]][1] = 2
            cards[images[n][1]][1] = 2
            numPair++
        }   
    }
    return numPair;
}

function reset(){
    images = {}
    cards = {}
    cardsUpMax = 2
    game.innerHTML = `<input type="button" value="Start" onclick="start(${numCards}, [${animalsStr}])" class="button start" id="istart"><input type="button" value="Play Again" onclick="reset()"class="button playAgain" id="iPlayAgain">`
}