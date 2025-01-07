class S3Client

  attr_reader :bucket

  def initialize(bucket: Rails.configuration.x.aws.s3_bucket_name)
    @bucket = bucket
  end

  def delete_object(key)
    client.delete_object(bucket: bucket, key: key)
  rescue Aws::S3::Errors::NoSuchKey
    nil
  end

  private

  def client
    @client ||= Aws::S3::Client.new(
      region: Rails.configuration.x.aws.region,
      access_key_id: Rails.configuration.x.aws.access_key_id,
      secret_access_key: Rails.configuration.x.aws.secret_access_key
    )
  end
end