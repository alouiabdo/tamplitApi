let searchInput = document.querySelector(".search-input")
let suggestions = document.querySelector(".suggestions")
let newInput = document.querySelector(".newInput")
let myAllDatas =[]
let mayCitys =[]
async function myData(){
    let myjson = await fetch("https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json");
    let myAllData = await myjson.json()
    myAllDatas =[...myAllData]
}
searchInput.addEventListener("input", function (){
    let inputVue = searchInput.value
    suggestions.innerHTML =""
    let arrys = []
    myAllDatas.forEach(element => {
        let citys = element.city
        let states = element.state.toLowerCase()

        if(states.includes(inputVue)){
        // console.log(`${citys}, ${states}`)
        if(!arrys.includes(element.state)){
            arrys.push(element.state)
        }
        }
    });
    arrys.forEach(e => suggestions.innerHTML += `<li class="myLi"><p class ="paraTow">State : </p> ${e}
    </li>`)
    let li = document.querySelectorAll(".myLi")
        li.forEach(e=>e.addEventListener("click",function(){
            searchInput.value = e.childNodes[1].textContent.trim()
            let newInputs = document.createElement("input")
            newInput.appendChild(newInputs)
            newInputs.classList.add("inputnew")
            suggestions.innerHTML =""
                myAllDatas.forEach(element => {
                    if(e.childNodes[1].textContent.trim()== element.state){
                        mayCitys.push(element.city)
                        suggestions.innerHTML+= `<li class="myLi"><p class ="paraTow">City : </p> ${element.city}
                        </li>`
                    }
                })
                newInputs.addEventListener("input",function(){
                    console.log(newInputs.value)
                    suggestions.innerHTML=""
                    mayCitys.forEach(function(element){
                        // console.log(element)
                        if(element.toLowerCase().includes(newInputs.value)){
                            console.log(element)
                            suggestions.innerHTML+= `<li class="myLi"><p class ="paraTow">City : </p> ${element}
                        </li>`
                        let li = document.querySelectorAll(".myLi")
                        li.forEach(e=>e.addEventListener("click",function(){
                            newInputs.value = e.childNodes[1].textContent.trim()
                        }))

                        }
                    })
                })
        })
)})
searchInput.addEventListener("change", function (){
    if(searchInput.value == ""){
        suggestions.innerHTML =""
    }
})
// let inputnew = document.querySelector(".inputnew")
// console.log(inputnew)
myData()