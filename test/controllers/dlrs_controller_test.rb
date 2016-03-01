require 'test_helper'

class DlrsControllerTest < ActionController::TestCase
  setup do
    @dlr = dlrs(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:dlrs)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create dlr" do
    assert_difference('Dlr.count') do
      post :create, dlr: { to: @dlr.to }
    end

    assert_redirected_to dlr_path(assigns(:dlr))
  end

  test "should show dlr" do
    get :show, id: @dlr
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @dlr
    assert_response :success
  end

  test "should update dlr" do
    patch :update, id: @dlr, dlr: { to: @dlr.to }
    assert_redirected_to dlr_path(assigns(:dlr))
  end

  test "should destroy dlr" do
    assert_difference('Dlr.count', -1) do
      delete :destroy, id: @dlr
    end

    assert_redirected_to dlrs_path
  end
end
