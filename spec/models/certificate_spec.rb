require 'rails_helper'

RSpec.describe Certificate, type: :model do
  it { should validate_presence_of(:private_key) }
  it { should validate_presence_of(:body) }
  it { should validate_inclusion_of(:active?).in_array([true, false]) }

  it { should belong_to(:user) }
end
