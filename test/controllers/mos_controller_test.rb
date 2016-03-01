require 'test_helper'

class MosControllerTest < ActionController::TestCase
  setup do
    @mo = mos(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:mos)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create mo" do
    assert_difference('Mo.count') do
      post :create, mo: { status: @mo.status }
    end

    assert_redirected_to mo_path(assigns(:mo))
  end

  test "should show mo" do
    get :show, id: @mo
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @mo
    assert_response :success
  end

  test "should update mo" do
    patch :update, id: @mo, mo: { status: @mo.status }
    assert_redirected_to mo_path(assigns(:mo))
  end

  test "should destroy mo" do
    assert_difference('Mo.count', -1) do
      delete :destroy, id: @mo
    end

    assert_redirected_to mos_path
  end
end
