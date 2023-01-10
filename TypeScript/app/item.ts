
export class Item {
    name: string;
    sellIn: number;
    quality: number;
  
    constructor(name, sellIn, quality) {
      this.name = name;
      this.sellIn = sellIn;
      this.quality = quality;
    }
  
    increaseQuality(step = 1) {
      const newQuality = this.quality + step;
      if (newQuality > 50) {
        return;
      }
  
      this.quality = newQuality;
    }
  
    decreaseQuality(step = 1) {
      const newQuality = this.quality - step;
      if (newQuality < 0) {
        return;
      }
  
      this.quality = newQuality;
    }
  
    setQualityAsZero() {
      this.quality = 0;
    }
  
  
    decreaseSellIn(step = 1) {
      this.sellIn -= step;
    }
  }
