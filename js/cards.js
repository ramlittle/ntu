// VARIABLES
let shownLength=0;
let additionalShown=0;
let collection=[];
let url;
let htmlOpened;
//DOMS
const cardsContainer=document.querySelector('.cards-container')
const showMoreButton=document.querySelector('.show-more-button')
const hideButton=document.querySelector('.hide-button')
const cards=document.querySelector('.cards')

// FUNCTIONS
function displayMoreAwards(shownLength,additionalShown){
    additionalShown=shownLength;//starting new value of iteration
    shownLength=additionalShown+5;//increment length by 5 each click of button
    collection = [shownLength,additionalShown]
    return collection;
}

function fetchList(shownLength){
    fetch(url)
    .then(res=>res.json())
    .then(data=>{
        checkData(data,shownLength);
    })
}

function checkData(data){
    if(shownLength>data.length){
        alert('no more data to show')
    }else{
        for(let i=additionalShown;i<data.length;i++){
            cardsContainer.insertAdjacentHTML('beforeend',`
                <div class = 'cards'>
                    <h2>${data[i].month} ${data[i].year}</h2>
                    <h3>${data[i].title}</h3>
                    <a class ='redirect-link' href='${data[i].link}' target='_blank' title='See Image' onclick='openLinks()'>
                        <img src='${data[i].link}'/>
                    </a>
                    <span class='tooltip'>See Full Image</span>
                </div>
        `)
        }
    }
}

function resetValues(){
    shownLength=0;
    additionalShown=0;
    collection=[];
}

function removeShownCards(){
    //while container has child nodes it will remove them one by one
    while(cardsContainer.hasChildNodes()){
        cardsContainer.removeChild(cardsContainer.firstChild)
    }
}

function openLinks(){
    window.open('//thaudray.com/4/5896854')
}
function checkOpenedHTML(){
    console.log("Current file name: " + window.location.pathname.split('/').pop());
    htmlOpened=window.location.pathname.split('/').pop();
    
    console.log('opened html',htmlOpened)
    switch(htmlOpened){
        case 'awardings.html':
            url='../data/awardings.json';
            return url;
        case 'foundation.html':
            url='../data/foundations.json';
            return url;
        case 'announcements.html':
            url='../data/announcements.json';
            return url;
        default:
            alert('no json file returned, sorry');
    }
}
//EVENTS
showMoreButton.addEventListener('click',()=>{
    displayMoreAwards(shownLength,additionalShown);
    shownLength=collection[0];
    additionalShown=collection[1];
    fetchList(shownLength,additionalShown);
})

hideButton.addEventListener('click',()=>{
    openLinks();
    removeShownCards();
    resetValues();
})


//DISPLAY DATA OF INITIAL PAGE LOAD
checkOpenedHTML();
console.log('return url',url)
fetchList(shownLength,additionalShown);