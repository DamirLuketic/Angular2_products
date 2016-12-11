export class NewProduct {
    constructor(public userId: number, public categoryId: number, public name: string, public description: string,
    public quantity: number, public value: string, public onSale: number, public imageUrl: any
    ){}
}