let pack=['tambourineAce','tambourineSix','tambourineSeven','tambourineEight','tambourineNine','tambourineTen','tambourineJack','tambourineLady','tambourineKing','peaksAce','peaksSix','peaksSeven','peaksEight','peaksNine','peaksTen','peaksJack','peaksLady','peaksKing','heartAce','heartSix','heartSeven','heartEight','heartNine','heartTen','heartJack','heartLady','heartKing','christenAce','christenSix','christenSeven','christenEight','christenNine','christenTen','christenJack','christenLady','christenKing','tambourineTwo','tambourineThree','tambourineFour','tambourineFive','peaksTwo','peaksThree','peaksFour','peaksFive','heartTwo','heartThree','heartFour','heartFive','christenTwo','christenThree','christenFour','christenFive'],
    packSave = [],
    countCard = pack.length-1, 
    urlCard = 'assets/img/cards/',
    btnStart = document.querySelector('.btn-start'),
    allUrlCard = pack.map((nameCard) => 'assets/img/cards/'+nameCard+'.png' ),
    rememberCard=[],
    tapBtn={id:0,elem:''},
    btnCheck = document.querySelector('.btn-check'),
    isStart = false;

function randomInteger(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}

function nextCard() {
    return randomInteger(0,countCard);
}

function checkCard(num) {
    if(pack[num].length)
        return true;
}

function addSave(num) {
    packSave.push(pack[num]);
}

function deleteSave() {
    packSave = [];
}

function deleteCard(num) {
    pack[num] = '';
}

function showSaveCard() {
    return packSave;
}

function getURLCard(card) {
    return urlCard+card+'.png';
}

function control() {
    let num = nextCard();
    if(checkCard(num)) {
        let selectCard = pack[num];
        addSave(num)
        deleteCard(num);
        return getURLCard(selectCard);
    } else {
        if(packSave.length<=countCard) {
            return control()
        } else {
            return 'В колоде нет больше карт';
        }
    }
}

// Сделаю пока по умолчанию рубашку
function defCover(nameCover = 'assets/img/cards/blueCover.png') {
    document.querySelector('.coverCard').src = nameCover;
}
defCover();

function changeColor(color) {
    document.documentElement.style.setProperty('--color', color);
}

function start() {
    document.querySelector('.testMemory').classList.add('hide');

    let allTime = +document.querySelector('.count').value, 
        showTime = +document.querySelector('.time').value;
    function playTime(allTime,showTime) {
        time = setInterval(()=> { document.querySelector('.targetCard').src = control(); },showTime*1000);
        setTimeout(()=> { 
            clearInterval(time); 
            document.querySelector('.targetCard').src = ''; 
            //сюда прописать очистку поля с кнопками
            btnSelectCard();
            document.querySelector('.testMemory').classList.remove('hide');
            isStart = false;
        }, (allTime+1)*1000);
    }
    
    playTime(allTime,showTime);
}

btnStart.addEventListener('click', ()=>{
    if (!isStart){
        isStart=true;
        deleteSave();
        start();
    } else {
        console.log('Внимательнее. Уже запущено')
    }
});


function fieldAllCards() {
    let input = document.createElement('input'),
        label = document.createElement('label'),
        img = document.createElement('img'),
        test = document.createElement('div');

    test.className = 'test hide';
    input.setAttribute('type','radio');
    img.setAttribute('width','50px');
    input.classList.add('hide');
    input.setAttribute('name','card');
    
    pack.map((nameCard,i) => {
        input.setAttribute('id', nameCard);
        label.setAttribute('for', nameCard);
        img.setAttribute('src', allUrlCard[i]);
        label.appendChild(img);
        test.appendChild(input);
        test.appendChild(label);
        test.innerHTML+='';
    });
    document.querySelector('.cardType').append(test);
}
fieldAllCards();

let cards=document.getElementsByName('card');
for(i=0; cards.length>i; i++) {
    cards[i].addEventListener('change', function(e) {
        tapBtn.elem.setAttribute('style','background-image: url("assets/img/cards/'+e.target.id+'.png")');
        rememberCard[tapBtn.id] = e.target.id;
        document.querySelector('.test').classList.add('hide');
    });
}

function btnSelectCard() {
    let button = document.createElement('button'),btns='';
    button.className='btn btn-select';
    packSave.map((nameCard,i)=> {
        button.innerHTML = 'Выбрать '+ ++i +' карту';
        button.setAttribute('id',i);
        
        btns += button.outerHTML;
    });
    document.querySelector('.btnsSelect').innerHTML=btns;

    actionBtnSelect();
}

function actionBtnSelect() {
    let btnSelect = document.getElementsByClassName('btn-select');
    for(i=0; btnSelect.length>i; i++) {
        btnSelect[i].addEventListener('click',(e)=>{
            document.querySelector('.test').classList.remove('hide');
            tapBtn.id = +e.target.id - 1;
            tapBtn.elem = e.target;
        });
    }
}

function checkResult() {
    let btnSelect = document.getElementsByClassName('btn-select'), style='';
    for(i=0; btnSelect.length>i; i++) {
        style = btnSelect[i].getAttribute('style');
        btnSelect[i].setAttribute('style',style+',url("assets/img/cards/'+packSave[i]+'.png");');
    }
}
btnCheck.addEventListener('click', checkResult);