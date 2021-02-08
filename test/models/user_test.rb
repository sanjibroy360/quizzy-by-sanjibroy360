require "test_helper"

class UserTest < ActiveSupport::TestCase
  def setup
    @user = User.new(first_name: "Tony", last_name: "Stark", email: "tony360@gmail.com")
  end

  def test_user_should_be_valid
    assert @user.valid?
  end

  def test_first_name_should_be_present
    @user.first_name = "     "
    assert_not @user.valid?
  end

  def test_last_name_should_be_present
    @user.last_name = "     "
    assert_not @user.valid?
  end

  def test_email_should_be_present
    @user.email = "     "
    assert_not @user.valid?
  end

  def test_first_name_should_not_be_too_long
    @user.first_name = "a" * 51
    assert_not @user.valid?
  end

  def test_last_name_should_not_be_too_long
    @user.last_name = "a" * 51
    assert_not @user.valid?
  end

  def test_email_should_be_unique
    duplicate_user = @user.dup
    @user.save
    assert_not duplicate_user.valid?
  end

  def test_email_should_be_saved_as_lowercase
    mixed_case_email = "tOnY360@gmail.com"
    @user.email = mixed_case_email
    @user.save
    assert_equal mixed_case_email.downcase, @user.reload.email
  end

  def test_invalid_email_should_not_be_accepted
    invalid_emai = "tony360@gmail,com"
    @user.email = invalid_emai
    assert_not @user.valid?
  end

  def test_valid_email_should_be_accepted
    @user.email = "hello4world007@gmail.com"
    assert @user.valid?
  end

  def test_email_should_not_be_case_sensitive
    uppercase_email = "SAM@example.com"
    lowercase_email = uppercase_email.downcase

    duplicate_user = User.new(first_name: "Virat", last_name: "Kohli", email: lowercase_email)
    @user.email = uppercase_email

    @user.save
    assert_not duplicate_user.valid?
  end

  def test_first_name_should_not_be_null
    @user.first_name = nil
    assert_not @user.valid?
  end

  def test_last_name_should_not_be_null
    @user.last_name = nil
    assert_not @user.valid?
  end

  def test_email_should_not_be_null
    @user.email = nil
    assert_not @user.valid?
  end
end
