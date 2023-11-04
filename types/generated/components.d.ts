import type { Schema, Attribute } from '@strapi/strapi';

export interface AddressAddress extends Schema.Component {
  collectionName: 'components_address_addresses';
  info: {
    displayName: 'Address';
    description: '';
  };
  attributes: {
    street: Attribute.String;
    postal_code: Attribute.String;
    city: Attribute.String;
    country: Attribute.String;
    latitude: Attribute.Float;
    longitude: Attribute.Float;
    details: Attribute.String;
    type: Attribute.Enumeration<['home', 'work']>;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'address.address': AddressAddress;
    }
  }
}
