import faker from "faker";
faker.locale = "de";


export default class ShopItem {
    constructor() {
        this.id = "";
        this.number = "";
        this.title = "";
        this.description = "";
        this.price = null;
        this.available = true;
        this.enabled = true;
        this.meta = {};
        this.image_url = "";
    }


    static fromApi(values) {
        let shop_item = new ShopItem();
        shop_item.id = values.id.toString();
        shop_item.number = values.number;        
        shop_item.title = values.title;        
        shop_item.description = values.description;
        shop_item.price = values.price;
        shop_item.available = values.available;
        shop_item.enabled = values.enabled;
        shop_item.meta = {
            "deleted_at": values.deleted_at,
            "created_at": values.created_at,
            "updated_at": values.updated_at
        };
        shop_item.image_url = values.image_url;
        return shop_item;
    }


    static fromForm(values) {
        let result = {};
        result.id = values.id;
        result.number = values.number;
        result.title = values.title;        
        result.description = values.description;
        result.price = values.price * 100.0;
        result.available = values.available;
        result.enabled = values.enabled;
        return result;
    }

    toForm() {
        return {
            "id": this.id,
            "number": this.number,
            "title": this.title,        
            "description": this.description,        
            "price": this.price / 100.0,
            "available": this.available,
            "enabled": this.enabled,
        };
    }

    static empty() {
        return new ShopItem();
    }

    static random() {
        let shop_item = new ShopItem();        
        shop_item.title = faker.lorem.words();        
        shop_item.number = "A"+faker.random.number({min: 1000, max: 1020});     
        shop_item.description = faker.lorem.paragraph();
        shop_item.price = faker.random.number({min: 400, max: 4000});
        shop_item.available = faker.random.boolean();
        shop_item.enabled = faker.random.boolean();
        shop_item.image_url = faker.image.technics();
        return shop_item;
    }
}
