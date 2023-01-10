import { Item } from "./item";
import { ItemType } from "./item-type";

const agedBrieUpdateQuantityStrategy = (item: Item) => {
    item.decreaseSellIn();
    item.increaseQuality(item.sellIn < 0 ? 2 : 1);
}

const conjuredUpdateQuantityStrategy = (item: Item) => {
    item.decreaseSellIn();
    item.decreaseQuality(item.sellIn < 0 ? 4 : 2);
}

const backstageUpdateQuantityStrategy = (item: Item) => {
    item.decreaseSellIn();
    if (item.sellIn < 0) {
        item.setQualityAsZero();
        return;
    }

    if (item.sellIn > 10) {
        item.increaseQuality();
        return;
    }

    item.increaseQuality(item.sellIn > 5 ? 2 : 3);
}

export const qualityUpdaters = {
    [ItemType.AGED_BRIE]: agedBrieUpdateQuantityStrategy,
    [ItemType.BACKSTAGE_PASS]: backstageUpdateQuantityStrategy,
    [ItemType.CONJURED]: conjuredUpdateQuantityStrategy,
    [ItemType.SULFURAS]: () => {},
}

export const defaultUpdateQualityStrategy = (item: Item) => {
    item.decreaseSellIn();
    item.decreaseQuality(item.sellIn < 0 ? 2 : 1);
}
