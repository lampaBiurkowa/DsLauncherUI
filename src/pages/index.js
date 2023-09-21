import AppsPage from "./apps-page/AppsPage";
import ArticlePage from "./article-page/ArticlePage";
import DiscoverPage from "./discover-page/DiscoverPage";
import GamesPage from "./games-page/GamesPage";
import HomePage from "./home-page/HomePage";
import LibraryPage from "./library-page/LibraryPage";
import LoginPage from "./login-page/LoginPage";
import MainPage from "./main-page/MainPage";
import SettingsPage from "./settings-page/SettingsPage";
import StorePage from "./store-page/StorePage";
import ProductPage from "./product-page/ProductPage";
import RegisterPage from "./register-page/RegisterPage";

export {
  AppsPage,
  ArticlePage,
  DiscoverPage,
  GamesPage,
  HomePage,
  LibraryPage,
  LoginPage,
  MainPage,
  SettingsPage,
  StorePage,
  ProductPage,
  RegisterPage,
};

/*
 * ndibAPI
 * No description provided (generated by Swagger Codegen https:/github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: 1.0
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https:/github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 3.0.46
 *
 * Do not edit the class manually.
 *
 */
import { ApiClient } from "../services/ApiClient";
import { DeveloperModel } from "../services/model/DeveloperModel";
import { ChannelMemberModel } from "../services/model/ChannelMemberModel";
import { ChannelModel } from "../services/model/ChannelModel";
import { FilesUploadBody } from "../services/model/FilesUploadBody";
import { FriendshipModel } from "../services/model/FriendshipModel";
import { NewsModel } from "../services/model/NewsModel";
import { ProductModel } from "../services/model/ProductModel";
import { ProductCategory } from "../services/model/ProductCategory";
import { PurchaseModel } from "../services/model/PurchaseModel";
import { ReviewModel } from "../services/model/ReviewModel";
import { RatesData } from "../services/model/RatesData";
import { UserModel } from "../services/model/UserModel";
import { ActivationApi } from "../services/api/ActivationApi";
import { AuthApi } from "../services/api/AuthApi";
import { DeveloperApi } from "../services/api/DeveloperApi";
import { ChannelApi } from "../services/api/ChannelApi";
import { ChannelMemberApi } from "../services/api/ChannelMemberApi";
import { FilesApi } from "../services/api/FilesApi";
import { FriendshipApi } from "../services/api/FriendshipApi";
import { NewsApi } from "../services/api/NewsApi";
import { ProductApi } from "../services/api/ProductApi";
import { PurchaseApi } from "../services/api/PurchaseApi";
import { ReviewApi } from "../services/api/ReviewApi";
import { UserApi } from "../services/api/UserApi";

/**
 * Object.<br>
 * The <code>index</code> module provides access to constructors for all the classes which comprise the public API.
 * <p>
 * An AMD (recommended!) or CommonJS application will generally do something equivalent to the following:
 * <pre>
 * var NdibApi = require('index'); / See note below*.
 * var xxxSvc = new NdibApi.XxxApi(); / Allocate the API class we're going to use.
 * var yyyModel = new NdibApi.Yyy(); / Construct a model instance.
 * yyyModel.someProperty = 'someValue';
 * ...
 * var zzz = xxxSvc.doSomething(yyyModel); / Invoke the service.
 * ...
 * </pre>
 * <em>*NOTE: For a top-level AMD script, use require(['index'], function(){...})
 * and put the application logic within the callback function.</em>
 * </p>
 * <p>
 * A non-AMD browser application (discouraged) might do something like this:
 * <pre>
 * var xxxSvc = new NdibApi.XxxApi(); / Allocate the API class we're going to use.
 * var yyy = new NdibApi.Yyy(); / Construct a model instance.
 * yyyModel.someProperty = 'someValue';
 * ...
 * var zzz = xxxSvc.doSomething(yyyModel); / Invoke the service.
 * ...
 * </pre>
 * </p>
 * @module index
 * @version 1.0
 */
export {
  /**
   * The ApiClient constructor.
   * @property {module:ApiClient}
   */
  ApiClient,

  /**
   * The AuthorModel model constructor.
   * @property {module:model/DeveloperModel}
   */
  DeveloperModel,

  /**
   * The ChannelMemberModel model constructor.
   * @property {module:model/ChannelMemberModel}
   */
  ChannelMemberModel,

  /**
   * The ChannelModel model constructor.
   * @property {module:model/ChannelModel}
   */
  ChannelModel,

  /**
   * The FilesUploadBody model constructor.
   * @property {module:model/FilesUploadBody}
   */
  FilesUploadBody,

  /**
   * The FriendshipModel model constructor.
   * @property {module:model/FriendshipModel}
   */
  FriendshipModel,

  /**
   * The NewsModel model constructor.
   * @property {module:model/NewsModel}
   */
  NewsModel,

  /**
   * The ProductModel model constructor.
   * @property {module:model/ProductModel}
   */
  ProductModel,

  /**
   * The PurchaseModel model constructor.
   * @property {module:model/PurchaseModel}
   */
  PurchaseModel,

  /**
   * The ReviewModel model constructor.
   * @property {module:model/ReviewModel}
   */
  ReviewModel,

  /**
   * The TagModel model constructor.
   * @property {module:model/RatesData}
   */
  RatesData,

  /**
   * The UserModel model constructor.
   * @property {module:model/UserModel}
   */
  UserModel,

  /**
   * The ActivationApi service constructor.
   * @property {module:api/ActivationApi}
   */
  ActivationApi,
  AuthApi,
  ProductCategory,

  /**
   * The AuthorApi service constructor.
   * @property {module:api/DeveloperApi}
   */
  DeveloperApi,

  /**
   * The ChannelApi service constructor.
   * @property {module:api/ChannelApi}
   */
  ChannelApi,

  /**
   * The ChannelMemberApi service constructor.
   * @property {module:api/ChannelMemberApi}
   */
  ChannelMemberApi,

  /**
   * The FilesApi service constructor.
   * @property {module:api/FilesApi}
   */
  FilesApi,

  /**
   * The FriendshipApi service constructor.
   * @property {module:api/FriendshipApi}
   */
  FriendshipApi,

  /**
   * The NewsApi service constructor.
   * @property {module:api/NewsApi}
   */
  NewsApi,

  /**
   * The ProductApi service constructor.
   * @property {module:api/ProductApi}
   */
  ProductApi,

  /**
   * The PurchaseApi service constructor.
   * @property {module:api/PurchaseApi}
   */
  PurchaseApi,

  /**
   * The ReviewApi service constructor.
   * @property {module:api/ReviewApi}
   */
  ReviewApi,

  /**
   * The UserApi service constructor.
   * @property {module:api/UserApi}
   */
  UserApi,
};
