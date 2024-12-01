import { randomUUID } from "crypto";
import { Prisma, StaticLink } from "../../../prisma/indev-output";
import { StaticLinkRepository } from "../StaticLink.repository";


export class InMemoryStaticLinkRepository implements StaticLinkRepository{
    public itens:StaticLink[] = []

    async create(data: Prisma.StaticLinkCreateInput): Promise<StaticLink> {
        const Link:StaticLink = {
            GeneratedAt:new Date(),
            Id:this.itens.length+1,
            Link:String(data.Link)
        }
        this.itens.push(Link)
        return Link
    }
    async delete(id: number): Promise<StaticLink | null> {
        const Lid = this.itens.findIndex(item=> item.Id == id);
        const link = this.itens[Lid]
        this.itens.slice(Lid)
        return link
    }
}