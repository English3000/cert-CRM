require 'rails_helper'

RSpec.describe User, type: :model do
  describe 'model tests' do
    it { should validate_presence_of(:name) }
    it { should validate_presence_of(:email) }
    it { should validate_presence_of(:password_digest) }

    it { should have_many(:certificates) }
  end
end
