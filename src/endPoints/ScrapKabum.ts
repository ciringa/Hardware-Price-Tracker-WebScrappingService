import { PuppeteerError } from "puppeteer";
import { StaticLink } from "../../prisma/indev-output";
import { prisma_dev } from "../lib/prisma";
import { KabumScrappingUseCase } from "../services/scrap/Kabum/KabumGeneralScrappingService";
import { PrismaProductRepository } from "../repositories/PrismaDeploy/PrismaProductRepository";
import { PrismaPriceRepository } from "../repositories/PrismaDeploy/PrismaPriceRepository";
import { KabumLinkCollection } from "../collections/StandardLinkCollection";

(async()=>{
    
    const ErrorList:Error[] = [];

    const publicService = new KabumScrappingUseCase(new PrismaProductRepository,new PrismaPriceRepository)

    var indexControl = 0
    //     const LinkList:StaticLink[] = await prisma_dev.staticLink.findMany({
    //         where:{
    //             Where:"Kabum"
    //         }
    //     })     

    async function RecursiveGenScrapFromLinkList(){
        indexControl++  
        //Scrap Service
        const link = KabumLinkCollection.subSitesList[0]
        var returnp:any[] = []
        try{    
            //chamar o serviço de scrapping e verificar seu resultado
            const resp = await publicService.excute(link)
            console.log(resp)
            returnp = [resp]
        }catch(err){
            if(err instanceof PuppeteerError){
                ErrorList.push(err)
            }
        }
    
        if(indexControl < 1){
            RecursiveGenScrapFromLinkList();
        }else{
            return returnp
        }
    }

    var ps = await RecursiveGenScrapFromLinkList()
    console.log(ps)
    //issues list later here


})()


