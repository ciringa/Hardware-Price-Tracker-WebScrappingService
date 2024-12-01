import { randomUUID } from "crypto";
import { Price, Prisma } from "../../../prisma/deploy-output";
import { PriceReferenceRepository } from "../PriceReference.repository";

export class InMemoryPriceReferenceRepository implements PriceReferenceRepository{
    public list:Price[] = []
    async create(data: Prisma.PriceUncheckedCreateInput): Promise<Price> {
        const price:Price = {
            AtDate:new Date(data.AtDate),
            Id:randomUUID(),
            Price:Number(data.Price),
            ProdId:String(data.ProdId)
        }

        this.list.push(price)
        return price
    }
    async update(uuid:string,data: Prisma.PriceCreateInput): Promise<Price> {
        const Pid = this.list.findIndex(item=> item.Id == uuid);
        const price = this.list[Pid]
        const newPrice:Price = {
            AtDate:data.AtDate?new Date(data.AtDate):price.AtDate,
            Id:price.Id,
            Price:data.Price?Number(data.Price):price.Price,
            ProdId:price.ProdId
        }
        this.list[Pid] = newPrice
        return newPrice
    }
   async delete(uuid: string): Promise<Price | null> {
        const Pid = this.list.findIndex(item=> item.Id == uuid);
        const prod = this.list[Pid]
        this.list.slice(Pid)
        return prod
    }
    async findById(uuid: string): Promise<Price | null> {
        const product = this.list.find(item=>item.Id == uuid);
        return product?product:null
    }

    async findByProduct(prodId: string): Promise<Price[] | null> {
        const price = this.list.filter(item=>item.ProdId == prodId);
        return price
    }
}