module Auth
  class SignUpForm < ReactComponent
    def initialize(raw_props = {})
      super('SignUpForm', raw_props: raw_props)
    end

    def props
      raw_props
    end
  end
end