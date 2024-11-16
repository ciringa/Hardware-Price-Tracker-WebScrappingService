import puppeteer from "puppeteer";
import { TransferDataObjectFromDOM } from "../../../collections/domRecieverInterface";
import { TeraByteLinkCollection } from "../../../collections/StandardLinkCollection";
import { ProductRepository } from "../../../repositories/Product.repository,";
import { sluggen } from "../../../utils/sluggen";
import { Product } from "../../../../prisma/deploy-output";

interface TerabyteProductScrapResponse{
    resList:Product[]
}

export class TerabyteProductScrapUseCase {
    constructor(private ProductRepository:ProductRepository){}
    async execute(queryParam:string){
        //cria uma instancia de um browser
        const browser = await puppeteer.launch({
            headless:false
        })
        //Abre uma nova pagina
        const page  = await browser.newPage();

        //ir até o site desejado
        await page.goto(queryParam);
        await page.waitForNetworkIdle({
            timeout:80000
        })

        const ps:TransferDataObjectFromDOM[] = await page.evaluate(()=>{
            const DOM = document.querySelector(".products-grid") as HTMLDivElement
            const ItensList = DOM.querySelectorAll("div.product-item") as NodeListOf<HTMLDivElement>
            const resList:TransferDataObjectFromDOM[] = []

            ItensList.forEach(Element=>{
                const aElement = Element.querySelector("a.product-item__name") as HTMLAnchorElement
                const HToDescription = aElement.querySelector("h2") as HTMLHeadingElement
                const imgToLink = Element.querySelector("img.image-thumbnail") as HTMLImageElement
                const SpanForprice = Element.querySelector("div.product-item__new-price > span") as HTMLSpanElement
                const t:TransferDataObjectFromDOM = {
                    description:HToDescription.innerHTML,
                    image:imgToLink.src,
                    Link:aElement.href,
                    Where:window.location.href,
                    Price:Number(SpanForprice.innerHTML.replace(",",".").replace(/[^0-9.]/g, '')),
                    Title:HToDescription.innerHTML
                }
                resList.push(t)
            })

            return resList

        })
        //closes the browser
        browser.close()

        console.log(ps)

        const resList:Product[] = []
        ps.forEach(async Element=>{
            resList.push(
                await this.ProductRepository.create({
                    Kind:"TeraByte",
                    Link:Element.Link,
                    Slug:sluggen(String(Element.description)),
                    Value:Number(Element.Price),
                    Where:Element.Where,
                    Description:Element.description,
                    ImageUrl:Element.image,
                    Title:Element.Title
                })
            )
        })

        return {
            resList 
        }
    }


}