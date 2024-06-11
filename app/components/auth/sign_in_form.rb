module Auth
  class SignInForm < ReactComponent
    def initialize(raw_props = {})
      super('SignInForm', raw_props: raw_props)
    end

    def props
      raw_props
    end
  end
end