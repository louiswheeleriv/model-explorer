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
  name: string;
  quantity: number;
  status: string;
};

export type User = {
  id: number;
  username: string;
  email: string;
}

export type UserFaction = {
  id: number;
  user_id: number;
  faction_id: number;
}
