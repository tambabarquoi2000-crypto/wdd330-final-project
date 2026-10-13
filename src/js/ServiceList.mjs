import { renderListWithTemplate } from "./utils.mjs";


export default class ServiceList
{
    constructor(fileName, listParent)
    {
        this.dataSource = fileName;
        this.listParent = listParent;
    }

    init()
    {
        this.renderWithList();
    }

    renderWithList()
    {
        renderListWithTemplate
            (this.dataSource, 
            serviceCardTemplate, 
            this.listParent, 
            "afterbegin");
    }
}


function serviceCardTemplate(service){
    return(
    `
        <li>
            <a class="card" href="#">
                <img src="${service.image}" alt="${service.name}" width=400 height=400>
                <div>
                    <div>
                        <h2>${service.name}</h2>
                        <h3>Category: ${service.category}</h3>
                    </div>
                    <div>
                        <p>${service.price}</p>
                        <p>Duration: ${service.duration}
                    </div>
                    <div>
                        <p>${service.description}</p>
                    </div>
                </div>
            </a>
        </li>

    `)
}
