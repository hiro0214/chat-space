json.name current_user.name
json.data @message.created_at.strftime("%Y/%m/%d %H:%M")
json.content @message.content
json.image @message.image