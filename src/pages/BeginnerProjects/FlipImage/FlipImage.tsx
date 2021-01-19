import React, { useState } from "react";
import { Button, TextField } from "@material-ui/core";

import ImageBlock from "./ImageBlock";
import PageWrapper from "../../../components/PageWrapper";

import "./index.scss";
import AlertError from "../../../components/AlertError";

const title = "Flip Image";
const taskLink =
  "https://github.com/florinpop17/app-ideas/blob/master/Projects/1-Beginner/Flip-Image-App.md";

const tempImage =
  "https://www.jquery-az.com/wp-content/uploads/2015/12/2.1-HTML-img-src.jpg";
const timeout = 5000;

const FlipImage: React.FC = () => {
  const [urlValue, setURLValue] = useState("");
  const [url, setURL] = useState(tempImage);
  const [open, setOpen] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setURLValue(value);
  };

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const checkImageURL = () => {
    const img = new Image();
    const timer = setTimeout(() => {
      img.src = "//!!!!/noexist.jpg";
      setOpen(true);
    }, timeout);
    img.onerror = () => {
      clearTimeout(timer);
      setOpen(true);
    };
    img.onload = () => {
      clearTimeout(timer);
      setURL(urlValue);
    };
    img.src = urlValue;
  };

  return (
    <div className="flip_image-container">
      <div className="flip_image-url_block">
        <TextField label="Image URL" value={urlValue} onChange={handleChange} />
        <Button variant="contained" color="primary" onClick={checkImageURL}>
          Load
        </Button>
      </div>
      <div className="flip_image-image_container_block">
        <ImageBlock top left imageURL={url} />
        <ImageBlock top left={false} imageURL={url} />
        <ImageBlock top={false} left imageURL={url} />
        <ImageBlock top={false} left={false} imageURL={url} />
      </div>
      <AlertError
        open={open}
        handleClose={handleClose}
        text="Wrong Image URL!"
      />
    </div>
  );
};

export default PageWrapper(title, taskLink, FlipImage);
