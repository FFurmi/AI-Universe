
const aiContainer = document.getElementById('ai-container')
const featureUl = document.getElementById('feature-ul')
const integrationUl = document.getElementById('integration-ul')
let all
const loadAIUniverse = async (take) => {
    // start loader
    toggleLoader(true)
    const url = `https://openapi.programming-hero.com/api/ai/tools`
    const res = await fetch(url)
    const data = await res.json()
    all = data.data.tools;

    const seeMore = document.getElementById('see-more')
   
    if (take != 0) {
        seeMore.classList.remove('d-none')
        all = all.slice(0, take)

    }
    else {
        seeMore.classList.add('d-none')
    }

    displayAIUniverse()
}


const displayAIUniverse = () => {

    const AISites = all
   // 
    // AISites.sort((a, b)=>{
    //     const date1 = new Date(a.published_in)
    //     const date2 = new Date(b.published_in)
    //     return date1 -date2
        
    // })
    
    console.log(AISites)
    for (const AISite of AISites) {
     
      //  console.log(AISite)
        const aiDiv = document.createElement('div')
        aiDiv.classList.add('col')
        aiDiv.innerHTML = `
        <div class="card h-100">
        <div class="p-2">
            <img src="${AISite?.image}" class="card-img-top rounded" alt="...">
        </div>
        <div class="card-body">
            <h5 class="card-title fw-bold">Feature</h5>
            ${test(AISite.features)}
        </div>
        
        <div class="card-footer ">
            <h5 class="fw-bold">${AISite.name}</h5>
            <div class="d-flex align-items-center justify-content-between">
                <div class="d-flex align-items-center justify-content-center text-secondary">
                    <p><i class="fa-solid fa-calendar-days me-2"></i></p>
                    <p>${AISite.published_in}</p>
                </div>
                <button onclick="singleAIDetails('${AISite.id}')"  class="button-transparent" data-bs-toggle="modal" data-bs-target="#singleAIModal"><i id="arrow-btn" class="fa-solid fa-arrow-right"></i></button>
            </div>
            
        </div>
        </div>
        `
        aiContainer.appendChild(aiDiv)
    }

    // Stop Loader
    toggleLoader(false)
}

function test(features) {
    var x = '';
    for (let i = 0; i < features.length; i++) {
        x += `<p class="card-text text-secondary">${i + 1}. ${features[i]}.</p>`;

    }
    return x;
}

const seeMoreBtn = () => {
    loadAIUniverse(0)
    aiContainer.innerHTML = ''
}

const toggleLoader = (isLoading) => {
    const loader = document.getElementById('loader')
    if (isLoading) {
        loader.classList.remove('d-none')
    }
    else {
        loader.classList.add('d-none')
    }
}

const singleAIDetails = async (id) => {
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`
    const res = await fetch(url)
    const data = await res.json()
    featureUl.innerHTML = ''
    integrationUl.innerHTML = ''
    
    displaySingleAIDetails(data.data)
   
}

const displaySingleAIDetails = (singleAI) => {
    //card 1
    const modalCard1Title = document.getElementById('modal-card1-title')
    const price1 = document.getElementById('price1')
    const price2 = document.getElementById('price2')
    const price3 = document.getElementById('price3')
    const plan1 = document.getElementById('plan1')
    const plan2 = document.getElementById('plan2')
    const plan3 = document.getElementById('plan3')
    
    //card 2
    const modalImg = document.getElementById('modal-img')
    const accuracyScore =document.getElementById('accuracy-score')
    const modalCard2Title = document.getElementById('modal-card2-title')
    const modalDescription = document.getElementById('modal-description')
   
    console.log(singleAI)

    modalCard1Title.innerText = singleAI.description
    if (singleAI.pricing === null) {
        price1.innerText = '$0'
        plan1.innerHTML = 'Free'


        price2.innerText = '$0'
        plan2.innerHTML = 'Free'

        price3.innerText = '$0'
        plan3.innerHTML = 'Free'
    }
    else{
        price1.innerText = singleAI.pricing[0].price
        plan1.innerHTML = singleAI.pricing[0].plan


        price2.innerText = singleAI.pricing[1].price
        plan2.innerHTML = singleAI.pricing[1].plan

        price3.innerText = singleAI.pricing[2].price
        plan3.innerHTML = singleAI.pricing[2].plan
    }

    const features =  singleAI.features
    for(const key in features){
        // console.log(features[key].feature_name)
        const li = document.createElement('li')
        li.innerText = features[key].feature_name
        featureUl.appendChild(li)
       // console.log(1)
    }
    
    const integrations = singleAI.integrations
    if(integrations != null){
    for(const integration of integrations){
        const li = document.createElement('li')
        li.innerText = integration
        integrationUl.appendChild(li)
    }}
    else{
        const li = document.createElement('li')
        li.innerText = 'No Integration'
        integrationUl.appendChild(li)
    }
   
    modalImg.src = "https://i.blogs.es/7b41f4/google-bard/1366_2000.jpeg"
    console.log(singleAI.logo)

    if(singleAI.accuracy.score != null){
    accuracyScore.innerText=  singleAI.accuracy.score*100}
    else{
        accuracyScore.innerText = '0'
    }

    modalCard2Title.innerText = singleAI.tool_name
    modalDescription.innerText = singleAI.description
}

function sortByDate(){
    all.sort((a, b)=>{
        const date1 = new Date(a.published_in)
        const date2 = new Date(b.published_in)
        return date1 -date2
        
    })

    aiContainer.innerHTML = ''
    displayAIUniverse()
}


loadAIUniverse(6)