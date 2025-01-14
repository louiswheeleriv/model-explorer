module Social
  class Users < ReactComponent
    def initialize(raw_props = {})
      super('Users', raw_props: raw_props)
    end
  
    def props
      raw_props
    end
  end  
end
