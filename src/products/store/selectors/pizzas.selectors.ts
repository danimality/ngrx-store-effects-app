import { createSelector } from "@ngrx/store";
import { Pizza } from "../../models/pizza.model";
import * as fromFeature from "../reducers";
import * as fromPizzas from "../reducers/pizzas.reducer";
import * as fromRoot from "../../../app/store";

// pizzas state selectors

/**
 state = {
        products: {
          pizzas: {
            entities: []: {},
            loaded: false,
            loading: false,
          }
        }
      }
 */

export const getPizzaState = createSelector(
  fromFeature.getProductsState,
  (state: fromFeature.ProductsState) => state.pizzas
);

export const getPizzasEntities = createSelector(
  getPizzaState,
  fromPizzas.getPizzasEntities
);

export const getSelectedPizza = createSelector(
  getPizzasEntities,
  fromRoot.getRouterState,
  (entities, router): Pizza => {
    return router.state && entities[router.state.params.pizzaId];
  }
);

export const getAllPizzas = createSelector(getPizzasEntities, entities =>
  Object.keys(entities).map(id => entities[parseInt(id, 10)])
);
export const getPizzasLoaded = createSelector(
  getPizzaState,
  fromPizzas.getPizzasLoaded
);
export const getPizzasLoading = createSelector(
  getPizzaState,
  fromPizzas.getPizzasLoading
);
