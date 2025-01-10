module Social
  class Index < ReactComponent
    def initialize(raw_props = {})
      super('Social', raw_props: raw_props)
    end
  
    def props
      raw_props.merge(
        posts: ::Post.all.order(created_at: :desc)
      )
    end
  end  
end
