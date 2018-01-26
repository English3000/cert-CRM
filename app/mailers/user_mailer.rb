class UserMailer < ApplicationMailer
  default from: 'welcome@cert.crm'

  def welcome_email(user)
    # attachments['file.jpg'] = File.read('../assets/images/file.jpg')
    @user = user
    # @url = 'localhost:3000'
    @url = 'http://cert-crm.herokuapp.com/#/'
    #        v-- & user.name
    mail(to: user.email, subject: 'Welcome to Cert CRM!') #attachments: attachments
  end
end
