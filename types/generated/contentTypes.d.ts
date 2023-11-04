import type { Schema, Attribute } from '@strapi/strapi';

export interface AdminPermission extends Schema.CollectionType {
  collectionName: 'admin_permissions';
  info: {
    name: 'Permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    actionParameters: Attribute.JSON & Attribute.DefaultTo<{}>;
    subject: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    properties: Attribute.JSON & Attribute.DefaultTo<{}>;
    conditions: Attribute.JSON & Attribute.DefaultTo<[]>;
    role: Attribute.Relation<'admin::permission', 'manyToOne', 'admin::role'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminUser extends Schema.CollectionType {
  collectionName: 'admin_users';
  info: {
    name: 'User';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    firstname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    username: Attribute.String;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.Private &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    registrationToken: Attribute.String & Attribute.Private;
    isActive: Attribute.Boolean &
      Attribute.Private &
      Attribute.DefaultTo<false>;
    roles: Attribute.Relation<'admin::user', 'manyToMany', 'admin::role'> &
      Attribute.Private;
    blocked: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>;
    preferedLanguage: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminRole extends Schema.CollectionType {
  collectionName: 'admin_roles';
  info: {
    name: 'Role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    code: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String;
    users: Attribute.Relation<'admin::role', 'manyToMany', 'admin::user'>;
    permissions: Attribute.Relation<
      'admin::role',
      'oneToMany',
      'admin::permission'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminApiToken extends Schema.CollectionType {
  collectionName: 'strapi_api_tokens';
  info: {
    name: 'Api Token';
    singularName: 'api-token';
    pluralName: 'api-tokens';
    displayName: 'Api Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    type: Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Attribute.Required &
      Attribute.DefaultTo<'read-only'>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::api-token',
      'oneToMany',
      'admin::api-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminApiTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_api_token_permissions';
  info: {
    name: 'API Token Permission';
    description: '';
    singularName: 'api-token-permission';
    pluralName: 'api-token-permissions';
    displayName: 'API Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::api-token-permission',
      'manyToOne',
      'admin::api-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferToken extends Schema.CollectionType {
  collectionName: 'strapi_transfer_tokens';
  info: {
    name: 'Transfer Token';
    singularName: 'transfer-token';
    pluralName: 'transfer-tokens';
    displayName: 'Transfer Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::transfer-token',
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_transfer_token_permissions';
  info: {
    name: 'Transfer Token Permission';
    description: '';
    singularName: 'transfer-token-permission';
    pluralName: 'transfer-token-permissions';
    displayName: 'Transfer Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::transfer-token-permission',
      'manyToOne',
      'admin::transfer-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFile extends Schema.CollectionType {
  collectionName: 'files';
  info: {
    singularName: 'file';
    pluralName: 'files';
    displayName: 'File';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    alternativeText: Attribute.String;
    caption: Attribute.String;
    width: Attribute.Integer;
    height: Attribute.Integer;
    formats: Attribute.JSON;
    hash: Attribute.String & Attribute.Required;
    ext: Attribute.String;
    mime: Attribute.String & Attribute.Required;
    size: Attribute.Decimal & Attribute.Required;
    url: Attribute.String & Attribute.Required;
    previewUrl: Attribute.String;
    provider: Attribute.String & Attribute.Required;
    provider_metadata: Attribute.JSON;
    related: Attribute.Relation<'plugin::upload.file', 'morphToMany'>;
    folder: Attribute.Relation<
      'plugin::upload.file',
      'manyToOne',
      'plugin::upload.folder'
    > &
      Attribute.Private;
    folderPath: Attribute.String &
      Attribute.Required &
      Attribute.Private &
      Attribute.SetMinMax<{
        min: 1;
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFolder extends Schema.CollectionType {
  collectionName: 'upload_folders';
  info: {
    singularName: 'folder';
    pluralName: 'folders';
    displayName: 'Folder';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 1;
      }>;
    pathId: Attribute.Integer & Attribute.Required & Attribute.Unique;
    parent: Attribute.Relation<
      'plugin::upload.folder',
      'manyToOne',
      'plugin::upload.folder'
    >;
    children: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.folder'
    >;
    files: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.file'
    >;
    path: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 1;
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginI18NLocale extends Schema.CollectionType {
  collectionName: 'i18n_locale';
  info: {
    singularName: 'locale';
    pluralName: 'locales';
    collectionName: 'locales';
    displayName: 'Locale';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.SetMinMax<{
        min: 1;
        max: 50;
      }>;
    code: Attribute.String & Attribute.Unique;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsPermission
  extends Schema.CollectionType {
  collectionName: 'up_permissions';
  info: {
    name: 'permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String & Attribute.Required;
    role: Attribute.Relation<
      'plugin::users-permissions.permission',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsRole extends Schema.CollectionType {
  collectionName: 'up_roles';
  info: {
    name: 'role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    description: Attribute.String;
    type: Attribute.String & Attribute.Unique;
    permissions: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    users: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsUser extends Schema.CollectionType {
  collectionName: 'up_users';
  info: {
    name: 'user';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  options: {
    draftAndPublish: false;
    timestamps: true;
  };
  attributes: {
    username: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: Attribute.String;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    confirmationToken: Attribute.String & Attribute.Private;
    confirmed: Attribute.Boolean & Attribute.DefaultTo<false>;
    blocked: Attribute.Boolean & Attribute.DefaultTo<false>;
    role: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiBasketBasket extends Schema.CollectionType {
  collectionName: 'baskets';
  info: {
    singularName: 'basket';
    pluralName: 'baskets';
    displayName: 'Basket';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    items: Attribute.Relation<
      'api::basket.basket',
      'oneToMany',
      'api::item.item'
    >;
    seller_shop: Attribute.Relation<
      'api::basket.basket',
      'oneToOne',
      'api::seller-shop.seller-shop'
    >;
    customer: Attribute.Relation<
      'api::basket.basket',
      'oneToOne',
      'api::customer.customer'
    >;
    generic_grocery_list: Attribute.Relation<
      'api::basket.basket',
      'oneToOne',
      'api::generic-grocery-list.generic-grocery-list'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::basket.basket',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::basket.basket',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiBrandBrand extends Schema.CollectionType {
  collectionName: 'brands';
  info: {
    singularName: 'brand';
    pluralName: 'brands';
    displayName: 'Brand';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    'import-export-entries': {
      idField: 'synchronisation_ulid';
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required & Attribute.Unique;
    image_selected: Attribute.Media & Attribute.Required;
    image_unselected: Attribute.Media & Attribute.Required;
    synchronisation_ulid: Attribute.Text &
      Attribute.CustomField<'plugin::field-ulid.ulid'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::brand.brand',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::brand.brand',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCustomerCustomer extends Schema.CollectionType {
  collectionName: 'customers';
  info: {
    singularName: 'customer';
    pluralName: 'customers';
    displayName: 'Customer';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    last_name: Attribute.String & Attribute.Required;
    email: Attribute.Email & Attribute.Required & Attribute.Unique;
    phone_number: Attribute.String & Attribute.Required & Attribute.Unique;
    addresses: Attribute.Component<'address.address', true>;
    firebase_auth_id: Attribute.String & Attribute.Unique;
    first_name: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::customer.customer',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::customer.customer',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiFeedbackFeedback extends Schema.CollectionType {
  collectionName: 'feedbacks';
  info: {
    singularName: 'feedback';
    pluralName: 'feedbacks';
    displayName: 'Feedback';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    rating: Attribute.Integer;
    feedback: Attribute.Text;
    customer: Attribute.Relation<
      'api::feedback.feedback',
      'oneToOne',
      'api::customer.customer'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::feedback.feedback',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::feedback.feedback',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiGenericCategoryGenericCategory
  extends Schema.CollectionType {
  collectionName: 'generic_categories';
  info: {
    singularName: 'generic-category';
    pluralName: 'generic-categories';
    displayName: 'Generic Category';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    'import-export-entries': {
      idField: 'synchronisation_ulid';
    };
  };
  attributes: {
    category: Attribute.String & Attribute.Required & Attribute.Unique;
    image: Attribute.Media & Attribute.Required;
    subcategories: Attribute.Relation<
      'api::generic-category.generic-category',
      'oneToMany',
      'api::generic-subcategory.generic-subcategory'
    >;
    icon: Attribute.Media;
    order: Attribute.Integer & Attribute.Required;
    synchronisation_ulid: Attribute.Text &
      Attribute.CustomField<'plugin::field-ulid.ulid'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::generic-category.generic-category',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::generic-category.generic-category',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiGenericFavouriteGenericFavourite
  extends Schema.CollectionType {
  collectionName: 'generic_favourites';
  info: {
    singularName: 'generic-favourite';
    pluralName: 'generic-favourites';
    displayName: 'Generic Favourite';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    generic_products: Attribute.Relation<
      'api::generic-favourite.generic-favourite',
      'oneToMany',
      'api::generic-product.generic-product'
    >;
    customer: Attribute.Relation<
      'api::generic-favourite.generic-favourite',
      'oneToOne',
      'api::customer.customer'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::generic-favourite.generic-favourite',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::generic-favourite.generic-favourite',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiGenericGroceryListGenericGroceryList
  extends Schema.CollectionType {
  collectionName: 'generic_grocery_lists';
  info: {
    singularName: 'generic-grocery-list';
    pluralName: 'generic-grocery-lists';
    displayName: 'Generic Grocery List';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    name: Attribute.String;
    customer: Attribute.Relation<
      'api::generic-grocery-list.generic-grocery-list',
      'oneToOne',
      'api::customer.customer'
    >;
    generic_product_selections: Attribute.Relation<
      'api::generic-grocery-list.generic-grocery-list',
      'oneToMany',
      'api::generic-product-selection.generic-product-selection'
    >;
    address: Attribute.Component<'address.address'> & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::generic-grocery-list.generic-grocery-list',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::generic-grocery-list.generic-grocery-list',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiGenericPopularSearchGenericPopularSearch
  extends Schema.CollectionType {
  collectionName: 'generic_popular_searches';
  info: {
    singularName: 'generic-popular-search';
    pluralName: 'generic-popular-searches';
    displayName: 'Generic Popular Search';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    'import-export-entries': {
      idField: 'synchronisation_ulid';
    };
  };
  attributes: {
    keyword: Attribute.String & Attribute.Required & Attribute.Unique;
    synchronisation_ulid: Attribute.Text &
      Attribute.CustomField<'plugin::field-ulid.ulid'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::generic-popular-search.generic-popular-search',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::generic-popular-search.generic-popular-search',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiGenericProductGenericProduct extends Schema.CollectionType {
  collectionName: 'generic_products';
  info: {
    singularName: 'generic-product';
    pluralName: 'generic-products';
    displayName: 'Generic Product';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    'import-export-entries': {
      idField: 'synchronisation_ulid';
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required & Attribute.Unique;
    image: Attribute.Media & Attribute.Required;
    weight_list: Attribute.JSON &
      Attribute.CustomField<
        'plugin::multi-select.multi-select',
        [
          '50',
          '100',
          '125',
          '150',
          '180',
          '200',
          '250',
          '300',
          '340',
          '350',
          '400',
          '500',
          '700',
          '750',
          '825',
          '1000',
          '10000'
        ]
      >;
    seasons: Attribute.JSON &
      Attribute.CustomField<
        'plugin::multi-select.multi-select',
        [
          'january',
          'february',
          'march',
          'april',
          'may',
          'june',
          'july',
          'august',
          'september',
          'october',
          'november',
          'december'
        ]
      >;
    footprint: Attribute.Float;
    storage_method: Attribute.JSON &
      Attribute.CustomField<
        'plugin::multi-select.multi-select',
        ['ambient', 'fridge', 'freezer']
      >;
    subcategory: Attribute.Relation<
      'api::generic-product.generic-product',
      'manyToOne',
      'api::generic-subcategory.generic-subcategory'
    >;
    is_visible: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<false>;
    tags_list: Attribute.JSON &
      Attribute.Required &
      Attribute.CustomField<
        'plugin::multi-select.multi-select',
        ['organic', 'french']
      >;
    brands: Attribute.Relation<
      'api::generic-product.generic-product',
      'oneToMany',
      'api::brand.brand'
    >;
    weight_unit_default: Attribute.Enumeration<['g', 'ml']> &
      Attribute.Required;
    weight_per_unit: Attribute.Integer;
    matching_tags: Attribute.JSON;
    min_expiration_date: Attribute.Integer &
      Attribute.SetMinMax<{
        min: 0;
      }>;
    max_expiration_date: Attribute.Integer;
    unit_name: Attribute.String & Attribute.DefaultTo<'La pi\u00E8ce'>;
    is_unit: Attribute.Boolean & Attribute.DefaultTo<false>;
    pef_score: Attribute.Decimal;
    synchronisation_ulid: Attribute.Text &
      Attribute.CustomField<'plugin::field-ulid.ulid'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::generic-product.generic-product',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::generic-product.generic-product',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiGenericProductSelectionGenericProductSelection
  extends Schema.CollectionType {
  collectionName: 'generic_product_selections';
  info: {
    singularName: 'generic-product-selection';
    pluralName: 'generic-product-selections';
    displayName: 'Generic Product Selection';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    quantity: Attribute.Integer & Attribute.Required;
    generic_grocery_list: Attribute.Relation<
      'api::generic-product-selection.generic-product-selection',
      'oneToOne',
      'api::generic-grocery-list.generic-grocery-list'
    >;
    generic_product: Attribute.Relation<
      'api::generic-product-selection.generic-product-selection',
      'oneToOne',
      'api::generic-product.generic-product'
    >;
    tags_list: Attribute.JSON &
      Attribute.CustomField<
        'plugin::multi-select.multi-select',
        ['french', 'organic', 'local', 'best_price', 'best_product']
      >;
    weight: Attribute.Decimal &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 0;
      }>;
    weight_unit: Attribute.Enumeration<['u', 'g', 'ml']> & Attribute.Required;
    brand: Attribute.Relation<
      'api::generic-product-selection.generic-product-selection',
      'oneToOne',
      'api::brand.brand'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::generic-product-selection.generic-product-selection',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::generic-product-selection.generic-product-selection',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiGenericSubcategoryGenericSubcategory
  extends Schema.CollectionType {
  collectionName: 'generic_subcategories';
  info: {
    singularName: 'generic-subcategory';
    pluralName: 'generic-subcategories';
    displayName: 'Generic Subcategory';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    'import-export-entries': {
      idField: 'synchronisation_ulid';
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required & Attribute.Unique;
    generic_products: Attribute.Relation<
      'api::generic-subcategory.generic-subcategory',
      'oneToMany',
      'api::generic-product.generic-product'
    >;
    generic_category: Attribute.Relation<
      'api::generic-subcategory.generic-subcategory',
      'manyToOne',
      'api::generic-category.generic-category'
    >;
    order: Attribute.Integer & Attribute.Required;
    is_perishable: Attribute.Boolean & Attribute.DefaultTo<true>;
    synchronisation_ulid: Attribute.Text &
      Attribute.CustomField<'plugin::field-ulid.ulid'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::generic-subcategory.generic-subcategory',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::generic-subcategory.generic-subcategory',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiItemItem extends Schema.CollectionType {
  collectionName: 'items';
  info: {
    singularName: 'item';
    pluralName: 'items';
    displayName: 'Item';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    quantity: Attribute.Integer;
    seller_product_detail: Attribute.Relation<
      'api::item.item',
      'oneToOne',
      'api::seller-product-detail.seller-product-detail'
    >;
    price: Attribute.Decimal;
    thrown: Attribute.Integer &
      Attribute.SetMinMax<{
        min: 0;
        max: 100;
      }>;
    generic_product_selection: Attribute.Relation<
      'api::item.item',
      'oneToOne',
      'api::generic-product-selection.generic-product-selection'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::item.item', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::item.item', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiMatchingAlgoConfigMatchingAlgoConfig
  extends Schema.SingleType {
  collectionName: 'matching_algo_configs';
  info: {
    singularName: 'matching-algo-config';
    pluralName: 'matching-algo-configs';
    displayName: 'Matching Algo Config';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    cutoff: Attribute.Float &
      Attribute.SetMinMax<{
        min: 0;
        max: 1;
      }>;
    valid_score_threshold: Attribute.Float &
      Attribute.SetMinMax<{
        min: 0;
        max: 1;
      }>;
    stopwords: Attribute.JSON;
    blacklisted_names: Attribute.JSON;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::matching-algo-config.matching-algo-config',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::matching-algo-config.matching-algo-config',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiMissingGenericProductMissingGenericProduct
  extends Schema.CollectionType {
  collectionName: 'missing_generic_products';
  info: {
    singularName: 'missing-generic-product';
    pluralName: 'missing-generic-products';
    displayName: 'Missing Generic Product';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    missing_generic_product: Attribute.String & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::missing-generic-product.missing-generic-product',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::missing-generic-product.missing-generic-product',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiOrderOrder extends Schema.CollectionType {
  collectionName: 'orders';
  info: {
    singularName: 'order';
    pluralName: 'orders';
    displayName: 'Order';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    total_amount: Attribute.Decimal &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 0;
      }>;
    date: Attribute.DateTime & Attribute.Required;
    payment_id: Attribute.String & Attribute.Required & Attribute.Unique;
    is_paid: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<false>;
    ref_order: Attribute.String & Attribute.Required & Attribute.Unique;
    basket: Attribute.Relation<
      'api::order.order',
      'oneToOne',
      'api::basket.basket'
    >;
    customer: Attribute.Relation<
      'api::order.order',
      'oneToOne',
      'api::customer.customer'
    >;
    address: Attribute.Component<'address.address'>;
    delivery_date: Attribute.DateTime;
    additional_informations: Attribute.String;
    raw_amount: Attribute.Decimal;
    delivery_fee: Attribute.Decimal;
    service_fee: Attribute.Decimal & Attribute.DefaultTo<0>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::order.order',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::order.order',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPartnerMappingMatchingPartnerMappingMatching
  extends Schema.CollectionType {
  collectionName: 'partner_mapping_matchings';
  info: {
    singularName: 'partner-mapping-matching';
    pluralName: 'partner-mapping-matchings';
    displayName: 'Partner Mapping Matching';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    'import-export-entries': {
      idField: 'synchronisation_ulid';
    };
  };
  attributes: {
    id_category: Attribute.Integer & Attribute.Required & Attribute.Unique;
    category: Attribute.String & Attribute.Required & Attribute.Unique;
    seller_shop: Attribute.Relation<
      'api::partner-mapping-matching.partner-mapping-matching',
      'oneToOne',
      'api::seller-shop.seller-shop'
    >;
    generic_subcategories: Attribute.Relation<
      'api::partner-mapping-matching.partner-mapping-matching',
      'oneToMany',
      'api::generic-subcategory.generic-subcategory'
    >;
    synchronisation_ulid: Attribute.Text &
      Attribute.CustomField<'plugin::field-ulid.ulid'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::partner-mapping-matching.partner-mapping-matching',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::partner-mapping-matching.partner-mapping-matching',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSellerSeller extends Schema.CollectionType {
  collectionName: 'sellers';
  info: {
    singularName: 'seller';
    pluralName: 'sellers';
    displayName: 'Seller';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    'import-export-entries': {
      idField: 'synchronisation_ulid';
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required & Attribute.Unique;
    image: Attribute.Media & Attribute.Required;
    delivery_threshold: Attribute.Integer;
    free_delivery_threshold: Attribute.Integer;
    delivery: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<false>;
    click_and_collect: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<false>;
    is_partner: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<false>;
    website_url: Attribute.String & Attribute.Required & Attribute.Unique;
    delivery_time: Attribute.Integer & Attribute.Required;
    description: Attribute.Text;
    seller_shops: Attribute.Relation<
      'api::seller.seller',
      'oneToMany',
      'api::seller-shop.seller-shop'
    >;
    seller_products: Attribute.Relation<
      'api::seller.seller',
      'oneToMany',
      'api::seller-product.seller-product'
    >;
    prefilled_basket_url: Attribute.String;
    click_and_collect_threshold: Attribute.Integer;
    min_cost_delivery: Attribute.Decimal;
    max_cost_delivery: Attribute.Decimal;
    click_and_collect_time: Attribute.Integer;
    delivery_area: Attribute.JSON &
      Attribute.CustomField<
        'plugin::multi-select.multi-select',
        [
          'Paris:75',
          'Hauts-de-Seine:92',
          'Val-de-Marne:94',
          'Seine-Saint-Denis:93',
          'Paris 8:75008',
          'Paris 16:75016',
          'Paris 116:75116',
          'Paris 17:75017',
          'Boulogne-Billancourt:92100',
          'Neuilly-sur-Seine:92200',
          'Puteaux:92800'
        ]
      >;
    integration_type: Attribute.Enumeration<['WOO_COMMERCE']>;
    integration_config: Attribute.JSON;
    synchronisation_ulid: Attribute.Text &
      Attribute.CustomField<'plugin::field-ulid.ulid'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::seller.seller',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::seller.seller',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSellerProductSellerProduct extends Schema.CollectionType {
  collectionName: 'seller_products';
  info: {
    singularName: 'seller-product';
    pluralName: 'seller-products';
    displayName: 'Seller Product';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    category: Attribute.String;
    image: Attribute.Media & Attribute.Required;
    description: Attribute.Text;
    origin: Attribute.String;
    weight_unit: Attribute.String;
    tags_list: Attribute.JSON &
      Attribute.CustomField<
        'plugin::multi-select.multi-select',
        ['french', 'organic']
      >;
    brand: Attribute.String;
    nutriscore: Attribute.Enumeration<['A', 'B', 'C', 'D', 'E']>;
    ecoscore: Attribute.Enumeration<['A', 'B', 'C', 'D', 'E']>;
    ingredients: Attribute.Text;
    nutritional_values: Attribute.Text;
    allergens: Attribute.Text;
    consumption_date: Attribute.Integer;
    raw_name: Attribute.String;
    weight: Attribute.Decimal;
    generic_product: Attribute.Relation<
      'api::seller-product.seller-product',
      'oneToOne',
      'api::generic-product.generic-product'
    >;
    product_url: Attribute.String;
    product_id: Attribute.String & Attribute.Unique;
    raw_image_url: Attribute.Media;
    quantity_multiple: Attribute.Integer;
    weight_unit_name: Attribute.String;
    conservation_mode: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::seller-product.seller-product',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::seller-product.seller-product',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSellerProductDetailSellerProductDetail
  extends Schema.CollectionType {
  collectionName: 'seller_product_details';
  info: {
    singularName: 'seller-product-detail';
    pluralName: 'seller-product-details';
    displayName: 'Seller Product Detail';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    price: Attribute.Decimal & Attribute.Required;
    stock_quantity: Attribute.Integer;
    seller_shop: Attribute.Relation<
      'api::seller-product-detail.seller-product-detail',
      'oneToOne',
      'api::seller-shop.seller-shop'
    >;
    seller_product: Attribute.Relation<
      'api::seller-product-detail.seller-product-detail',
      'oneToOne',
      'api::seller-product.seller-product'
    >;
    currency: Attribute.Enumeration<['EUR', 'USD', 'GBP']> &
      Attribute.Required &
      Attribute.DefaultTo<'EUR'>;
    partner_id: Attribute.BigInteger;
    price_by_weight: Attribute.Float;
    price_before_discount: Attribute.Float;
    discount_type: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::seller-product-detail.seller-product-detail',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::seller-product-detail.seller-product-detail',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSellerShopSellerShop extends Schema.CollectionType {
  collectionName: 'seller_shops';
  info: {
    singularName: 'seller-shop';
    pluralName: 'seller-shops';
    displayName: 'Seller Shop';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    'import-export-entries': {
      idField: 'synchronisation_ulid';
    };
  };
  attributes: {
    name: Attribute.String;
    opening_hours: Attribute.String;
    str_acc_id: Attribute.String & Attribute.Unique;
    seller: Attribute.Relation<
      'api::seller-shop.seller-shop',
      'manyToOne',
      'api::seller.seller'
    >;
    address: Attribute.Component<'address.address'>;
    email: Attribute.Email;
    phone_number: Attribute.BigInteger;
    synchronisation_ulid: Attribute.Text &
      Attribute.CustomField<'plugin::field-ulid.ulid'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::seller-shop.seller-shop',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::seller-shop.seller-shop',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSuggestionSuggestion extends Schema.CollectionType {
  collectionName: 'suggestions';
  info: {
    singularName: 'suggestion';
    pluralName: 'suggestions';
    displayName: 'Suggestion';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String & Attribute.Required & Attribute.Unique;
    image: Attribute.Media & Attribute.Required;
    generic_product_selections: Attribute.Relation<
      'api::suggestion.suggestion',
      'oneToMany',
      'api::generic-product-selection.generic-product-selection'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::suggestion.suggestion',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::suggestion.suggestion',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface ContentTypes {
      'admin::permission': AdminPermission;
      'admin::user': AdminUser;
      'admin::role': AdminRole;
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::i18n.locale': PluginI18NLocale;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
      'api::basket.basket': ApiBasketBasket;
      'api::brand.brand': ApiBrandBrand;
      'api::customer.customer': ApiCustomerCustomer;
      'api::feedback.feedback': ApiFeedbackFeedback;
      'api::generic-category.generic-category': ApiGenericCategoryGenericCategory;
      'api::generic-favourite.generic-favourite': ApiGenericFavouriteGenericFavourite;
      'api::generic-grocery-list.generic-grocery-list': ApiGenericGroceryListGenericGroceryList;
      'api::generic-popular-search.generic-popular-search': ApiGenericPopularSearchGenericPopularSearch;
      'api::generic-product.generic-product': ApiGenericProductGenericProduct;
      'api::generic-product-selection.generic-product-selection': ApiGenericProductSelectionGenericProductSelection;
      'api::generic-subcategory.generic-subcategory': ApiGenericSubcategoryGenericSubcategory;
      'api::item.item': ApiItemItem;
      'api::matching-algo-config.matching-algo-config': ApiMatchingAlgoConfigMatchingAlgoConfig;
      'api::missing-generic-product.missing-generic-product': ApiMissingGenericProductMissingGenericProduct;
      'api::order.order': ApiOrderOrder;
      'api::partner-mapping-matching.partner-mapping-matching': ApiPartnerMappingMatchingPartnerMappingMatching;
      'api::seller.seller': ApiSellerSeller;
      'api::seller-product.seller-product': ApiSellerProductSellerProduct;
      'api::seller-product-detail.seller-product-detail': ApiSellerProductDetailSellerProductDetail;
      'api::seller-shop.seller-shop': ApiSellerShopSellerShop;
      'api::suggestion.suggestion': ApiSuggestionSuggestion;
    }
  }
}
