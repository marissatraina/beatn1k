class UploadsController < ApplicationController
  def index
    if Upload.all.length > 0
      @upload = Upload.find(1)
      redirect_to @upload
    else
      if !logged_in
        @user = User.new
        render 'users/login'
      else
        render 'uploads/new'
      end
    end
  end

  def show
    @upload = Upload.find(params[:id])
    render 'uploads/show'
  end

  def new
    if !logged_in
      @user = User.new
      render 'users/login'
    else
      @upload = Upload.new
      render 'uploads/new'
    end
  end

  def edit
    @upload = Upload.find(params[:id])
  end

  def create
    @upload = Upload.new(title: params[:upload][:title],
                            file_name: params[:upload][:file_info].original_filename,
                            user_id: current_user.id)
    if @upload.save
      File.open("public/uploads/" + params[:upload][:file_info].original_filename, "wb") do |file|
        file.write(params[:upload][:file_info].tempfile.read)
      end
      redirect_to @upload
    else
      @errors = @upload.errors.full_messages
      render 'new_upload'
    end
  end

  def update
    @upload = Upload.find(params[:upload][:id])
    if @upload.update(upload_params)
      redirect_to @upload
    else
      @errors = @upload.errors.full_messages
      render 'edit_upload'
    end
  end

  def destroy
    @upload = Upload.find(params[:id])
    @upload.destroy(params[:id])
    File.delete("public/uploads/" + @upload.file_name) if File.exist?("public/uploads/" + @upload.file_name)
    redirect_to uploads_path
  end

private

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
