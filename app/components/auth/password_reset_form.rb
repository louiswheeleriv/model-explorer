module Auth
  class PasswordResetForm < ReactComponent
    def initialize(raw_props = {})
      super('PasswordResetForm', raw_props: raw_props)
    end

    def props
      password_reset_code = params[:code]
      user = User.find_by(password_reset_code: password_reset_code)

      raw_props.merge(
        password_reset_code: password_reset_code,
        password_reset_code_found: user.present?,
        password_reset_code_valid: user&.password_reset_code_valid_until&.future?,
        username: user&.username
      )
    end
  end
end