module Collection
  class AddFactionModal < ReactComponent
    def initialize(raw_props = {})
      super('AddFactionModal', raw_props: raw_props)
    end

    def props
      raw_props.merge(
        all_game_systems: ::GameSystem.all,
        all_factions: ::Faction.all
      )
    end
  end
end
