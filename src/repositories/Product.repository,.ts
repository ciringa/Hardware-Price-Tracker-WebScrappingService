import { Prisma, Product } from "../../prisma/deploy-output";

export interface ProductRepository{
    create(data:Prisma.ProductCreateInput):Promise<Product>
    findById(uuid:string):Promise<Product | null>
    findBySlug(Slug:string):Promise<Product | null>
    findByLink(link:string):Promise<Product | null>
    update(uuid:string,data:Prisma.ProductUpdateInput):Promise<Product>
    delete(uuid:string):Promise<Product | null>
}