import { ChartModel } from '@models/chart.model';
import { OrderModel } from '@models/order.model';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UtilsService } from '@services/utils.service';
import { OrderState } from './order.state';

function aggregateOrdersByKey(
  orders: OrderModel[],
  getKey: (order: OrderModel) => string,
  aggregators: Record<string, (order: OrderModel) => number>,
  colors: string[] = ['--p-blue-500', '--p-green-500', '--p-yellow-500', '--p-red-500', '--p-purple-500'],
  chartTypes: ('bar' | 'line')[] = ['line']
): ChartModel {
  const aggregation: Record<string, Record<string, number>> = {};
  const documentStyle = getComputedStyle(document.documentElement);

  orders.forEach((order) => {
    const key = getKey(order);
    if (!aggregation[key]) {
      aggregation[key] = {};
      Object.keys(aggregators).forEach((aggKey) => (aggregation[key][aggKey] = 0));
    }

    Object.keys(aggregators).forEach((aggKey) => {
      aggregation[key][aggKey] += aggregators[aggKey](order);
    });
  });

  const sortedEntries = Object.entries(aggregation).sort(
    ([dateA], [dateB]) =>
      new Date(dateA.split('/').reverse().join('-')).getTime() -
      new Date(dateB.split('/').reverse().join('-')).getTime()
  );

  const labels = sortedEntries.map(([key]) => key);
  const datasets = Object.keys(aggregators).map((key, index) => {
    return {
      type: chartTypes[index],
      label: key.replace(/([A-Z])/g, ' $1').trim(),
      borderColor: documentStyle.getPropertyValue(colors[index]),
      backgroundColor: UtilsService.hexToRgba(documentStyle.getPropertyValue(colors[index]), 0.5),
      data: sortedEntries.map(([, values]) => values[key] || 0),
      fill: true,
    };
  });

  return { labels, datasets };
}

// Feature Selector
export const featureSelectorOrdersState = createFeatureSelector<OrderState>('orderState');

// General State Selector
export const selectorOrderState_orders = createSelector(
  featureSelectorOrdersState,
  (state: OrderState) => state.orders
);

export const selectorOrderState_total = createSelector(featureSelectorOrdersState, (state: OrderState) => state.total);

export const selectorOrderState_months = createSelector(featureSelectorOrdersState, (state: OrderState): ChartModel => {
  return aggregateOrdersByKey(
    state.orders,
    (order) => {
      const orderDate = order.date ? new Date(order.date) : UtilsService.generateRandomDate();
      return orderDate.toLocaleString('default', { month: 'long', year: 'numeric' });
    },
    { totalOrders: () => 1 }
  );
});

export const selectorOrderState_dates = createSelector(featureSelectorOrdersState, (state: OrderState): ChartModel => {
  return aggregateOrdersByKey(
    state.orders,
    (order) =>
      order.date ? new Date(order.date).toLocaleDateString() : UtilsService.generateRandomDate().toLocaleDateString(),
    { totalOrders: () => 1 }
  );
});

export const selectorOrderState_prices = createSelector(featureSelectorOrdersState, (state: OrderState): ChartModel => {
  return aggregateOrdersByKey(
    state.orders,
    (order) =>
      order.date ? new Date(order.date).toLocaleDateString() : UtilsService.generateRandomDate().toLocaleDateString(),
    { totalPrices: (order) => order.products.reduce((sum, product) => sum + product.price, 0) }
  );
});

export const selectorOrderState_products = createSelector(
  featureSelectorOrdersState,
  (state: OrderState): ChartModel => {
    return aggregateOrdersByKey(
      state.orders,
      (order) =>
        order.date ? new Date(order.date).toLocaleDateString() : UtilsService.generateRandomDate().toLocaleDateString(),
      { totalProducts: (order) => order.products.reduce((sum, product) => sum + product.quantity, 0) }
    );
  }
);

export const selectorOrderState_pricesAndProducts = createSelector(
  featureSelectorOrdersState,
  (state: OrderState): ChartModel => {
    return aggregateOrdersByKey(
      state.orders,
      (order) =>
        order.date ? new Date(order.date).toLocaleDateString() : UtilsService.generateRandomDate().toLocaleDateString(),
      {
        totalPrice: (order) => order.products.reduce((sum, product) => sum + product.price, 0),
        totalProducts: (order) => order.products.reduce((sum, product) => sum + product.quantity, 0),
      },
      ['--p-blue-500', '--p-red-500'],
      ['bar', 'line']
    );
  }
);
