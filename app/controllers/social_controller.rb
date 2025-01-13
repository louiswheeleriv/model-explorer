class SocialController < ApplicationController

  DEFAULT_POSTS_PAGE_SIZE = 10

  def index
  end
  
  def users
  end

  def show_user
  end

  def posts
    where = {}
    if params[:filter] == 'following'
      where[:user_id] =
        UserFollow
          .where(following_user_id: current_user_id)
          .distinct
          .pluck(:followed_user_id)
    elsif params[:filter] == 'mine'
      where[:user_id] = current_user_id
    end
    posts =
      ::Post
        .where(where)
        .paginate(
          page: params[:page] || 1,
          per_page: params[:per_page] || DEFAULT_POSTS_PAGE_SIZE
        )
        .order(created_at: :desc)
        .map(&method(:post_data))
    render status: 200, json: { status: 200, posts: posts }
  end

  def post_comments
    render status: 200,
      json: {
        status: 200,
        post_comments: load_post_comments(::Post.find(params[:post_id]))
      }
  end

  def toggle_post_reaction
    raise_unauthorized_unless_logged_in!

    post = ::Post.find(params[:post_id])
    attrs = {
      post_id: post.id,
      user_id: current_user_id,
      reaction: params[:reaction]
    }
    if params[:toggle] != 'false'
      ::PostReaction.find_or_create_by(attrs)
    else
      ::PostReaction.find_by(attrs)&.destroy!
    end
    render status: 200, json: {
      status: 200,
      post_reactions: load_post_reactions(post)
    }
  rescue UnauthorizedError
    render status: 401, json: { status: 401, error: 'Unauthorized' }
  end

  def toggle_post_comment_reaction
    raise_unauthorized_unless_logged_in!

    comment = ::PostComment.find(params[:post_comment_id])
    attrs = {
      post_comment_id: comment.id,
      user_id: current_user_id,
      reaction: params[:reaction]
    }
    if params[:toggle] != 'false'
      ::PostReaction.find_or_create_by(attrs)
    else
      ::PostReaction.find_by(attrs)&.destroy!
    end
    render status: 200, json: {
      status: 200,
      post_comment_reactions: load_post_comment_reactions(comment)
    }
  rescue UnauthorizedError
    render status: 401, json: { status: 401, error: 'Unauthorized' }
  end

  def create_post
    raise_unauthorized_unless_logged_in!

    ActiveRecord::Base.transaction do
      post = ::Post.create!(
        user_id: current_user_id,
        body: params[:body]
      )

      (params[:image_urls] || []).each_with_index do |image_url, index|
        image = ::UserImage.create!(
          user_id: current_user_id,
          url: image_url
        )
        ::UserImageAssociation.create!(
          user_id: current_user_id,
          user_image_id: image.id,
          post_id: post.id,
          sort_index: index
        )
      end  

      render status: 200, json: {
        status: 200,
        post: post_data(post)
      }
    end
  rescue UnauthorizedError
    render status: 401, json: { status: 401, error: 'Unauthorized' }
  end

  def delete_post
    raise_unauthorized_unless_logged_in!

    post = ::Post.find(params[:post_id])
    return render status: 403, json: { status: 403, error: 'You did not create this post.' } unless post.user_id == current_user_id

    post.destroy!
    render status: 200, json: { status: 200 }
  rescue UnauthorizedError
    render status: 401, json: { status: 401, error: 'Unauthorized' }
  end

  def delete_post_comment
    raise_unauthorized_unless_logged_in!

    comment = ::PostComment.find(params[:post_comment_id])
    return render status: 403, json: { status: 403, error: 'You did not create this comment.' } unless comment.user_id == current_user_id

    comment.destroy!
    render status: 200, json: { status: 200 }
  rescue UnauthorizedError
    render status: 401, json: { status: 401, error: 'Unauthorized' }
  end

  def create_post_comment
    raise_unauthorized_unless_logged_in!

    ::PostComment.create!(
      user_id: current_user_id,
      post_id: params[:post_id],
      body: params[:body]
    )
    render status: 200, json: {
      status: 200,
      post_comments: load_post_comments(::Post.find(params[:post_id]))
    }
  rescue UnauthorizedError
    render status: 401, json: { status: 401, error: 'Unauthorized' }
  end

  private

  def post_data(post)
    {
      post: post,
      user: post.user,
      profile_picture: post.user.profile_picture,
      post_comments: load_post_comments(post),
      post_reactions: load_post_reactions(post),
      user_images: post.user_images,
      user_models: post.user_models
    }
  end

  def load_post_comments(post)
    post
      .post_comments
      .joins(:user)
      .joins('LEFT OUTER JOIN user_images ON user_images.id = users.profile_picture_id')
      .select([
        PostComment.column_names,
        'users.display_name as user_display_name',
        'users.username as user_username',
        'user_images.url as user_profile_picture_url'
      ].flatten)
      .order(created_at: :asc)
      .map do |post_comment|
        post_comment.attributes.merge(
          post_comment_reactions: load_post_comment_reactions(post_comment)
        )
      end
  end

  def load_post_reactions(post)
    post
      .post_reactions
      .joins(:user)
      .joins('LEFT OUTER JOIN user_images ON user_images.id = users.profile_picture_id')
      .select([
        PostReaction.column_names,
        'users.display_name as user_display_name',
        'users.username as user_username',
        'user_images.url as user_profile_picture_url'
      ].flatten)
      .order(created_at: :asc)
  end

  def load_post_comment_reactions(post_comment)
    post_comment
      .post_reactions
      .joins(:user)
      .joins('LEFT OUTER JOIN user_images ON user_images.id = users.profile_picture_id')
      .select([
        PostReaction.column_names,
        'users.display_name as user_display_name',
        'users.username as user_username',
        'user_images.url as user_profile_picture_url'
      ])
      .order(created_at: :asc)
  end

end
