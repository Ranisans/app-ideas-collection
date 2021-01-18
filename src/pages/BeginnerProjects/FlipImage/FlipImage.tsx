import React from "react";

import PageWrapper from "../../../components/PageWrapper";

import "./index.scss";
import ImageBlock from "./ImageBlock";

const title = "Flip Image";
const taskLink =
  "https://github.com/florinpop17/app-ideas/blob/master/Projects/1-Beginner/Flip-Image-App.md";

const tempImage =
  "https://www.jquery-az.com/wp-content/uploads/2015/12/2.1-HTML-img-src.jpg";

const FlipImage: React.FC = () => {
  return (
    <div className="flip_image-container">
      <ImageBlock top left imageURL={tempImage} />
      <ImageBlock top left={false} imageURL={tempImage} />
      <ImageBlock top={false} left imageURL={tempImage} />
      <ImageBlock top={false} left={false} imageURL={tempImage} />
    </div>
  );
};

export default PageWrapper(title, taskLink, FlipImage);
