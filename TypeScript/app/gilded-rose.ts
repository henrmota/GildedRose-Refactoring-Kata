import { Item } from "./item";
import { ItemType, getItemType } from "./item-type";
import { defaultUpdateQualityStrategy, qualityUpdaters } from "./quality-strategy";

interface UpdateQuantityStrategy { [x: string | ItemType]: (item: Item) => void }

export class GildedRose {
  items: Array<Item>;
  
  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateItemQuality(item: Item, strategies: UpdateQuantityStrategy) {
    const itemType = getItemType(item);

    if(Object.values(ItemType).includes(itemType)) {
      const updateQualityStrategy = strategies[item.name];

      return updateQualityStrategy(item);
    }

    defaultUpdateQualityStrategy(item);

    return item;
  }

  updateQuality() {
    this.items.forEach(item => this.updateItemQuality(item, qualityUpdaters));

    return this.items;
  }
}
