json.array! @messages do |message|
  json.content message.content
  json.image message.image
  json.data Time.now.strftime("%Y/%m/%d %H:%M")
  json.name message.user.name
  json.id message.id
end