class TopNavBar < ReactComponent
  def initialize(raw_props)
    super('TopNavBar', raw_props: raw_props)
  end

  def props
    user = current_user
    raw_props.merge(
      current_user: user&.to_safe_attributes,
      current_user_profile_picture_url: user&.profile_picture&.url
    )
  end
end