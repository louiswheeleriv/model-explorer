class OrphanedUserImageCleanupJob
  def perform
    Rails.logger.info("Cleaning up orphaned UserImages")
    count = 0

    model_and_faction_image_ids = UserImageAssociation.distinct.pluck(:user_image_id)
    profile_picture_ids = User.distinct.pluck(:profile_picture_id).compact

    UserImage
      .where
      .not(id: (model_and_faction_image_ids + profile_picture_ids).uniq)
      .find_each do |user_image|
        count += 1
        user_image.destroy!
      end
    Rails.logger.info("Cleaned up #{count} orphaned UserImages")
  end
end