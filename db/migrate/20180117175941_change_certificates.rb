class ChangeCertificates < ActiveRecord::Migration[5.1]
  def change
    remove_column :certificates, :active?
    add_column :certificates, :active?, :boolean, null: false, default: true
  end
end
