class PersonalInfo {
  constructor(name = 'Elisa', lastName = 'Fernandes', email = '', gender = null, phone = '+52 1 443 457 2562', birthday = null, address = '', area = '', proffesion = '', especiality = '', atentionZone = '', description = '', url = '', instagram = '') {
    this.name = name
    this.lastName = lastName
    this.phone = phone
    this.email = email
    this.gender = gender
    this.birthday = birthday
    this.address = address
  }
}

export default PersonalInfo
