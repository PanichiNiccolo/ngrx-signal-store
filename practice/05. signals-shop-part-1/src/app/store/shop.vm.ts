import {ProductItemVm} from '../components/items-list/view-model/product-item.vm';
import {CartItemVm} from '../components/cart/view-model/cart-item.vm';

export interface ProductListVm {
  readonly productItems: ProductItemVm[];
}

export interface CartVm {
  readonly items: CartItemVm[];
  readonly subtotal: number;
  readonly tax: number;
  readonly total: number;
  readonly isActive: boolean;
  readonly isVisible: boolean;
}
