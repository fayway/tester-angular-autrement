import { ApiModelProperty } from '@nestjs/swagger';

export class Rental {
  @ApiModelProperty()
  id: number;
  @ApiModelProperty()
  title: string;
  @ApiModelProperty()
  description: string;
  @ApiModelProperty()
  city: string;
  @ApiModelProperty()
  type: Type;
  @ApiModelProperty()
  guestsNbr: number;
  @ApiModelProperty()
  roomsNbr: number;
  @ApiModelProperty()
  price: number;
  @ApiModelProperty()
  image: string;
}

export enum Type {
  ENTIRE_HOME = 'Logement entier',
  PRIVATE_ROOM = 'Chambre privée',
  SHARED_ROOM = 'Chambre partagée',
}

export class RentalsQuery {
  @ApiModelProperty({required: false})
  city?: string;
}
