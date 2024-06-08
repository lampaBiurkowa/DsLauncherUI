import React from "react";
import { useDeveloperNews } from "./hooks/useDeveloperNews";
import { useParams } from "react-router-dom";
import NewsEntry from "@/components/news-entry/NewsEntry";
import InfoBar from "@/components/info-bar/InfoBar";
import "./DeveloperNewsPage.scss";

function DeveloperNewsPage() {
  const { id: devId } = useParams();
  const news = useDeveloperNews(devId);

  return (
    <div className="developer-news-page">
      <h1>Developer news</h1>
      <div className="news">
        {news?.length == 0 ?? false ? (
          <InfoBar
            header="Nothing to see here"
            text="This developer has not released any content yet."
            dismissable={true}
          ></InfoBar>
        ) : (
          <></>
        )}
        {news?.map((news, index) => {
          return (
            <NewsEntry
              key={index}
              id={news.guid}
              title={news.title}
              date={news.createdAt}
              image={news.image}
              summary={news.summary}
            />
          );
        })}
      </div>
    </div>
  );
}

export default DeveloperNewsPage;
