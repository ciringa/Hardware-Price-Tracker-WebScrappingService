import { Price, Prisma } from "../../prisma/deploy-output"

export interface PriceReferenceRepository{
    create(data:Prisma.PriceUncheckedCreateInput):Promise<Price>
    findById(uuid:string):Promise<Price | null>
    findByProduct(prodId:string):Promise<Price[]|null>
    update(uuid:string,data:Prisma.PriceUpdateInput):Promise<Price>
    delete(uuid:string):Promise<Price | null>
}