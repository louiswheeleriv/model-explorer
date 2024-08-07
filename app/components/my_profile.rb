class MyProfile < ReactComponent
  def initialize(raw_props = {})
    super('MyProfile', raw_props: raw_props)
  end

  def props
    user = ::User.find_by(id: current_user_id)
    raw_props.merge(
      user: user&.to_safe_attributes,
      user_password_length: user.password_length,
      user_profile_picture: user.profile_picture
    )
  end
end
