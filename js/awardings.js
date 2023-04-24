console.log('you are viewing awarding page')
// VARIABLES
let shownLength=5;//initial list to show
let additionalshown=0;
//DOMS
const awardingContainer=document.querySelector('.awarding-container')
const showMoreButton=document.querySelector('.show-more-button')

// FUNCTIONS
function displayMoreAwards(shownLength,additionalshown){
    additionalshown+=3;//add three more to the list
    shownLength+=additionalshown;
    return shownLength, additionalshown;
}

function fetchList(shownLength){
    fetch('../data/awardings.json')
    .then(res=>res.json())
    .then(data=>{
        console.log('you made a sjon fet')
        console.log(data)
        for(let i=additionalshown;i<shownLength;i++){
            awardingContainer.insertAdjacentHTML('beforeend',`
                <div class = 'awardings'>
                    <h2>${data[i]}</h2>
                    <h2>${data[i].month} ${data[i].year}</h2>
                    <h3>${data[i].title}</h3>
                    <img src='${data[i].link}'/>
                </div>
        `)
        }
    })
}

//EVENTS
showMoreButton.addEventListener('click',()=>{
    displayMoreAwards(shownLength,additionalshown);
    fetchList(shownLength,additionalshown);
})

//SHOW INITIAL DATA ON PAGE LOAD
fetch('../data/awardings.json')
    .then(res=>res.json())
    .then(data=>{
        console.log('you made a sjon fet')
        console.log(data)
        for(let i=0;i<shownLength;i++){
            awardingContainer.insertAdjacentHTML('beforeend',`
                <div class = 'awardings'>
                    <h2>${data[i].month} ${data[i].year}</h2>
                    <h3>${data[i].title}</h3>
                    <img src='${data[i].link}'/>
                </div>
        `)
        }
    })