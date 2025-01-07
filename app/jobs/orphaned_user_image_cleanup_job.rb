class OrphanedUserImageCleanupJob
  def perform
    Rails.logger.info("Cleaning up orphaned UserImages")
    count = 0
    UserImage
      .where
      .not(id: UserImageAssociation.distinct.pluck(:user_image_id))
      .find_each do |user_image|
        count += 1
        user_image.destroy!
      end
    Rails.logger.info("Cleaned up #{count} orphaned UserImages")
  end
end