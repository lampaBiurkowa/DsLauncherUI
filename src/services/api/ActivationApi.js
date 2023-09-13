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

/**
* Activation service.
* @module api/ActivationApi
* @version 1.0
*/
export class ActivationApi {

    /**
    * Constructs a new ActivationApi. 
    * @alias module:api/ActivationApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instanc
    e} if unspecified.
    */
    constructor(apiClient) {
        this.apiClient = apiClient || ApiClient.instance;
    }

    /**
     * Callback function to receive the result of the activationAliasCodeGet operation.
     * @callback moduleapi/ActivationApi~activationAliasCodeGetCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {String} alias 
     * @param {String} code 
     * @param {module:api/ActivationApi~activationAliasCodeGetCallback} callback The callback function, accepting three arguments: error, data, response
     */
    activationAliasCodeGet(alias, code, callback) {
      
      let postBody = null;
      // verify the required parameter 'alias' is set
      if (alias === undefined || alias === null) {
        throw new Error("Missing the required parameter 'alias' when calling activationAliasCodeGet");
      }
      // verify the required parameter 'code' is set
      if (code === undefined || code === null) {
        throw new Error("Missing the required parameter 'code' when calling activationAliasCodeGet");
      }

      let pathParams = {
        'alias': alias,'code': code
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
        '/Activation/{alias}/{code}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

}