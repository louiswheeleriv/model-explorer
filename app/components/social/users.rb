module Social
  class Users < ReactComponent
    def initialize(raw_props = {})
      super('Users', raw_props: raw_props)
    end
  
    def props
      users = ::User.all.order(display_name: :asc, username: :asc)
      raw_props.merge(
        users: users.map(&:to_safe_attributes),
        profile_picture_by_user_id:
          ::UserImage
            .where(id: users.pluck(:profile_picture_id))
            .group_by(&:user_id)
            .transform_values(&:first),
        num_by_status_by_user_id:
          ::UserModel
            .where(user_id: users.pluck(:id))
            .group(:user_id)
            .pluck('user_id, sum(qty_unassembled), sum(qty_assembled), sum(qty_in_progress), sum(qty_finished)')
            .map do |user_id, unassembled, assembled, in_progress, finished|
              [user_id, {
                unassembled: unassembled,
                assembled: assembled,
                in_progress: in_progress,
                finished: finished
              }]
            end.to_h
      )
    end
  end  
end
