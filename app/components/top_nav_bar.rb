class TopNavBar < ReactComponent
  def initialize(raw_props)
    super('TopNavBar', raw_props: raw_props)
  end

  def props
    raw_props.merge(
      extra: 'set in server ruby code',
      current_user: current_user_id ? User.find_by(id: current_user_id) : nil
    )
  end
end