const servicesEl = document.querySelector(".services")
const tBody = document.getElementById("tBody")
const notesContent = document.getElementById("notes-content")
const totalContent = document.getElementById("total-content")
const btnSubmit = document.getElementById("btn-submit")

let services = [
    {
        id: "1",
        name: "Wash Car",
        price: 10
    },
    {
        id: "2",
        name: "Mow Lawn",
        price: 20
    },
    {
        id: "3",
        name: "Pull Weeds",
        price: 30
    }
]

let requestedServices = []

renderServiceButtons()

btnSubmit.addEventListener("click", () => {
    if (requestedServices.length){
        alert("The invoice has been sent!")
        requestedServices = []
        renderRequestedServices()
    } else {
        alert("Please select a service first!")
    }
    
})

function renderServiceButtons(){
    servicesEl.innerHTML = ""
    services.forEach(service => {
    servicesEl.innerHTML += `
        <button
            class="btn-serv"
            onclick="requestService('${service.id}')"
        >
            ${service.name}: $${service.price}
        </button>
        `
    })
}

function requestService(serviceid){
    const selectedItem = services.find(item => item.id == serviceid)
    if (!requestedServices.includes(selectedItem)){
        requestedServices.push(selectedItem)
    }
    renderRequestedServices()
}

function removeService(id){
    const index = requestedServices.findIndex(el => el.id == id)
    requestedServices.splice(index, 1)
    renderRequestedServices()
}

function renderRequestedServices(){
    tBody.innerHTML = ""
    requestedServices.forEach(requestService => {
        tBody.innerHTML += `
        <div class="tBody-row">
                <span class="service-name">${requestService.name}</span>
                <a class="service-remove" onclick="removeService('${requestService.id}')">Remove</a>
                <span class="service-price">
                    <span class="currency">$</span>${requestService.price}
                </span>
        </div>
        `
    })
    
    notesContent.innerHTML = requestedServices.length ? `We accept cash, credit card, or PayPal` : ""
    totalContent.innerHTML = calculateTotal()
}

function calculateTotal(){
    let total = 0
    requestedServices.forEach(requestedService => total += requestedService.price)
    return `$${total}`
}