




export async function headerFooter(){
    const header = await loadTemplate("header");
    const footer = await loadTemplate("footer");

    const hParent = document.getElementById("main-header");
    const fParent = document.getElementById("main-footer");

    renderWithTemplate(header, hParent);
    renderWithTemplate(footer, fParent);
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
        const res = await fetch(`/partials/${name}.html`);
        if(!res.ok){
            throw new Error(JSON.stringify(body))
        }
        return res.text();
    }
    
    catch (err){
        console.log(err.message)
    }
    
}