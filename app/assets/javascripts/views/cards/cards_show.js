TrelloClone.Views.CardShow = Backbone.CompositeView.extend({

  template: JST['cards/show'],

  tagName: 'div',
  className: 'card-item',

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  events: {
    'click button.card-delete': 'deleteCard',
  },

  render: function () {
    var cardContent = this.template({ card: this.model });
    this.$el.html(cardContent);
    return this;
  },

  deleteCard: function (event) {
    event.preventDefault();
    this.remove();
    this.model.destroy();
  }

});
