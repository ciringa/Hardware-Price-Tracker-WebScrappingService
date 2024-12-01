import puppeteer from "puppeteer";
import { PichauLinkCollection } from "../../collections/StandardLinkCollection";
import { StaticLinkRepository } from "../../repositories/StaticLink.repository";
import { StaticLink } from "../../../prisma/indev-output";

interface linkList{
    Link:string,
}

export class GetPichauLinkListUseCase{
    constructor(private LinksRepository:StaticLinkRepository){}
    async execute(){
        const browser = await puppeteer.launch({
            headless:false
        });
        const page = await browser.newPage();
    
        await page.goto(PichauLinkCollection.coreSite)
    
        //aguarda até que tudo carregue devidamente
        await page.waitForNetworkIdle({
            timeout:80000
        })
    
        await page.click("div.MuiGrid-root.MuiGrid-item.MuiGrid-grid-md-4.MuiGrid-grid-xl-3 > button.MuiButtonBase-root[aria-label='menu']")
        await page.waitForSelector("div.MuiPaper-root.MuiDrawer-paper.MuiDrawer-paperAnchorLeft.MuiPaper-elevation16")
        const ps = await page.evaluate(()=>{
            const DOMCore = document.querySelector("div.MuiPaper-root.MuiDrawer-paper.MuiDrawer-paperAnchorLeft.MuiPaper-elevation16") as HTMLDivElement;
            const LiList = DOMCore.querySelectorAll("li" ) as NodeListOf<HTMLLIElement>
            var resList:linkList[] = []
    
            LiList.forEach(Element=>{
                const searchForA = Element.querySelector("a") as HTMLAnchorElement
                resList.push({
                    Link:searchForA.href
                })
            })
    
            return resList
        })
        // console.log(ps)
        await browser.close()

        const created:StaticLink[] = [] 
        ps.forEach(async (Element,index)=>{
            if(index>0&&index<18){
                const Link = await this.LinksRepository.create({
                    Link:Element.Link
                })
                created.push(Link)
            }
        })

        return{
            StaticLinkList:created
        }
    }
}