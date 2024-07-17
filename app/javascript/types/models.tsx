export type UserModelStatus = 'unassembled' | 'assembled' | 'in_progress' | 'finished';

export type QuantityByStatus = {
  unassembled: number;
  assembled: number;
  in_progress: number;
  finished: number;
}

export type GameSystem = {
  id: number;
  name: string;
}

export type Faction = {
  id: number;
  game_system_id: number;
  name: string;
};

export type Model = {
  id: number;
  faction_id: number;
  name: string;
};

export type UserModel = {
  id: number;
  user_id: number;
  model_id: number;
  user_faction_id: number;
  user_model_group_id: number;
  name: string;
  qty_unassembled: number;
  qty_assembled: number;
  qty_in_progress: number;
  qty_finished: number;
};

export type UserModelGroup = {
  id: number;
  user_id: number;
  user_faction_id: number;
  name: string;
  sort_index?: number;
};

export type User = {
  id: number;
  username: string;
  display_name: string;
  email: string;
  bio: string;
}

export type UserFaction = {
  id: number;
  user_id: number;
  faction_id: number;
}

export type UserImage = {
  id: number;
  user_id: number;
  url: string;
}
