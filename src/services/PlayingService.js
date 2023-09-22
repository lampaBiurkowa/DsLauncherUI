import { fs } from '@tauri-apps/api';
import {  BaseDirectory } from '@tauri-apps/api/fs';
import { GameActivityApi } from "@/services/api/GameActivityApi";
import { GameActivityModel } from "@/services/model/GameActivityModel";
import { ProductApi } from "@/services/api/ProductApi";
import { UserModel } from '../pages';
import { ProductModel } from '../pages';

class PlayingService {
    static currentlyPlayedGameId = null;
    static currentStartDate = null;

  constructor() {
    this.gameActivityApi = new GameActivityApi();
    this.productApi = new ProductApi();
  }

  async tryRegisterGameActivity(gameId) {
    PlayingService.currentlyPlayedGameId = gameId;
    PlayingService.currentStartDate = new Date().toISOString();
    
    const gameActivity = new GameActivityModel();
    gameActivity.endDate = null;
    gameActivity.startDate = PlayingService.currentStartDate;
    var user = new UserModel();
    user.id = 11;
    gameActivity.user = user;
    var product = new ProductModel();
    product.id = gameId;
    gameActivity.product = product;

    this.gameActivityApi.gameActivityPost({body: JSON.stringify(gameActivity)}, async (error, data) => {
      await this.registerGameActivityLocally(JSON.stringify(gameActivity));
    });
  }

  async registerGameActivityLocally(gameActivity) {
    await this.writeFileContent(this.getActivityFileName(PlayingService.currentStartDate), gameActivity);
  }

  async tryPingGameActivity()
  {
    let registeredGameActivity =  JSON.parse(await this.getLocallySavedGameActivity(PlayingService.currentStartDate));
    console.log(registeredGameActivity);
    registeredGameActivity.endDate = new Date().toISOString();
    console.log(JSON.stringify(registeredGameActivity));
    this.gameActivityApi.gameActivityPut({body: JSON.stringify(registeredGameActivity)}, async (error, data) => {
        if (error !== null)
        {
          console.log('byl err');
            await this.updateGameActivityLocally(registeredGameActivity);
        }
    })
  }

  async updateGameActivityLocally(gameActivity) {
    await this.writeFileContent(this.getActivityFileName(PlayingService.currentStartDate), JSON.stringify(gameActivity));
  }

  async getLocallySavedGameActivitiesStarts() {
    let activities = await fs.readDir("", { dir: BaseDirectory.AppData });
    console.log(activities);
    activities = activities.map((file) => {
      return file.name.replace('.json', '').replace(';', ':');
    });
    console.log(activities);
    return activities;
  }

  getActivityFileName(startDate)
  {
    var parsed = String(startDate);
    parsed = parsed.replace(/:/g, ';');
    return `${parsed}.json`;
  }

  async getLocallySavedGameActivity(startDate) {
    return this.readFileContent(this.getActivityFileName(startDate));
    // console.log(`total saved ${activities.length} ${startDate}`);
    // for (const a of activities) {
    //   if (a.startDate === startDate)
    //   {
    //     return a;
    //   }
    // }
    // return null;
  }

  async removeFromLocallySavedGameActivities(startDate) {
    await fs.removeFile(this.getActivityFileName(startDate), { dir: BaseDirectory.AppData });
  }

  async trySendSavedGameActivities() {
    const activities = await this.getLocallySavedGameActivitiesStarts();
    console.log(`a ${activities.length}`);
    for (let i = 0; i < activities.length; i++) {
      console.log("start");
      await this.trySubmitGameActivityEnded(activities[i]);
      console.log("end");
    }
  }

  async trySubmitCurrentGameActivityEnded() {
    await this.trySubmitGameActivityEnded(PlayingService.currentStartDate);
  }
  
  async trySubmitGameActivityEnded(startDate) {
    let registeredGameActivity = await this.getLocallySavedGameActivity(startDate);
    PlayingService.currentlyPlayedGameId = null;
    PlayingService.currentStartDate = null;

    console.log(`submit ${registeredGameActivity}`);
    this.gameActivityApi.gameActivityPut({body: registeredGameActivity}, async (error, data) => {
      if (error === null) {
        await this.removeFromLocallySavedGameActivities(startDate);
        console.log("settinh to false")
      }
      this.fileStillSaved = false;
    });
  }

  async readFileContent(name) {
    if (!await fs.exists(name, { dir: BaseDirectory.AppData }))
    {
      return null;
    }
    console.log("readinh");
    return await fs.readTextFile(name, { dir: BaseDirectory.AppData });
  }

  async writeFileContent(name, content) {
    if (!await fs.exists("", { dir: BaseDirectory.AppData }))
    {
      fs.createDir("", { dir: BaseDirectory.AppData });
    }
    console.log("writinh", content);
    await fs.writeTextFile(name, content, { dir: BaseDirectory.AppData });
  }
}

export default PlayingService;