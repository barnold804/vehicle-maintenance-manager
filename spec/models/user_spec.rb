require 'rails_helper'

RSpec.describe User, type: :model do
  describe '#name' do
  
    it 'validates presence' do
      record = User.new
      record.name = '' # invalid state
      record.validate 
      expect(record.errors[:name]).to include("can't be blank") # check for presence of error

      record.name = 'Bob' # valid state
      record.validate 
      expect(record.errors[:name]).to_not include("can't be blank") # check for absence of error
    end
  end
end
