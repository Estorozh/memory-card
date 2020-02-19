let arr=['christenAce','christenTwo','christenThree','christenFour','christenFive','christenSix','christenSeven','christenEight','christenNine','christenTen','christenJack','christenLady','christenKing'], arrSave = [],countCard = arr.length-1;

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

function control() {
    let num = nextCard();
    if(checkCard(num)) {
        let selectCard = arr[num];
        addSave(num)
        deleteCard(num);
        return selectCard;
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
        time = setInterval(()=> {console.log(control()) },showTime*1000);
        setTimeout(()=> { clearInterval(time) }, allTime*1000);
    }
    
    playTime(allTime,showTime);
}

start(10,1);