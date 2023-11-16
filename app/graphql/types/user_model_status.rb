# frozen_string_literal: true

module Types
  class UserModelStatus < BaseEnum
    ::UserModel.statuses.each do |status_str, status_int|
      value status_str.upcase, value: status_str
    end
  end
end
