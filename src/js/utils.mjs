const  baseURL = import.meta.env.BASE_URL;

export async function loadData(name)
{
    try {
        const res = await fetch(`${baseURL}services/${name}.json`);
        if(!res.ok)
        {
            throw new Error(res)
        }
        const data = await res.json();
        return(data);
    }

    catch(err)
    {
        console.log(err.message);
    }
}


export async function headerFooter(){
    const header = await loadTemplate('header');
    
    const footer = await loadTemplate('footer');

    const hParent = document.getElementById('main-header');
    const fParent = document.getElementById('main-footer');

    renderWithTemplate(header, hParent);
    renderWithTemplate(footer, fParent);
    setMenuLinks();
    displayMenu();
    identifyCurrentPage();

    initSubscribeToNews()

}

export async function renderListWithTemplate(fileName, templateFn, parentElement, postion, clear=false)
{
    const items = await loadData(fileName);

    const htmlStrings = items.map(item => {
        return templateFn(item)
    });

    if(clear){
        parentElement.innerHTML = "";
    }

    parentElement.insertAdjacentHTML(postion, htmlStrings.join(""));
    

}


async function renderWithTemplate(template, parentElement, data, callbackFn){
    const fragment = document.createRange()
            .createContextualFragment(template);

    parentElement.replaceChildren(fragment);

    if(callbackFn){
        callbackFn(data);
    }

}

async function loadTemplate(name){
    try{
        const res = await fetch(`${baseURL}partials/${name}.html`);
        if(!res.ok){
            throw new Error(res.json())
        }
        return res.text();
    }
    
    catch (err){
        console.log(err.error)
    }
    
}

function displayMenu() {
    const menuBtt = document.getElementById('menu-btt');
    const menuCont = document.getElementById('menu-cont');
    const desktop = window.matchMedia('(min-width: 768px)');

    menuBtt.addEventListener('click', () => {
        menuBtt.classList.toggle('active');
        menuCont.classList.toggle('open');
    });

    desktop.addEventListener('change', () => {
        menuCont.style.transition = 'none';

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                menuCont.style.transition = '';
            });
        });
    });
}

 function identifyCurrentPage(){
    let currentPage = window.location.pathname;

    // console.log(currentPage.endsWith('/'));
    currentPage += 'index.html';

    // console.log(currentPage);

    const menuLists = document.querySelectorAll('#menu-list li a');


    menuLists.forEach(menu => {
        const menuPath = menu.getAttribute('href')

        // console.log(menu.getAttribute('href'));

        if(menuPath === currentPage){
            menu.classList.add('current');
        }
    })

}


function setMenuLinks(element){
    const homePath = `${baseURL}`;
    const home = document.getElementById('homeLink');

    const requestPath = `${baseURL}repair/fire_detection.html`;
    const request = document.getElementById('requestRepair');

    const servicesPath = `${baseURL}services/`
    const services = document.getElementById("services");

    setElementPath(home, homePath);
    setElementPath(request, requestPath);
    setElementPath(services, servicesPath);


}

function setElementPath(element, path){
    element.setAttribute("href", path);
}


export function getLocalStorate(key)
{
    try
    {
        const localData = localStorage.getItem(key)
        return JSON.parse(localData);
    }
    catch (error) {
        console.log("Could not get item")
    }
}


export function setLocalStorage(key, value)
{
    localStorage.setItem(key, JSON.stringify(value));

}


function initSubscribeToNews()
{
    const subForm = document.getElementById("subForm");
    const subscribeBtt = document.querySelector("#subForm button");
    
    subscribeBtt.addEventListener("click",
        (e) => {
            e.preventDefault();
            const isValid = subForm.checkValidity();
            
            if(isValid)
            {
                const formData = new FormData(subForm);
                const dataObj = Object.fromEntries(formData);

                const subscribers = getLocalStorate("sub")|| [];
                subscribers.push(JSON.stringify(dataObj));

                console.log(subscribers);

                setLocalStorage("sub", subscribers);
                subForm.reset();
            }
        }
    )
}

