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
import {ApiClient} from "../ApiClient";
import {ChannelMemberModel} from '../model/ChannelMemberModel';

/**
* ChannelMember service.
* @module api/ChannelMemberApi
* @version 1.0
*/
export class ChannelMemberApi {

    /**
    * Constructs a new ChannelMemberApi. 
    * @alias module:api/ChannelMemberApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instanc
    e} if unspecified.
    */
    constructor(apiClient) {
        this.apiClient = apiClient || ApiClient.instance;
    }

    /**
     * Callback function to receive the result of the channelMemberAddDataPost operation.
     * @callback moduleapi/ChannelMemberApi~channelMemberAddDataPostCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {String} data 
     * @param {module:api/ChannelMemberApi~channelMemberAddDataPostCallback} callback The callback function, accepting three arguments: error, data, response
     */
    channelMemberAddDataPost(data, callback) {
      
      let postBody = null;
      // verify the required parameter 'data' is set
      if (data === undefined || data === null) {
        throw new Error("Missing the required parameter 'data' when calling channelMemberAddDataPost");
      }

      let pathParams = {
        'data': data
      };
      let queryParams = {
        
      };
      let headerParams = {
        
      };
      let formParams = {
        
      };

      let authNames = [];
      let contentTypes = [];
      let accepts = [];
      let returnType = null;

      return this.apiClient.callApi(
        '/ChannelMember/Add/{data}', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the channelMemberGetGet operation.
     * @callback moduleapi/ChannelMemberApi~channelMemberGetGetCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/ChannelMemberModel>{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {module:api/ChannelMemberApi~channelMemberGetGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    channelMemberGetGet(callback) {
      
      let postBody = null;

      let pathParams = {
        
      };
      let queryParams = {
        
      };
      let headerParams = {
        
      };
      let formParams = {
        
      };

      let authNames = [];
      let contentTypes = [];
      let accepts = ['text/plain', 'application/json', 'text/json'];
      let returnType = [ChannelMemberModel];

      return this.apiClient.callApi(
        '/ChannelMember/Get', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the channelMemberGetIdGet operation.
     * @callback moduleapi/ChannelMemberApi~channelMemberGetIdGetCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ChannelMemberModel{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {Number} id 
     * @param {module:api/ChannelMemberApi~channelMemberGetIdGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    channelMemberGetIdGet(id, callback) {
      
      let postBody = null;
      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling channelMemberGetIdGet");
      }

      let pathParams = {
        'id': id
      };
      let queryParams = {
        
      };
      let headerParams = {
        
      };
      let formParams = {
        
      };

      let authNames = [];
      let contentTypes = [];
      let accepts = ['text/plain', 'application/json', 'text/json'];
      let returnType = ChannelMemberModel;

      return this.apiClient.callApi(
        '/ChannelMember/Get/{id}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

}