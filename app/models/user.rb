class User < ApplicationRecord
  validates :email, :session_token, presence: true, uniqueness: true
  validates :name, :password_digest, :admin?, presence: true
  validates :password, length: {minimum: 8, allow_nil: true}

  has_many :certificates, dependent: :destroy

  after_initialize :ensure_token
  def ensure_token
    self.session_token ||= SecureRandom::urlsafe_base64(16)
  end

  def reset_token
    self.session_token = SecureRandom::urlsafe_base64(16)
    self.save
    self.session_token
  end

  attr_reader :password
  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def password_match?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)
    user && user.password_match?(password) ? user : nil
  end
end
