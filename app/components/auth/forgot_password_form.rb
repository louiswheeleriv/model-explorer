module Auth
  class ForgotPasswordForm < ReactComponent
    def initialize(raw_props = {})
      super('ForgotPasswordForm', raw_props: raw_props)
    end

    def props
      raw_props
    end
  end
end