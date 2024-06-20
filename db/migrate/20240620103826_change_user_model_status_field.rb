class ChangeUserModelStatusField < ActiveRecord::Migration[7.1]
  def change
    add_column :user_models, :qty_unassembled, :integer, null: false, default: 0
    add_column :user_models, :qty_assembled, :integer, null: false, default: 0
    add_column :user_models, :qty_in_progress, :integer, null: false, default: 0
    add_column :user_models, :qty_finished, :integer, null: false, default: 0

    change_column_null :user_models, :status, true
    change_column_null :user_models, :quantity, true

    UserModel.distinct.pluck(:user_id).each do |user_id|
      UserModel.where(user_id: user_id).distinct.pluck(:model_id).each do |model_id|
        user_models = UserModel.where(user_id: user_id, model_id: model_id).where.not(status: nil)

        num_by_status = user_models.reduce(
          { unassembled: 0, assembled: 0, in_progress: 0, finished: 0 }
        ) do |acc, user_model|
          acc[user_model.status.to_sym] += user_model.quantity
          acc
        end
        UserModel.create(
          user_id: user_id,
          model_id: model_id,
          qty_unassembled: num_by_status[:unassembled],
          qty_assembled: num_by_status[:assembled],
          qty_in_progress: num_by_status[:in_progress],
          qty_finished: num_by_status[:finished]
        )
        user_models.destroy_all
      end
    end

    remove_column :user_models, :status, :string
    remove_column :user_models, :quantity, :integer
  end
end
