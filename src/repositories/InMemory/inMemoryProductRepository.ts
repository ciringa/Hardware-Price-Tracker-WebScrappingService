import { randomUUID } from "crypto";
import { kind, Prisma, Product } from "../../../prisma/deploy-output";
import { ProductRepository } from "../Product.repository,";
import { pid } from "process";

export class InMemoryProductRepository implements ProductRepository{
    public list:Product[] = []
    async create(data: Prisma.ProductCreateInput): Promise<Product> {
        const product:Product = {
            Description:String(data.Description),
            Id:randomUUID(),
            ImageUrl:String(data.ImageUrl),
            Kind:data.Kind as kind,
            Link:String(data.Link),
            Slug:String(data.Title+"-"+data.Description+"-"+data.Kind),
            Title:String(data.Title),
            Value:Number(data.Value),
            Where:String(data.Where)
        }

        this.list.push(product)
        return product
    }
    async update(uuid:string,data: Prisma.ProductUpdateInput): Promise<Product> {
        const Pid = this.list.findIndex(item=> item.Id == uuid);
        const prod = this.list[Pid]
        const newProd:Product = {
            Description:data.Description?String(data.Description):prod.Description,
            Id:prod.Id,
            ImageUrl:data.ImageUrl?String(data.ImageUrl):prod.ImageUrl,
            Kind:data.Kind?data.Kind as kind:prod.Kind,
            Link:data.Link?String(data.Link):prod.Link,
            Slug:data.Slug?String(data.Slug):prod.Link,
            Title:data.Title?String(data.Title):prod.Title,
            Value:data.Value?Number(data.Value):prod.Value,
            Where:data.Where?String(data.Where):prod.Where
        }
        this.list[Pid] = newProd
        return newProd
    }
   async delete(uuid: string): Promise<Product | null> {
        const Pid = this.list.findIndex(item=> item.Id == uuid);
        const prod = this.list[Pid]
        this.list.slice(Pid)
        return prod
    }
    async findById(uuid: string): Promise<Product | null> {
        const product = this.list.find(item=>item.Id == uuid);
        return product?product:null
    }
    async findByLink(link: string): Promise<Product | null> {
        const product = this.list.find(item=>item.Id == link);
        return product?product:null
    }
    
    async findBySlug(slug: string): Promise<Product | null> {
        const product = this.list.find(item=>item.Id == slug);
        return product?product:null
    }
    

}