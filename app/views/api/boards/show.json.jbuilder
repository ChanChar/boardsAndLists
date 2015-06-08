# write some jbuilder to return some json about a board
# it should include the board
#  - its lists
#    - the cards for each list

json.call(@board, :title, :created_at, :updated_at)
json.lists do
  json.array!(@board.lists) do |json, list|
    json.call(list, :id, :title, :board_id, :ord, :created_at, :updated_at)

    json.cards list.cards do |card_json, card|
      card_json.call(card, :id, :title)
    end
  end
end
