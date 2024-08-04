import React, { useEffect, useState } from "react";
import { Model } from "../types/models";
import Input from "../common/Input";
import ModelListItem from "./ModelListItem";

type Props = {
  models: Model[];
  numUsersByModelId: Record<number, number>;
};

const ModelList = (props: Props) => {
  const [filteredModels, setFilteredModels] = useState<Model[]>(props.models);
  const [filterString, setFilterString] = useState('');

  useEffect(() => {
    setFilteredModels(
      props.models.filter((model) => {
        return model.name.toLowerCase().includes(filterString);
      })
    );
  }, [filterString]);

  return (
    <div id='explore-models overflow-hidden'>
      <Input
        onChange={(e) => setFilterString(e.target.value.toLowerCase())}
        placeholder='Search'
        className='mb-3' />

      <div className='overflow-y-auto overscroll-contain'>
        {filteredModels.map((model) => (
          <ModelListItem
            key={model.id}
            model={model}
            numUsers={props.numUsersByModelId[model.id]}
            className='mb-3' />
        ))}
      </div>
    </div>
  );
};

export default ModelList;
