import { GildedRose } from '@/gilded-rose';
import { Item } from '@/item';

describe('Gilded Rose', () => {
  it('should have the initial properties set in', () => {
    const gildedRose = new GildedRose([new Item('name', 10, 5)]);
    const item = gildedRose.items[0];
    const { name, sellIn, quality } = item;

    expect(name).toBe('name');
    expect(sellIn).toBe(10);
    expect(quality).toBe(5);
  });

  const businessLogicTest = [
    [
      'Once the sell by date has passed, Quality decreases 1',
      new Item('dummy', 1, 5),
      { sellIn: 0, quality: 4 }
    ],
    [
      'Once the sell by date has passed, Quality degrades twice as fast',
      new Item('dummy', 0, 5),
      { sellIn: -1, quality: 3 }
    ],
    [
      'The Quality of an item is never negative',
      new Item('dummy', 0, 0),
      { sellIn: -1, quality: 0 }
    ],
    [
      '"Aged Brie" actually increases in Quality the older it gets',
      new Item('Aged Brie', 1, 0),
      { sellIn: 0, quality: 1 }
    ],
    [
      '[Not specified] "Aged Brie" actually increases in Quality x2 the older it gets if passes the sell date',
      new Item('Aged Brie', 0, 0),
      { sellIn: -1, quality: 2 }
    ],
    [
      'The Quality of an item is never more than 50',
      new Item('Aged Brie', 1, 50),
      { sellIn: 0, quality: 50 }
    ],
    [
      '"Sulfuras", being a legendary item, never has to be sold or decreases in Quality',
      new Item('Sulfuras, Hand of Ragnaros', 10, 1),
      { sellIn: 10, quality: 1 }
    ],
    [
      '"Backstage passes", like aged brie, increases in Quality as its SellIn value approaches',
      new Item('Backstage passes to a TAFKAL80ETC concert', 15, 1),
      { sellIn: 14, quality: 2 }
    ],
    [
      '"Backstage passes", Quality increases by 2 when there are 10 days or less',
      new Item('Backstage passes to a TAFKAL80ETC concert', 10, 1),
      { sellIn: 9, quality: 3 }
    ],
    [
      '"Backstage passes", Quality increases by 3 by 3 when there are 5 days or less but',
      new Item('Backstage passes to a TAFKAL80ETC concert', 5, 1),
      { sellIn: 4, quality: 4 }
    ],
    [
      '"Backstage passes", Quality increases by 3 by 3 when there are 5 days or less but',
      new Item('Backstage passes to a TAFKAL80ETC concert', 0, 10),
      { sellIn: -1, quality: 0 }
    ],
    [
      'Conjured',
      new Item('Conjured Mana Cake', 3, 6),
      { sellIn: 2, quality: 4 }
    ],
    [
      'Conjured sell date passed',
      new Item('Conjured Mana Cake', 0, 6),
      { sellIn: -1, quality: 2 }
    ]
  ]
  it.each(businessLogicTest)('%s', (_description, dbItem, result) => {
    const gildedRose = new GildedRose([dbItem as Item]);
    gildedRose.updateQuality();
    const item = gildedRose.items[0];

    for (let k in result as { sellIn: number, quality: number }) {
      expect(item[k]).toBe(result[k]);
    }
  })
});
