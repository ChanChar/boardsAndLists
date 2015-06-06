TrelloClone.Models.List = Backbone.Model.extend({
  urlRoot: 'api/lists',

  parse: function (response) {
    console.log('coming from bb list model');
    if (response.lists.cards) {
      this.cards().set(response.lists.cards);
      delete response.lists.cards;
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
