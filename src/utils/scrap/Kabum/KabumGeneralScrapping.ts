import puppeteer from "puppeteer"
import { KabumLinkCollection } from "../../../collections/StandardLinkCollection"
import { TransferDataObjectFromDOM } from "../../../collections/domRecieverInterface"

(async()=>{
    const browser = await puppeteer.launch({
        headless:false
    })
    const page =  await browser.newPage()
    await page.goto(KabumLinkCollection.subSitesList[0]);
    
    //Aguarda o carregamento da pagina
    await page.waitForNetworkIdle({
        timeout:80000
    })

    //garante que o seletor principal vai ser retornado
    await page.waitForSelector("main.sc-1be01e1c-9.bpRSSD")
    await page.waitForSelector(".priceCard")
    //função executada no DOM da pagina
    const ps = await page.evaluate(()=>{
        const DOM = document.querySelector("main.sc-1be01e1c-9.bpRSSD");
        const ContainerList = DOM?.querySelectorAll("a") as NodeListOf<HTMLAnchorElement>;
        const returnList:TransferDataObjectFromDOM[] = []

        for(let i=0;i<ContainerList.length;i++){
            const element = ContainerList[i]
            const GetSpanElementFromH3 = element.querySelector("span.sc-d79c9c3f-0.nlmfp.sc-27518a44-9.iJKRqI.nameCard") as HTMLSpanElement
            const GetImageElementForLink = element.querySelector("img") as HTMLImageElement
            const GetPriceFromElement = element.querySelector("div.availablePricesCard > div.flex.items-center > span.priceCard") as HTMLSpanElement
            
            if(GetPriceFromElement){
                let prop:TransferDataObjectFromDOM = {
                    description:GetSpanElementFromH3.innerHTML,
                    Where:window.location.href,
                    image:GetImageElementForLink.src,
                    Link:element.href,
                    Price:Number(GetPriceFromElement.innerHTML)
                }
                returnList.push(prop)
            }
        }
        return returnList
    })
    console.log(ps)

    browser.close()
})()