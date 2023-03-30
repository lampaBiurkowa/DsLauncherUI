import React from "react";
import NewsEntry from "./components/NewsEntry";
import RecentApp from "./components/RecentApp";
import "./HomePage.scss";

import { recentApps } from "../../assets/data.js";

function HomePage() {
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
          <NewsEntry
            title="Title"
            date="2020-05-12T23:50:21.817Z"
            coverUrl="https://images.unsplash.com/photo-1536881227204-c9e4ed6437ba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80"
          ></NewsEntry>
          <NewsEntry
            title="Title"
            date="2020-05-12T23:50:21.817Z"
            coverUrl="https://images.unsplash.com/photo-1536881227204-c9e4ed6437ba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80"
          ></NewsEntry>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
