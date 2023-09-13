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
 * The NewsModel model module.
 * @module model/NewsModel
 * @version 1.0
 */
export class NewsModel {
  /**
   * Constructs a new <code>NewsModel</code>.
   * @alias module:model/NewsModel
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>NewsModel</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/NewsModel} obj Optional instance to populate.
   * @return {module:model/NewsModel} The populated <code>NewsModel</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new NewsModel();
      if (data.hasOwnProperty('id'))
        obj.id = ApiClient.convertToType(data['id'], 'Number');
      if (data.hasOwnProperty('content'))
        obj.content = ApiClient.convertToType(data['content'], 'String');
      if (data.hasOwnProperty('date'))
        obj._date = ApiClient.convertToType(data['date'], 'Date');
      if (data.hasOwnProperty('image'))
        obj.image = ApiClient.convertToType(data['image'], 'String');
      if (data.hasOwnProperty('title'))
        obj.title = ApiClient.convertToType(data['title'], 'String');
    }
    return obj;
  }
}

/**
 * @member {Number} id
 */
NewsModel.prototype.id = undefined;

/**
 * @member {String} content
 */
NewsModel.prototype.content = undefined;

/**
 * @member {Date} _date
 */
NewsModel.prototype._date = undefined;

/**
 * @member {String} image
 */
NewsModel.prototype.image = undefined;

/**
 * @member {String} title
 */
NewsModel.prototype.title = undefined;

