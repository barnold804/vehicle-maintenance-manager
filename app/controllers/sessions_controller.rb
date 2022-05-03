class SessionsController < ApplicationController

    def create
        user = User.find_by(email_address: params[:emailAddress])
        if user&.authenticate(params[:password])
          session[:user_id] = user.id
          render json: user, status: :created
        else
          render json: { errors: ["Incorrect email or password!"] }, status: :unauthorized
        end
      end
    
      def destroy
        session.delete :user_id
        head :no_content
      end   

end
