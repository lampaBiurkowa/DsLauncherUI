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

/**
 * The DeveloperModel model module.
 * @module model/DeveloperModel
 * @version 1.0
 */
export class DeveloperModel {
  /**
   * Constructs a new <code>DeveloperModel</code>.
   * @alias module:model/DeveloperModel
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>DeveloperModel</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/DeveloperModel} obj Optional instance to populate.
   * @return {module:model/DeveloperModel} The populated <code>DeveloperModel</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new DeveloperModel();
      if (data.hasOwnProperty('name'))
        obj.name = ApiClient.convertToType(data['name'], 'String');
      if (data.hasOwnProperty('description'))
        obj.description = ApiClient.convertToType(data['description'], 'String');
      if (data.hasOwnProperty('website'))
        obj.website = ApiClient.convertToType(data['website'], 'String');
      if (data.hasOwnProperty('apiKey'))
        obj.apiKey = ApiClient.convertToType(data['apiKey'], 'String');
      if (data.hasOwnProperty('id'))
        obj.id = ApiClient.convertToType(data['id'], 'Number');
    }
    return obj;
  }
}

/**
 * @member {String} name
 */
DeveloperModel.prototype.name = undefined;

/**
 * @member {String} description
 */
DeveloperModel.prototype.description = undefined;

/**
 * @member {String} website
 */
DeveloperModel.prototype.website = undefined;

/**
 * @member {String} apiKey
 */
DeveloperModel.prototype.apiKey = undefined;

/**
 * @member {Number} id
 */
DeveloperModel.prototype.id = undefined;

