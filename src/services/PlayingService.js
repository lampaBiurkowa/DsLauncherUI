import { fs } from '@tauri-apps/api';
import { BaseDirectory } from '@tauri-apps/api/fs';
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
    this.fileName = 'recent.json';
    this.maxRecentAppsCount = 5;
  }

  async tryRegisterGameActivity(gameId, userId) {
    PlayingService.currentlyPlayedGameId = gameId;
    PlayingService.currentStartDate = new Date().toISOString();
    
    const gameActivity = new GameActivityModel();
    gameActivity.endDate = null;
    gameActivity.startDate = PlayingService.currentStartDate;
    gameActivity.userId = userId;
    gameActivity.productId = gameId;

    this.gameActivityApi.gameActivityPost({body: JSON.stringify(gameActivity)}, async (error, data) => {
      await this.registerGameActivityLocally(gameActivity);
    });
  }

  async registerGameActivityLocally(gameActivity) {
    await this.writeFileContent(this.getActivityFileName(PlayingService.currentStartDate), JSON.stringify(gameActivity));
    var recentAppIds = [];
    try
    {
      const appsInFile = JSON.parse(await this.readFileContent(this.fileName));
      if (appsInFile !== null)
        recentAppIds = appsInFile;
    }
    catch {}
    recentAppIds = recentAppIds.filter(item => item !== gameActivity.productId);
    recentAppIds.unshift(gameActivity.productId);
    recentAppIds = recentAppIds.slice(0, this.maxRecentAppsCount);
    await this.writeFileContent(this.fileName, JSON.stringify(recentAppIds));
  }

  async tryPingGameActivity()
  {
    let registeredGameActivity =  JSON.parse(await this.getLocallySavedGameActivity(PlayingService.currentStartDate));
    registeredGameActivity.endDate = new Date().toISOString();
    this.gameActivityApi.gameActivityPut({body: JSON.stringify(registeredGameActivity)}, async (error, data) => {
      await this.updateGameActivityLocally(registeredGameActivity);
    })
  }

  async updateGameActivityLocally(gameActivity) {
    await this.writeFileContent(this.getActivityFileName(PlayingService.currentStartDate), JSON.stringify(gameActivity));
  }

  async getLocallySavedGameActivitiesStarts() {
    await this.createAppDataDirIfDoesntExist();
    let activities = await fs.readDir("", { dir: BaseDirectory.AppData });
    activities = activities.map((file) => {
      return file.name.replace('.json', '').replace(';', ':');
    });

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
  }

  async removeFromLocallySavedGameActivities(startDate) {
    await this.createAppDataDirIfDoesntExist();
    await fs.removeFile(this.getActivityFileName(startDate), { dir: BaseDirectory.AppData });
  }

  async trySendSavedGameActivities() {
    const activities = await this.getLocallySavedGameActivitiesStarts();
    for (let i = 0; i < activities.length; i++) {
      await this.trySubmitGameActivityEnded(activities[i]);
    }
  }

  async trySubmitCurrentGameActivityEnded() {
    await this.trySubmitGameActivityEnded(PlayingService.currentStartDate);
  }
  
  async trySubmitGameActivityEnded(startDate) {
    let registeredGameActivity = await this.getLocallySavedGameActivity(startDate);
    PlayingService.currentlyPlayedGameId = null;
    PlayingService.currentStartDate = null;

    this.gameActivityApi.gameActivityPut({body: registeredGameActivity}, async (error, data) => {
      if (error === null) {
        await this.removeFromLocallySavedGameActivities(startDate);
      }
      this.fileStillSaved = false;
    });
  }

  async readFileContent(name) {
    if (!await fs.exists(name, { dir: BaseDirectory.AppData }))
    {
      return null;
    }

    return await fs.readTextFile(name, { dir: BaseDirectory.AppData });
  }

  async writeFileContent(name, content) {
    await this.createAppDataDirIfDoesntExist();

    await fs.writeTextFile(name, content, { dir: BaseDirectory.AppData });
  }

  async createAppDataDirIfDoesntExist()
  {
    if (!await fs.exists("", { dir: BaseDirectory.AppData }))
    {
      fs.createDir("", { dir: BaseDirectory.AppData });
    }
  }
}

export default PlayingService;