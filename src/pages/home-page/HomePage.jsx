import React, { useEffect, useState } from "react";
import NewsEntry from "./components/NewsEntry";
import RecentApp from "./components/RecentApp";
import "./HomePage.scss";

import { useGlobalArticles, useGlobalArticles2 } from "./hooks/useGlobalArticles";
import { NewsApi } from "../../services/api/NewsApi";
import { recentApps } from "../../assets/data.js";

import { Command } from '@tauri-apps/api/shell'

async function runInstall(appName, path) {
    const command = new Command("ndib-get install", ['install', appName, '--json', `--path=${path}`])
    command.stdout.on("data", (line) => {
      const jsonObject = JSON.parse(line);
      console.log(`${line} ${jsonObject}`);
      console.log(`${jsonObject.BytesTotal}`);
      console.log(`${jsonObject.BytesDownloaded}`);
      console.log(`${jsonObject.Percentage}`);
    })
    const child = await command.spawn();
    console.log("PID: ", child.pid);
}

async function runStatus(appName) {
  const command = new Command("ndib-get status", ['status', appName, '--json'])
  const output  = await command.execute();
  try
  {
    const jsonObject = JSON.parse(output.stdout);
    console.log(`${output.stdout} ${jsonObject}`);
    console.log(`${jsonObject.VersionInNdib}`);
    console.log(`${jsonObject.VersionDescription}`);
  }
  catch
  {
    console.log("not installed")
  }
}

async function runList(updatable) {
  let command = null;
  if (updatable)
    command = new Command("ndib-get list updatable", ['list', '--updatable', '--json'])
  else
    command = new Command("ndib-get list all", ['list', '--json'])
  
  const output  = await command.execute();
  const jsonObject = JSON.parse(output.stdout);
  console.log(`${output.stdout} ${jsonObject}`);
  console.log(`${jsonObject.Names}`);
}



function HomePage() {
  const content = useGlobalArticles();
  const content2 = useGlobalArticles2();

  useEffect(() => {runInstall("app2", "C:/test/test1"); return () =>{ close();}}, [])
  useEffect(() => {runList(false); return () =>{ close();}}, [])
  useEffect(() => {runList(true); return () =>{ close();}}, [])
  useEffect(() => {runStatus("app2"); return () =>{ close();}}, [])

  
  return (
    <div className="home-page">
      {recentApps.length > 0 && (
        <section className="recent-section">
          <h1>Recently played</h1>
          <div className="recent-apps">
            {recentApps.map((app, key) => {
              return (
                <RecentApp key={key} coverUrl={app.coverUrl}>
                  {app.name}
                </RecentApp>
              );
            })}
          </div>
        </section>
      )}
      <section className="news-section">
        <h1>What's new</h1>
        <div className="news">
          {content?.map((child, index) => {
            return (
              <NewsEntry
                key={index}
                id={child.id}
                title={child.title}
                date={child._date}
                image={child.image}
                summary={child.content}
              />
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default HomePage;
