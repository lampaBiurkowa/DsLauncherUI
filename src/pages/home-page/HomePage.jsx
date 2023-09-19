import React, { useEffect, useState } from "react";
import useArticles from "./hooks/useArticles";
import NewsEntry from "./components/NewsEntry";
import RecentApp from "./components/RecentApp";
import "./HomePage.scss";

import { recentApps } from "../../assets/data.js";

function HomePage() {
  let articles = useArticles();

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
          {articles?.map((article, index) => {
            return (
              <NewsEntry
                key={index}
                id={article.id}
                title={article.title}
                date={article._date}
                image={article.image}
                summary={article.summary}
              />
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default HomePage;
