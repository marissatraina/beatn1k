module ApplicationHelper
  def logged_in
    !!session[:user_id]
  end

  def current_user
    current_user ||= User.find(session[:user_id])
  end

  def extension(file_name)
    file_name.split(".").last
  end
end
