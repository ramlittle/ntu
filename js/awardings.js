// VARIABLES
let shownLength=5;
let additionalShown=0;
let cards;
let collection=[];

//DOMS
const awardingContainer=document.querySelector('.awarding-container')
const showMoreButton=document.querySelector('.show-more-button')
const hideButton=document.querySelector('.hide-button')
const awardings=document.querySelector('.awardings')

// FUNCTIONS
function displayMoreAwards(shownLength,additionalShown){
    additionalShown=shownLength;//starting new value of iteration
    shownLength=additionalShown+5;//increment length by 5 each click of button
    collection = [shownLength,additionalShown]
    return collection;
}

function fetchList(shownLength){
    fetch('../data/awardings.json')
    .then(res=>res.json())
    .then(data=>{
        checkData(data,shownLength);
    })
}

function checkData(data){
    if(shownLength>data.length){
        alert('no more data to show')
    }else{
        for(let i=additionalShown;i<shownLength;i++){
            awardingContainer.insertAdjacentHTML('beforeend',`
                <div class = 'awardings'>
                    <h2>${data[i].month} ${data[i].year}</h2>
                    <h3>${data[i].title}</h3>
                    <img src='${data[i].link}'/>
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
    while(awardingContainer.hasChildNodes()){
        awardingContainer.removeChild(awardingContainer.firstChild)
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
    removeShownCards();
    resetValues();
})


//DISPLAY DATA OF INITIAL PAGE LOAD
fetchList(shownLength,additionalShown);