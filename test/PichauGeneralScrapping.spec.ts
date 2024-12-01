import { beforeEach, describe, expect, it } from "vitest";
import { PichauGeneralScrappingUseCase } from "../src/services/Pichau/PichauGeneralScrapping";
import { PichauLinkCollection } from "../src/collections/StandardLinkCollection";


var SUT:PichauGeneralScrappingUseCase

describe("Good Case",async()=>{
    beforeEach(async()=>{  
        SUT = new PichauGeneralScrappingUseCase
    })
    it("Should be able to scrap pichau",async()=>{
        const ps = await SUT.execute(PichauLinkCollection.subSitesList[0]);

        expect(ps.ResList).toHaveLength(36)
    },{
        timeout:60000
    })
})
