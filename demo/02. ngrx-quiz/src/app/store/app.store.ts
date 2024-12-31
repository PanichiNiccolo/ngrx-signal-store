import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from "@ngrx/signals";
import { initialAppSlice } from "./app.slice";
import { computed, inject } from "@angular/core";
import { DICTIONARIES_TOKEN } from "../tokens/dictionaries.token";
import { changeLanguage } from "./app.updaters";
import { getDictionary } from "./app.helpers";

export const AppStore = signalStore(
    { providedIn: 'root' }, 
    withState(initialAppSlice), 
    withComputed((store, dictionaries = inject(DICTIONARIES_TOKEN)) => ({
        selectedDictionary: computed(() => 
            getDictionary(store.selectedLanguage(), dictionaries))
    })),
    withMethods(store => {
        const dictionaries = inject(DICTIONARIES_TOKEN);
        const languages = Object.keys(dictionaries);
        return {
            changeLanguage: () => patchState(store, changeLanguage(languages))
        }
    }),
    withHooks(store => ({
        onInit: () => {
            const dictionaries = inject(DICTIONARIES_TOKEN);
            const languages = Object.keys(dictionaries);
            patchState(store, {
                possibleLanguages: languages,
                selectedLanguage: languages[0]
            })
        }
    }))
)