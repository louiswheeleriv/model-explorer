import React, { useEffect, useState } from "react";
import { DndContext, DragEndEvent } from '@dnd-kit/core';

import UserModelGalleryDraggableItem, { ProposedImage } from "./UserModelGalleryDraggableItem";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";

type Props = {
  images: ProposedImage[];
  onImagesUpdated: (images: ProposedImage[]) => void;
}

const UserModelGalleryDraggableList = (props: Props) => {
  const [images, setImages] = useState<ProposedImage[]>(props.images);

  function reorderList(e: DragEndEvent) {
    if (!e.over) return;

    if (e.active.id !== e.over.id) {
      setImages((images) => {
        const oldIndex = images.findIndex((image) => image.id === e.active.id.toString());
        const newIndex = images.findIndex((image) => image.id === e.over?.id.toString());
        return arrayMove(images, oldIndex, newIndex);
      })
    }
  }

  function removeImage(index: number) {
    setImages([
      images.slice(0, index),
      images.slice(index + 1)
    ].flat());
  }

  useEffect(() => {
    props.onImagesUpdated(images);
  }, [images]);

  useEffect(() => {
    if (
      props.images.length !== images.length ||
      props.images.some((img, index) => {
        const image = images[index];
        return image && img.id !== image.id;
      })
    ) {
      setImages(props.images);
    }
  }, [props.images]);

  return (
    <div>
      <DndContext onDragEnd={reorderList}>
        <SortableContext items={images}>
          <ul>
            {images.map((image, index) => (
              <UserModelGalleryDraggableItem
                key={image.id}
                image={image}
                onDelete={() => removeImage(index)} />
            ))}
          </ul>
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default UserModelGalleryDraggableList;
