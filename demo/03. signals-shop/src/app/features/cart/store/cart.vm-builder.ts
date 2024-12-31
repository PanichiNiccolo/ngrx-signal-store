import { CartQuantities } from "../../../models/cart-quantities.model";
import { Product } from "../../../models/product.model";
import { CartItemVm } from "../view-model/cart-item.vm";
import { CartVm } from "../view-model/cart.vm";

export function buildCartVm(
    products: Product[], 
    quantities: CartQuantities,
    taxRate: number,
): CartVm {
    const items = buildCartItems();
    const subtotal = items.reduce((sum, item) => sum + item.total, 0);
    const tax = subtotal * taxRate;
    const total = subtotal + tax;
    const itemsCount = items.length;
    const canCheckout = itemsCount > 0;

    return {
        items, 
        subtotal, 
        tax, 
        total, 
        itemsCount,
        canCheckout
    }
    function buildCartItems(): CartItemVm[] {
        return products
            .filter(product => quantities[product.id])
            .map(product => {
                const quantity = quantities[product.id];
                return {
                    id: product.id, 
                    name: product.name, 
                    price: product.unitPrice, 
                    quantity, 
                    total: product.unitPrice * quantity
                }
            })
    }
}