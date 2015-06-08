TrelloClone.Models.List = Backbone.Model.extend({
  urlRoot: 'api/lists',

  parse: function (response) {
    if (response.cards) {
      this.cards().set(response.cards);
      delete response.cards;
    }

    return response;
  },

  cards: function () {
    if (!this._cards) {
      this._cards = new TrelloClone.Collections.Cards([], { list: this });
    }

    return this._cards;
  }

});
