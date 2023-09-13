import React, { useEffect, useState } from "react";
import NewsEntry from "./components/NewsEntry";
import RecentApp from "./components/RecentApp";
import "./HomePage.scss";

import { useGlobalArticles } from "./hooks/useGlobalArticles";
import { NewsApi } from "../../services/api/NewsApi";

import { recentApps } from "../../assets/data.js";

function HomePage() {
  const content = useGlobalArticles();

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
