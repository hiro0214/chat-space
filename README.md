# README

## userテーブル
|Column|Type|Options|
|------|----|-------|
|nickname|string|null: false|
|email|string|null: false|
|password|string|null: false|

### Association
- has_many :messages
- has_many :groups, through: :user_groups


## messagesテーブル
|Column|Type|Options|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group


## groupテーブル
|Column|Type|Options|
|group_name|string|null: false|
|messages_id|integer|null: false, foreign_key: true|
|user_group_id|integer|null: false, foreign_key: true|

### Association
- has_many :messages
- has_many :users, through: :user_groups


##user_groupsテーブル
|Column|Type|Options|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group
