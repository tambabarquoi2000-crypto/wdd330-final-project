const baseURL = import.meta.env.BASE_URL;


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
            throw new Error(JSON.stringify(body))
        }
        return res.text();
    }
    
    catch (err){
        console.log(err.message)
    }
    
}

function displayMenu() {
    const menuBtt = document.getElementById('menu-btt');
    const menuCont = document.getElementById('menu-cont');

    menuBtt.addEventListener('click', () => 
    {
        menuBtt.classList.toggle('active');
        menuCont.classList.toggle('open');
    })
}

 function identifyCurrentPage(){
    let currentPage = window.location.pathname;

    console.log(currentPage.endsWith('/'));
    currentPage += 'index.html';

    console.log(currentPage);

    const menuLists = document.querySelectorAll('#menu-list li a');


    menuLists.forEach(menu => {
        const menuPath = menu.getAttribute('href')

        console.log(menu.getAttribute('href'));

        if(menuPath === currentPage){
            menu.classList.add('current');
        }
    })

}


function setMenuLinks(element){
    const homePath = `${baseURL}`;
    const home = document.getElementById('homeLink');

    const requestPath = `${baseURL}repair/request.html`;
    const request = document.getElementById('requestRepair');

    setElementPath(home, homePath);
    setElementPath(request, requestPath);


}

function setElementPath(element, path){
    element.setAttribute("href", path);
}
