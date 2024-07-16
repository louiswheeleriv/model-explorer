import React, { useEffect, useState } from "react";
import { Faction, Model, QuantityByStatus, UserModel, UserModelGroup } from "../types/models";
import Button from "../common/Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { byPrefixAndName } from '@awesome.me/kit-902717d512/icons';
import { apiCall, countByStatus } from "../utils/helpers";
import Select from "../common/Select";
import Input from "../common/Input";
import SummaryProgressBar from "../common/SummaryProgressBar";
import UserModelStatusEditor from "../common/UserModelStatusEditor";

type Props = {
  faction: Faction;
  model: Model;
  userModel: UserModel;
}

const EditUserModelStatus = (props: Props) => {
  const numByStatus = countByStatus([props.userModel]);
  const initialDraftQuantityByStatus = {
    unassembled: numByStatus.unassembled,
    assembled: numByStatus.assembled,
    in_progress: numByStatus.in_progress,
    finished: numByStatus.finished
  };
  const [draftQuantityByStatus, setDraftQuantityByStatus] = useState<QuantityByStatus>(initialDraftQuantityByStatus);
  const [valueByLabel, setValueByLabel] = useState<Record<string, string | number>>({});
  const [error, setError] = useState('');

  async function saveUserModel() {
    try {
      apiCall({
        endpoint: '/my_collection/factions/'+props.model.faction_id+'/user_models/'+props.userModel.id,
        method: 'PUT',
        body: {
          quantity_by_status: {
            unassembled: draftQuantityByStatus.unassembled,
            assembled: draftQuantityByStatus.assembled,
            in_progress: draftQuantityByStatus.in_progress,
            finished: draftQuantityByStatus.finished
          }
        }
      })
        .then((response) => response.json())
        .then((body) => {
          if (body.status >= 300) throw new Error(body.error);
          location.reload();
        });
    } catch(err) {
      if (err instanceof Error) setError(err.message);
    }
  }

  useEffect(() => {
    const totalNumModels =
      draftQuantityByStatus.unassembled +
      draftQuantityByStatus.assembled +
      draftQuantityByStatus.in_progress +
      draftQuantityByStatus.finished;
    setValueByLabel({
      'Models': totalNumModels,
      'Complete': Math.round((draftQuantityByStatus.finished / totalNumModels) * 100)+'%'
    });
  }, [draftQuantityByStatus]);

  return (
    <>
      <SummaryProgressBar
        numByStatus={draftQuantityByStatus}
        valueByLabel={valueByLabel} />

      <UserModelStatusEditor 
        quantityByStatus={draftQuantityByStatus}
        onChange={setDraftQuantityByStatus} />

      <div className='flex items-center mt-5'>
        <Button onClick={saveUserModel} className='max-w-[170px] mx-auto'>
          <FontAwesomeIcon icon={byPrefixAndName.fas['paintbrush-fine']} className='mr-2' />
          Save Model(s)
        </Button>
        <div className='text-red-500 text-center'>{error}</div>
      </div>
    </>
  );
};

export default EditUserModelStatus;
