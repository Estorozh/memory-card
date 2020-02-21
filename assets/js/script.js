let arr=['tambourineAce','tambourineTwo','tambourineThree','tambourineFour','tambourineFive','tambourineSix','tambourineSeven','tambourineEight','tambourineNine','tambourineTen','tambourineJack','tambourineLady','tambourineKing','peaksAce','peaksTwo','peaksThree','peaksFour','peaksFive','peaksSix','peaksSeven','peaksEight','peaksNine','peaksTen','peaksJack','peaksLady','peaksKing','heartAce','heartTwo','heartThree','heartFour','heartFive','heartSix','heartSeven','heartEight','heartNine','heartTen','heartJack','heartLady','heartKing','christenAce','christenTwo','christenThree','christenFour','christenFive','christenSix','christenSeven','christenEight','christenNine','christenTen','christenJack','christenLady','christenKing'], 
    arrSave = [],
    countCard = arr.length-1, 
    urlCard = 'assets/img/cards/';

function randomInteger(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}

function nextCard() {
    return randomInteger(0,countCard);
}

function checkCard(num) {
    if(arr[num].length)
        return true;
}

function addSave(num) {
    arrSave.push(arr[num]);
}

function deleteCard(num) {
    arr[num] = '';
}

function showSaveCard() {
    return arrSave;
}

function getURLCard(card) {
    return urlCard+card+'.png';
}

function control() {
    let num = nextCard();
    if(checkCard(num)) {
        let selectCard = arr[num];
        addSave(num)
        deleteCard(num);
        return getURLCard(selectCard);
    } else {
        if(arrSave.length<=countCard) {
            return control()
        } else {
            return 'В колоде нет больше карт';
        }
    }
}

function start(allTime,showTime) {
    function playTime(allTime,showTime) {
        time = setInterval(()=> { document.querySelector('.targetCard').src = control(); },showTime*1000);
        setTimeout(()=> { 
            clearInterval(time); 
            document.querySelector('.targetCard').src = ''; 
        }, allTime*1000);
    }
    
    playTime(allTime,showTime);
}

// Сделаю пока по умолчанию рубашку
function defCover(nameCover = 'assets/img/cards/blueCover.png') {
    document.querySelector('.coverCard').src = nameCover;
}
defCover();

// Старт должен отрабатывать на кнопку Старт во вьюхе и принимать два параметра общее время в секундах и время показа в секундах
// start(20,1);

function view() {
    let btnStart = document.querySelector('.btn-start'),
        allTime = +document.querySelector('.count').value,
        showTime = +document.querySelector('.time').value;
    btnStart.addEventListener('click', function () {
        start(allTime, showTime);
    })
}

view();