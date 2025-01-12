class AddPostCommentIdToPostReactions < ActiveRecord::Migration[7.1]
  def up
    change_column_null :post_reactions, :post_id, true
    add_column :post_reactions, :post_comment_id, :integer

    remove_index :post_reactions,
      name: :index_post_reactions_on_post_id_and_reaction
    add_index :post_reactions,
      [:post_id, :reaction, :user_id],
      unique: true,
      name: :index_post_reactions_on_post_id_reaction_id_user_id
    add_index :post_reactions,
      [:post_comment_id, :reaction, :user_id],
      unique: true,
      name: :index_post_reactions_on_comment_id_reaction_id_user_id
  end

  def down
    remove_index :post_reactions, name: :index_post_reactions_on_post_id_reaction_id_user_id
    remove_index :post_reactions, name: :index_post_reactions_on_comment_id_reaction_id_user_id
    add_index :post_reactions,
      [:post_id, :reaction],
      name: :index_post_reactions_on_post_id_and_reaction
    remove_column :post_reactions, :post_comment_id
    change_column_null :post_reactions, :post_id, false
  end
end
