//VARIABLES
const testimonialWrapper=document.querySelector('.testimonial-wrapper');
//FETCH DATA FROM LOCAL JSON FILE
fetch('../data/testimonials.json')
    .then(res=>res.json())
    .then(data =>{
        console.log(data);
        data.forEach(post=>{
            testimonialWrapper.insertAdjacentHTML('beforeend',`
                <div>
                    ${post.name}
                </div>`);
        })
    })

