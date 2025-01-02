import { signalStore, withComputed, withProps, withState } from "@ngrx/signals";
import { initialCartSlice } from "./cart.slice";
import { ShopStore } from "../../../store/shop.store";
import { computed, inject } from "@angular/core";
import { buildCartVm } from "./cart.vm-builder";

export const CartStore = signalStore(
    withState(initialCartSlice), 
    withProps(_ => ({
        _shopStore: inject(ShopStore)
    })), 
    withComputed(store => ({
        vm: computed(() => buildCartVm(
            store._shopStore.products(), 
            store._shopStore.cartQuantities(), 
            store.taxRate(), 
            store._shopStore.cartVisible()
        ))
    }))
)