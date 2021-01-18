import React, { useEffect, useState } from "react";

const BUTTONS_ROW_HEIGHT = 20;
const BUTTONS_COLUMN_WIDTH = 20;
const IMAGE_BLOCK_SIZE = 200;

interface IImageBlock {
  top: boolean;
  left: boolean;
  imageURL: string;
}

interface IGrid {
  gridTemplateColumns: string;
  gridTemplateRows: string;
}

const ImageBlock: React.FC<IImageBlock> = (props: IImageBlock) => {
  const { top, left, imageURL } = props;

  const [gridStyle, setGridStyle] = useState<IGrid | null>(null);

  useEffect(() => {
    const result = {} as any;
    if (top) {
      result.gridTemplateRows = `[button] ${BUTTONS_ROW_HEIGHT}px [image] ${IMAGE_BLOCK_SIZE}px`;
    } else {
      result.gridTemplateRows = `[image] ${IMAGE_BLOCK_SIZE}px [button] ${BUTTONS_ROW_HEIGHT}px`;
    }
    if (left) {
      result.gridTemplateColumns = `[button] ${BUTTONS_COLUMN_WIDTH}px [image] ${IMAGE_BLOCK_SIZE}px`;
    } else {
      result.gridTemplateColumns = `[image] ${IMAGE_BLOCK_SIZE}px [button] ${BUTTONS_COLUMN_WIDTH}px`;
    }
    result.width = BUTTONS_ROW_HEIGHT + IMAGE_BLOCK_SIZE;
    setGridStyle(result);
  }, [top, left]);

  return (
    <div style={gridStyle || {}} className="flip_image-image_block">
      <div className="flip_image-image_block-horizontal_button">tb</div>
      <img
        className="flip_image-image_block-image"
        src={imageURL}
        alt="error"
        height="200"
        width="200"
      />
      <div className="flip_image-image_block-vertical_button">lr</div>
    </div>
  );
};

export default ImageBlock;
