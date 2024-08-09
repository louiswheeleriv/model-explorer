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

end