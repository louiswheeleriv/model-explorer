class FactionsTable < ReactComponent
  def initialize(raw_props)
    super('FactionsTable', raw_props: raw_props)
  end

  def props
    raw_props.merge(
      extra: 'set in server ruby code',
      factions: ::Faction.all
      # factions: [
      #   [1, 'One'],
      #   [2, 'Two'],
      #   [3, 'Three']
      # ]
    )
  end
end