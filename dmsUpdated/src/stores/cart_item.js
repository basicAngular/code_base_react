import { observable, action,computed,toJS } from "mobx";
 class CartItemStore {

    @observable cartItemsRegistry = observable.map();

    clear() {
        this.cartItemsRegistry.clear();
        this.saveOnLocalStorage(); 
    }

    get(id) {
        return this.cartItemsRegistry.get(id);
    }

    saveOnLocalStorage(){
        window.localStorage.setItem('cartItems',JSON.stringify(toJS(this.cartItemsRegistry)))
    }

    @action loadAll() {
        if(window.localStorage.getItem('cartItems') === null)
            window.localStorage.setItem('cartItems',JSON.stringify([]))
        let items = JSON.parse(window.localStorage.getItem('cartItems'));
        Object.keys(items).map(id=>this.cartItemsRegistry.set(items[id].id, items[id]))
    }

    @action create(shopItem) {
        shopItem.quantity = 1;
        shopItem.updatedPrice = shopItem.price;
        this.cartItemsRegistry.set(Number(shopItem.id), shopItem);
        this.saveOnLocalStorage();
        return Promise.resolve(shopItem);
    }

    @action delete(id) {
        this.cartItemsRegistry.delete(id);  
        this.saveOnLocalStorage();
    }

    @action updateQuantity(cartitem,quantity) {  
            cartitem.quantity = quantity;
            let item = this.get(cartitem.id);
            cartitem.updatedPrice = quantity * item.price;
            this.cartItemsRegistry.set(cartitem.id,cartitem)
            this.saveOnLocalStorage();     
    }

    @action checkout() {
        return Promise.resolve();
    }

    @computed get total() {
        let price = 0;
        this.cartItemsRegistry.values().map((item)=> price += item.price * item.quantity);
        return price;
    }
}

export default new CartItemStore();