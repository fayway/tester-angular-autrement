export interface BookingRequest {
  idRental: number;
  startDate: Date;
  endDate: Date;
}

export enum DiscountType {
  PREMIUM_USER = 'premium user',
  DURATION = 'duration',
  SLICE = 'slice',
}

export class Discount {
  type: DiscountType;
  isApplicable: boolean;
  discount: number;
}

export class PriceSimulator {
  constructor(
    public price: number,
    public days: number,
    public discounts: Discount[],
  ) {}

  getDiscountByType(type: DiscountType) {
    let discount = this.discounts.find(elem => elem.type === type);
    if (!discount) {
      discount = {
        type,
        isApplicable: false,
        discount: 0,
      };
    }
    return {
      ...discount,
      class: discount.isApplicable ? 'green' : 'warn',
      icon: discount.isApplicable ? 'money_off' : 'highlight_off',
    };
  }

  getTotalPrice() {
    return this.price * this.days;
  }

  getTotalDiscount() {
    return this.discounts
      .filter(discount => discount.isApplicable)
      .reduce((acc, discount) => acc + discount.discount, 0);
  }

  getFinalPrice() {
    return this.getTotalPrice() - this.getTotalDiscount();
  }
}
