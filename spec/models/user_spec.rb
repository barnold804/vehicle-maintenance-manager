require 'rails_helper'

RSpec.describe User, type: :model do
  let(:subject) { build(:user) }
  
  context 'valid' do
    
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

    context 'valid' do

      context 'name' do
        context 'is_empty' do
          let(:subject) { build(:user, name: nil) }
          it 'is invalid' do
            expect(subject.valid?).to eq(false)
            expect(subject.errors.full_messages).to include("Name can't be blank")
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
end
