require "test_helper"

class UserTest < ActiveSupport::TestCase
  def setup
    @user = User.new(first_name: "Tony", last_name: "Stark", email: "tony360@gmail.com", role: 1, password: "password1234", password_confirmation: "password1234")
  end

  def test_user_should_be_valid
    assert @user.valid?
  end

  def test_first_name_should_be_present
    @user.first_name = "     "
    assert_not @user.valid?
    assert_equal ["First name can't be blank"], @user.errors.full_messages
  end

  def test_last_name_should_be_present
    @user.last_name = "     "
    assert_not @user.valid?
    assert_equal ["Last name can't be blank"], @user.errors.full_messages
  end

  def test_email_should_be_present
    @user.email = "     "
    assert_not @user.valid?
    assert_equal ["Email is invalid"], @user.errors.full_messages
  end

  def test_first_name_should_not_be_too_long
    @user.first_name = "a" * 51
    assert_not @user.valid?
    assert_equal ["First name is too long (maximum is 50 characters)"], @user.errors.full_messages
  end

  def test_last_name_should_not_be_too_long
    @user.last_name = "a" * 51
    assert_not @user.valid?
    assert_equal ["Last name is too long (maximum is 50 characters)"], @user.errors.full_messages
  end

  def test_email_should_be_unique
    duplicate_user = @user.dup
    @user.save
    assert_not duplicate_user.valid?
    assert_equal ["Email has already been taken"], duplicate_user.errors.full_messages
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
    assert_equal ["Email is invalid"], @user.errors.full_messages
  end

  def test_valid_email_should_be_accepted
    @user.email = "hello4world007@gmail.com"
    assert @user.valid?
  end

  def test_email_should_not_be_case_sensitive
    uppercase_email = "SAM@example.com"
    lowercase_email = uppercase_email.downcase

    duplicate_user = User.new(first_name: "Virat", last_name: "Kohli", email: lowercase_email, password: "password1234", password_confirmation: "password1234")
    @user.email = uppercase_email

    @user.save
    assert_not duplicate_user.valid?
    assert_equal ["Email has already been taken"], duplicate_user.errors.full_messages
  end

  def test_first_name_should_not_be_null
    @user.first_name = nil
    assert_not @user.valid?
    assert_equal ["First name can't be blank"], @user.errors.full_messages
  end

  def test_last_name_should_not_be_null
    @user.last_name = nil
    assert_not @user.valid?
    assert_equal ["Last name can't be blank"], @user.errors.full_messages
  end

  def test_email_should_not_be_null
    @user.email = nil
    assert_not @user.valid?
    assert_equal ["Email is invalid"], @user.errors.full_messages
  end

  def test_user_should_not_have_a_invalid_role
    assert_raises ArgumentError do
      @user.role = 55
      assert_not @user.valid?
    end
  end

  def test_administrator_should_be_a_valid_role
    @user.role = 1
    assert @user.administrator?
    assert @user.valid?
  end

  def test_standard_should_be_a_valid_role
    @user.role = 0
    assert @user.standard?
    assert @user.valid?
  end

  def test_password_should_not_be_blank
    @user.password = @user.password_confirmation = " " * 8
    assert_not @user.valid?
    assert_equal ["Password can't be blank"], @user.errors.full_messages
  end

  def test_password_should_not_be_too_short
    @user.password = @user.password_confirmation = "a" * 3
    assert_not @user.valid?
    assert_equal ["Password is too short (minimum is 6 characters)"], @user.errors.full_messages
  end

  def test_password_and_password_confirmation_should_match
    @user.password = "password"
    @user.password_confirmation = "wrong_password"
    assert_not @user.valid?
    assert_equal ["Password confirmation doesn't match Password"], @user.errors.full_messages
  end
end
