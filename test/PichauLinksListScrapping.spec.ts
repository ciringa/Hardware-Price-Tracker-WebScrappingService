import { beforeEach, describe, expect, it } from "vitest";
import { GetPichauLinkListUseCase } from "../src/services/Pichau/GetLinkListFromPichau";
import { StaticLinkRepository } from "../src/repositories/StaticLink.repository";
import { InMemoryStaticLinkRepository } from "../src/repositories/InMemory/inMemoryStaticLinkRepository";

var SUT:GetPichauLinkListUseCase
var LinksRep:StaticLinkRepository
describe("Good Case",()=>{
    beforeEach(async()=>{
        LinksRep = new InMemoryStaticLinkRepository()
        SUT = new GetPichauLinkListUseCase(LinksRep)
    })
    it("Should be able to return the linkList of Pichau",async()=>{
        const resp = await SUT.execute();
        console.log(resp)
        expect(resp.StaticLinkList[0].Link).toBe("https://www.pichau.com.br/hardware")
    },{
        timeout:80000
    })
})