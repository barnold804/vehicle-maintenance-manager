require 'rails_helper'

RSpec.describe User, type: :model do
  let(:subject) { build(:user) }
  
  context 'valid' do
    
    # context 'name' do
      
    # end
    
    context 'email_address' do
      context 'is_empty' do
        let(:subject) { build(:user, email_address: nil) }
        it 'is invalid' do
          expect(subject.valid?).to eq(false)
          expect(subject.errors.full_messages).to include("Email address can't be blank")
        end
      end

      context 'is_not_empty' do
        let(:subject) { build(:user) }
        it 'is valid' do
          expect(subject.valid?).to eq(true)
        end
      end
    end
  end
end
  
    # it 'validates presence' do
    #   record = User.new
    #   record.name = '' # invalid state
    #   record.validate 
    #   expect(record.errors[:name]).to include("can't be blank") # check for presence of error

    #   record.name = 'Bob' # valid state
    #   record.validate 
    #   expect(record.errors[:name]).to_not include("can't be blank") # check for absence of error
    # end
