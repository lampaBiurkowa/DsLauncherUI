import React from "react";
import Guard, { GuardMode } from "@/Guard";
import useArticles from "./hooks/useArticles";
import { useRecentProducts } from "./hooks/useRecentProducts";
import NewsEntry from "@/components/news-entry/NewsEntry";
import RecentApp from "./components/RecentApp";
import "./HomePage.scss";

function HomePage() {
  let articles = useArticles();
  let recentProducts = useRecentProducts();

  return (
    <div className="home-page">
      <Guard mode={GuardMode.HIDE}>
        {recentProducts?.length > 0 && (
          <section className="recent-section">
            <h1>Recently played</h1>
            <div className="recent-apps">
              {recentProducts.map((app, key) => {
                return (
                  <RecentApp
                    key={key}
                    coverUrl={app.filesData.Icon}
                    guid={app.model.guid}
                  >
                    {app.model.name}
                  </RecentApp>
                );
              })}
            </div>
          </section>
        )}
      </Guard>
      <section className="news-section">
        <h1>What's new</h1>
        <div className="news">
          {articles?.map((article, index) => {
            return (
              <NewsEntry
                key={index}
                id={article.guid}
                title={article.title}
                date={article.createdAt}
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
