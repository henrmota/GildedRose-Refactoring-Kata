import { Item } from "./item";

export enum ItemType {
    AGED_BRIE = 'Aged Brie',
    BACKSTAGE_PASS = 'Backstage passes to a TAFKAL80ETC concert',
    SULFURAS = 'Sulfuras, Hand of Ragnaros',
    CONJURED = 'Conjured Mana Cake'
}

export const getItemType = (item: Item) => item.name as ItemType;


