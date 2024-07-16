import React, { Fragment, useEffect, useState } from "react";
import { Faction, Model, QuantityByStatus, UserFaction, UserModel, UserModelGroup } from "../types/models";
import SummaryProgressBar from "../common/SummaryProgressBar";
import Button from "../common/Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { byPrefixAndName } from '@awesome.me/kit-902717d512/icons';
import { apiCall, countByStatus } from "../utils/helpers";
import UserModelStatusEditor from "../common/UserModelStatusEditor";

type Props = {
  faction: Faction;
  user_faction: UserFaction;
  model: Model;
  user_model: UserModel;
  user_model_groups: UserModelGroup[];
}

const MyCollectionUserModel = (props: Props) => {
  const numByStatus = countByStatus([props.user_model]);
  const initialDraftQuantityByStatus = {
    unassembled: numByStatus.unassembled,
    assembled: numByStatus.assembled,
    in_progress: numByStatus.in_progress,
    finished: numByStatus.finished
  };
  const [draftQuantityByStatus, setDraftQuantityByStatus] = useState<QuantityByStatus>(initialDraftQuantityByStatus);
  const [valueByLabel, setValueByLabel] = useState<Record<string, string | number>>({});
  const [error, setError] = useState('');
  // if (props.user_models.length === 0) numByStatus = { unassembled: 1, assembled: 0, in_progress: 0, finished: 0 };

  const userModelDisplayName = props.user_model.name ? props.user_model.name+' ('+props.model.name+')' : props.model.name;

  // function switchToManageGroupsView() { setMode('groups') }
  // function switchToModelsView() { location.reload() }

  // async function uploadImage() {
  //   try {
  //     const presignedUrl = await getPresignedUrl();
  //     const assetUrl = await uploadAssetToS3(presignedUrl);
  //     await createImage(assetUrl);
  //   } catch(err) {
  //     if (err instanceof Error) setError(err.message);
  //   }
  // }

  // async function getPresignedUrl(): Promise<string> {
  //   return apiCall({
  //     endpoint: '/user_assets/upload',
  //     method: 'GET'
  //   })
  //     .then((response) => response.json())
  //     .then((body) => {
  //       if (body.status >= 300) throw new Error(body.error)
  //       return body.presigned_url;
  //     });
  // }

  // async function uploadAssetToS3(presignedUrl: string) {
  //   const response = await fetch(presignedUrl, {
  //     method: 'PUT',
  //     headers: { 'Content-Type': 'multipart/form-data' },
  //     body: selectedImage
  //   });
  //   return response.url.split('?')[0];
  // }

  // async function createImage(assetUrl: string) {
  //   apiCall({
  //     endpoint: '/user_assets/upload',
  //     method: 'POST',
  //     body: {
  //       asset_url: assetUrl,
  //       user_model_id: props.userModel.id
  //     }
  //   })
  //     .then((response) => response.json())
  //     .then((body) => {
  //       if (body.status >= 300) throw new Error(body.error)
  //       location.reload();
  //     });
  // }

  // async function handleFileSelected(e: React.ChangeEvent<HTMLInputElement>) {
  //   const selectedFiles = e.target.files as FileList;
  //   setSelectedImage(selectedFiles?.[0])
  // }

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


      {/* Example for file upload */}
      {/* <div className='flex items-center mt-5'>
        <label htmlFor="myfile">Select image:</label>
        <input type="file" id="myfile" name="myfile" accept="image/*" onChange={handleFileSelected} />

        <Button onClick={uploadImage} className='max-w-[170px] mx-auto'>
          <FontAwesomeIcon icon={byPrefixAndName.fas['paintbrush-fine']} className='mr-2' />
          Upload
        </Button>
      </div> */}
    </div>
  );
};

export default MyCollectionUserModel;
