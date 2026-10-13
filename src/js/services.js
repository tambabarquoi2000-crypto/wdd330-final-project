import "../css/global.css"
import "../css/style.css";
import "../css/services.css"

import { headerFooter, renderListWithTemplate } from "./utils.mjs";
import ServiceList from "./ServiceList.mjs";

headerFooter();


const fileName =  "services";
const listParent = document.getElementById("our-services")

const serviceList = new ServiceList(fileName, listParent);
serviceList.init();