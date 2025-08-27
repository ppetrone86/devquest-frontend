import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UtilsService } from '@services/utils.service';
import { ProductState } from './product.state';

export const featureSelectorProductsState = createFeatureSelector<ProductState>('productState');

export const selectorProductState = createSelector(featureSelectorProductsState, (state: ProductState) => state);
export const selectorProductState_products = createSelector(
  featureSelectorProductsState,
  (state: ProductState) => state.products
);

export const selectorProductState_total = createSelector(
  featureSelectorProductsState,
  (state: ProductState) => state.total
);

export const selectorProductState_categories = createSelector(featureSelectorProductsState, (state: ProductState) => {
  const categoryCounts: Record<string, number> = {};

  state.products.forEach((product) => {
    if (categoryCounts[product.category]) {
      categoryCounts[product.category]++;
    } else {
      categoryCounts[product.category] = 1;
    }
  });

  const categories = Object.entries(categoryCounts).map(([name, count]) => ({
    name,
    count,
  }));

  return {
    labels: categories.map((category) => category.name),
    datasets: [
      {
        data: categories.map((category) => category.count),
        backgroundColor: UtilsService.getCategoryColors ? UtilsService.getCategoryColors(categories.length) : [],
      },
    ],
  };
});
