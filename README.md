# README

## userテーブル
|Column|Type|Options|
|------|----|-------|
|nickname|string|null: false|
|email|string|null: false|
|password|string|null: false|

### Association
- has_many :messages
- has_many :group, through: :user_groups


## messagesテーブル
|Colum|Type|Options|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group


## groupテーブル
|Colum|Type|Options|
|group_name|string|null: false|
|messages_id|integer|null: false,foreign_key: true|
|user_group_id|integer|null: false,foreign_key: true|

### Association
-has_many :messages
-has_many :user, through: :user_groups


##user_groupsテーブル
|Colum|Type|Options|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
-belongs_to :user
-belongs_to :group