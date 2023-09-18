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
 * The UserModel model module.
 * @module model/UserModel
 * @version 1.0
 */
export class UserModel {
  /**
   * Constructs a new <code>UserModel</code>.
   * @alias module:model/UserModel
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>UserModel</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/UserModel} obj Optional instance to populate.
   * @return {module:model/UserModel} The populated <code>UserModel</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new UserModel();
      if (data.hasOwnProperty('id'))
        obj.id = ApiClient.convertToType(data['id'], 'Number');
      if (data.hasOwnProperty('email'))
        obj.email = ApiClient.convertToType(data['email'], 'String');
      if (data.hasOwnProperty('isConfirmed'))
        obj.isConfirmed = ApiClient.convertToType(data['isConfirmed'], 'Boolean');
      if (data.hasOwnProperty('isLoggedIn'))
        obj.isLoggedIn = ApiClient.convertToType(data['isLoggedIn'], 'Boolean');
      if (data.hasOwnProperty('lastLoginDate'))
        obj.lastLoginDate = ApiClient.convertToType(data['lastLoginDate'], 'Date');
      if (data.hasOwnProperty('login'))
        obj.login = ApiClient.convertToType(data['login'], 'String');
      if (data.hasOwnProperty('name'))
        obj.name = ApiClient.convertToType(data['name'], 'String');
      if (data.hasOwnProperty('password'))
        obj.password = ApiClient.convertToType(data['password'], 'String');
      if (data.hasOwnProperty('registerDate'))
        obj.registerDate = ApiClient.convertToType(data['registerDate'], 'Date');
      if (data.hasOwnProperty('surname'))
        obj.surname = ApiClient.convertToType(data['surname'], 'String');
      if (data.hasOwnProperty('developer'))
        obj.developer = DeveloperModel.constructFromObject(data['developer']);
    }
    return obj;
  }
}

/**
 * @member {Number} id
 */
UserModel.prototype.id = undefined;

/**
 * @member {String} email
 */
UserModel.prototype.email = undefined;

/**
 * @member {Boolean} isConfirmed
 */
UserModel.prototype.isConfirmed = undefined;

/**
 * @member {Boolean} isLoggedIn
 */
UserModel.prototype.isLoggedIn = undefined;

/**
 * @member {Date} lastLoginDate
 */
UserModel.prototype.lastLoginDate = undefined;

/**
 * @member {String} login
 */
UserModel.prototype.login = undefined;

/**
 * @member {String} name
 */
UserModel.prototype.name = undefined;

/**
 * @member {String} password
 */
UserModel.prototype.password = undefined;

/**
 * @member {Date} registerDate
 */
UserModel.prototype.registerDate = undefined;

/**
 * @member {String} surname
 */
UserModel.prototype.surname = undefined;

/**
 * @member {module:model/DeveloperModel} developer
 */
UserModel.prototype.developer = undefined;

