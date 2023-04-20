//DOMS
const carouselIndicators=document.querySelector('.carousel-indicators');
const carouselInner=document.querySelector('.carousel-inner');

//FETCH DATA FROM LOCAL JSON FILE
fetch('../data/testimonials.json')
    .then(res=>res.json())
    .then(data =>{
        console.log(data); 
        //display number of indicators
        for(let i=0;i<data.length;i++){
            if(i==0){
                carouselIndicators.insertAdjacentHTML('beforeend',`
                <li data-target='#myCarousel' data-slide-top='${i}' class='active'></li>
            `)
            }else{
                carouselIndicators.insertAdjacentHTML('beforeend',`
                <li data-target='#myCarousel' data-slide-top='${i}'></li>
            `)
            }
        }
        //display the carousel data here
        for(let i=0;i<data.length;i++){
            if(i==0){
                carouselInner.insertAdjacentHTML('beforeend',`
                <div class='item active'>
                    <h3>${data[i].message_title}</h3>
                    <p>${data[i].message}</p>
                </div>
            `)
            }else{
                carouselInner.insertAdjacentHTML('beforeend',`
                <div class='item'>
                    <h3>${data[i].message_title}</h3>
                    <p>${data[i].message}</p>
                </div>
            `)
            }
        }
            
        

    })

