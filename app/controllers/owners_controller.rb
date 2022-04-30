class OwnersController < ApplicationController

rescue_from ActiveRecord::RecordInvalid,with: :render_unprocessable_entity
rescue_from ActiveRecord::RecordNotFound,with: :render_not_found

    def index
        owners = Owner.all
        render json: owners
    end
    
    def create
        owner = Owner.create(owner_params)
        if owner.valid?
            session[:owner_id] = owner.id
            render json: owner, status: :created
        else
            render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def show
        owner = Owner.find_by(id: session[:owner_id])
        if owner
          render json: owner
        else
          render json: {error: "Not authorized"}, status: :unauthorized
        end
    end

    def update
        owner = Owner.find_by(id: session[:owner_id])
        owner.update(owner_params)
        render json: owner
    end

    def destroy
        owner = Owner.find_by(id: session[:owner_id])
        owner.edits.update_all(owner_id:nil)
        owner.destroy
        session.delete :owner_id
        head :no_content
    end

    private

    def owner_params
      params.permit(:name, :email, :password)
    end

end
