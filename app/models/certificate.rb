class Certificate < ApplicationRecord
  validates :private_key, presence: true, uniqueness: true
  validates :user_id, :body, :active?, presence: true

  belongs_to :user

  after_initialize :setup_cert
  def setup_cert
    self.private_key = SecureRandom::urlsafe_base64
    self[active?] = true
    self
  end
end
