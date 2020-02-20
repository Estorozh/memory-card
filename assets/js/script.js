let arr=['christenAce','christenTwo','christenThree','christenFour','christenFive','christenSix','christenSeven','christenEight','christenNine','christenTen','christenJack','christenLady','christenKing'], arrSave = [],countCard = arr.length-1, urlCard = 'assets/img/';

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
        setTimeout(()=> { clearInterval(time) }, allTime*1000);
    }
    
    playTime(allTime,showTime);
}

// Сделаю пока по умолчанию рубашку
function defCover(nameCover = 'assets/img/blueCover.png') {
    document.querySelector('.coverCard').src = nameCover;
}
defCover();

// Старт должен отрабатывать на кнопку Старт во вьюхе и принимать два параметра общее время в секундах и время показа в секундах
start(10,1);