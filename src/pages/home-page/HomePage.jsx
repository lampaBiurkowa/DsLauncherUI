import React, { useEffect, useState } from "react";
import useArticles from "./hooks/useArticles";
import useRecentProducts from "../product-page/hooks/useRecentProducts";
import NewsEntry from "./components/NewsEntry";
import RecentApp from "./components/RecentApp";
import "./HomePage.scss";


function HomePage() {
  let articles = useArticles();
  let recentProducts = useRecentProducts();

  return (
    <div className="home-page">
      {recentProducts?.length > 0 && (
        <section className="recent-section">
          <h1>Recently played</h1>
          <div className="recent-apps">
            {recentProducts.map((app, key) => {
              return (
                <RecentApp key={key} coverUrl={app.description}>
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
