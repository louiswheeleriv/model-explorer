module Social
  class Index < ReactComponent
    def initialize(raw_props = {})
      super('Social', raw_props: raw_props)
    end
  
    def props
      raw_props.merge(
        current_user: current_user&.to_safe_attributes,
        current_user_profile_picture_url: current_user&.profile_picture&.url
      )
    end
  end  
end
