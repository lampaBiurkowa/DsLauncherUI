/*
 * ndibAPI
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: 1.0
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 3.0.46
 *
 * Do not edit the class manually.
 *
 */
import {ApiClient} from '../ApiClient';
import {DeveloperModel} from './DeveloperModel';

/**
 * The ProductModel model module.
 * @module model/ProductModel
 * @version 1.0
 */
export class ProductModel {
  /**
   * Constructs a new <code>ProductModel</code>.
   * @alias module:model/ProductModel
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>ProductModel</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ProductModel} obj Optional instance to populate.
   * @return {module:model/ProductModel} The populated <code>ProductModel</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new ProductModel();
      if (data.hasOwnProperty('id'))
        obj.id = ApiClient.convertToType(data['id'], 'Number');
      if (data.hasOwnProperty('developer'))
        obj.developer = DeveloperModel.constructFromObject(data['developer']);
      if (data.hasOwnProperty('description'))
        obj.description = ApiClient.convertToType(data['description'], 'String');
      if (data.hasOwnProperty('name'))
        obj.name = ApiClient.convertToType(data['name'], 'String');
      if (data.hasOwnProperty('price'))
        obj.price = ApiClient.convertToType(data['price'], 'Number');
      if (data.hasOwnProperty('tags'))
        obj.tags = ApiClient.convertToType(data['tags'], 'String');
    }
    return obj;
  }
}

/**
 * @member {Number} id
 */
ProductModel.prototype.id = undefined;

/**
 * @member {module:model/DeveloperModel} developer
 */
ProductModel.prototype.developer = undefined;

/**
 * @member {String} description
 */
ProductModel.prototype.description = undefined;

/**
 * @member {String} name
 */
ProductModel.prototype.name = undefined;

/**
 * @member {Number} price
 */
ProductModel.prototype.price = undefined;

/**
 * @member {String} tags
 */
ProductModel.prototype.tags = undefined;

