

//fetch the items from the json file
function loadItems(){
    return fetch('data/data.json')
    .then(response => response.json()) //=> to make fetched response to object
    .then(json => json.items)
}

function displayItems(items){
    const container = document.querySelector('.items');
    container.innerHTML = items.map(item=> createHTMLString(item)).join('');
}

//create html list item from the given data item
function createHTMLString(item){
    return `
    <li class="item">
        <img src="${item.image}" alt="${item.type}" class="thumbnail">
        <span class='item_description'>${item.gender}, ${item.size}</span>
    </li>
    `
}
function setEventListeners(items){
    const logo = document.querySelector('.logo');
    const buttons =document.querySelector('.buttons');
    logo.addEventListener('click',()=> {
        displayItems(items);
    });
    buttons.addEventListener('click', e=>onButtonClick(e,items))
    
}

function onButtonClick(e, items){
    const dataset = e.target.dataset;
    const key = dataset.key;
    const value = dataset.value;
    console.log(dataset);
    if(key == null || value == null){
        return;
    }
    displayItems(items.filter(item => item[key]===value))

}

//main
loadItems()
.then(items => {
    
    displayItems(items);
    setEventListeners(items);
})
.catch(console.log("Something is wrong !"))

