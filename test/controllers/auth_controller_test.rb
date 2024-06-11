require "test_helper"

class AuthControllerTest < ActionDispatch::IntegrationTest
  test "should get show_sign_in" do
    get auth_show_sign_in_url
    assert_response :success
  end

  test "should get show_sign_up" do
    get auth_show_sign_up_url
    assert_response :success
  end

  test "should get show_sign_out" do
    get auth_show_sign_out_url
    assert_response :success
  end
end
