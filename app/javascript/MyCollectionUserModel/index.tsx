import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { Faction, Model, QuantityByStatus, UserFaction, UserImage, UserModel, UserModelGroup } from "../types/models";
import SummaryProgressBar from "../common/SummaryProgressBar";
import Button from "../common/Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { byPrefixAndName } from '@awesome.me/kit-902717d512/icons';
import { apiCall, countByStatus } from "../utils/helpers";
import UserModelStatusEditor from "../common/UserModelStatusEditor";
import UserModelGallery from "./UserModelGallery";

type Props = {
  faction: Faction;
  user_faction: UserFaction;
  model: Model;
  user_model: UserModel;
  user_model_groups: UserModelGroup[];
  user_images: UserImage[];
}

const MyCollectionUserModel = (props: Props) => {
  const urlParams = useParams();

  const numByStatus = countByStatus([props.user_model]);
  const initialDraftQuantityByStatus = {
    unassembled: numByStatus.unassembled,
    assembled: numByStatus.assembled,
    in_progress: numByStatus.in_progress,
    finished: numByStatus.finished
  };
  const [draftQuantityByStatus, setDraftQuantityByStatus] = useState<QuantityByStatus>(initialDraftQuantityByStatus);
  const [valueByLabel, setValueByLabel] = useState<Record<string, string | number>>({});
  const [mode, setMode] = useState(urlParams.view || 'status');
  const [error, setError] = useState('');

  const userModelDisplayName = props.user_model.name ? props.user_model.name+' ('+props.model.name+')' : props.model.name;

  async function saveUserModel() {
    try {
      apiCall({
        endpoint: '/my_collection/factions/'+props.model.faction_id+'/user_models/'+props.user_model.id,
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
          if (body.status >= 300) throw new Error(body.error)
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
    <div className='px-6 py-8 max-w-[600px] mx-auto'>
      <div className='flex'>
        <div className='flex-1'>
          <a href={'/my_collection/'+props.faction.name}>
            <FontAwesomeIcon icon={byPrefixAndName.fas['left']} className='mr-1' />
            {props.faction.name}
          </a>
        </div>
        <div className='flex-1'>
          <h2 className='text-2xl text-center mb-5'>{userModelDisplayName}</h2>
        </div>
        <div className='flex-1'></div>
      </div>
      
      <SummaryProgressBar
        numByStatus={draftQuantityByStatus}
        valueByLabel={valueByLabel}
      />

      <div className='flex mt-3'>
        <div onClick={() => setMode('status')}
          className={'flex-1 cursor-pointer text-center p-3'+(mode === 'status' ? ' border-b text-lg font-semibold' : '')}>
            <FontAwesomeIcon icon={byPrefixAndName.fas['paintbrush-fine']} className='mr-1' />
            Status
        </div>
        <div onClick={() => setMode('gallery')}
          className={'flex-1 cursor-pointer text-center p-3'+(mode === 'gallery' ? ' border-b text-lg font-semibold' : '')}>
            <FontAwesomeIcon icon={byPrefixAndName.fas['camera']} className='mr-1' />
            Gallery
        </div>
        <div onClick={() => setMode('description')}
          className={'flex-1 cursor-pointer text-center p-3'+(mode === 'description' ? ' border-b text-lg font-semibold' : '')}>
            <FontAwesomeIcon icon={byPrefixAndName.fas['book']} className='mr-1' />
            Description
        </div>
      </div>

      {mode === 'status' &&
        <>
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
      }

      {mode === 'gallery' &&
        <UserModelGallery
          userModel={props.user_model}
          userImages={props.user_images} />
      }

      {mode === 'description' &&
        <div className='mh-[400px] text-center align-middle'>
          DESCRIPTION
        </div>
      }
    </div>
  );
};

export default MyCollectionUserModel;
