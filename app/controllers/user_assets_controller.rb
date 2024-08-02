class UserAssetsController < ApplicationController

  def uploadable_url
    require_logged_in!

    s3 = Aws::S3::Client.new(
      region: Rails.configuration.x.aws.region,
      access_key_id: Rails.configuration.x.aws.access_key_id,
      secret_access_key: Rails.configuration.x.aws.secret_access_key
    )
    signer = Aws::S3::Presigner.new(client: s3)
    url = signer.presigned_url(
      :put_object,
      bucket: Rails.configuration.x.aws.s3_bucket_name,
      key: "asset-#{SecureRandom.uuid}"
    )
    render status: 200, json: { status: 200, presigned_url: url }
  end

  def create
    require_logged_in!

    asset_url = params[:asset_url]
    return render status: 400, json: { status: 400, error: "Parameter asset_url is required." } unless asset_url

    user_model_id = params[:user_model_id]
    user_model = ::UserModel.find_by(id: user_model_id)
    return render status: 400, json: { status: 400, error: "UserModel #{user_model_id} not found." } unless user_model

    user_image = ::UserImage.create(
      user_id: current_user_id,
      url: asset_url
    )

    ::UserModelImageAssociation.create(
      user_id: current_user_id,
      user_image: user_image,
      user_model: user_model
    )

    render status: 200, json: { status: 200, user_image: user_image.attributes }
  end

end