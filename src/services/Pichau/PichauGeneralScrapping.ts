import puppeteer from "puppeteer";
import { TransferDataObjectFromDOM } from "../../collections/domRecieverInterface";

export class PichauGeneralScrappingUseCase {
    constructor(){}
    async execute(CoreUrl:string){
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.setViewport({ width: 1080, height: 1024 });
    
        const searchList = CoreUrl;
        const PoquireReturnList:TransferDataObjectFromDOM[] = [];
    
        await page.goto(searchList, { waitUntil: "networkidle2",timeout:60000 });
        
        await page.waitForNetworkIdle({timeout:40000})
    
        const Ps = await page.evaluate(()=>{
            //Encontra elementos específicos 
            const DOMList = document.querySelector(".MuiGrid-root.MuiGrid-container.MuiGrid-spacing-xs-3") as HTMLDivElement
            const iDivList = DOMList.querySelectorAll(".MuiGrid-root.MuiGrid-item.MuiGrid-grid-xs-6.MuiGrid-grid-sm-6.MuiGrid-grid-md-4.MuiGrid-grid-lg-3.MuiGrid-grid-xl-2") as NodeListOf<HTMLDivElement>
    
            var prepList:TransferDataObjectFromDOM[] = [];
    
            for(let i=0;i<iDivList.length;i++){
                
                const element = iDivList[i];
                if(element){
                    //seleciona os elementos HTML dentro do elemento principal 
                    const aReference = element.querySelector("a") as HTMLAnchorElement;
                    const imgReference = element.querySelector("img") as HTMLImageElement;
                    const h2Reference = element.querySelector("h2");
                    const SpanForprice = element.querySelector("span") as HTMLSpanElement;
                    
                    const prepCon:TransferDataObjectFromDOM = {
                        Link:aReference.href,
                        Where:window.location.href,
                        description:h2Reference?h2Reference.innerHTML:null,
                        image:imgReference?imgReference.src:null,
                        Price:SpanForprice?Number(SpanForprice.innerHTML.replace("R$&nbsp;","").replace(/[^0-9]/g, '')):null
                    }
                    prepList.push(prepCon)
                }
            }
            if(prepList[0]){
                return prepList
            }else{
                return false
            }
        })
    
        console.log({
            psList:Ps,
        });
    
        await page.close();
        await browser.close();
 
        return {
            ResList:Ps
        }
    }
}