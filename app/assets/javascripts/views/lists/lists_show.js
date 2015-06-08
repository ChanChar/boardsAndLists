TrelloClone.Views.ListShow = Backbone.CompositeView.extend({

  template: JST['lists/show'],

  className: 'list',
  tagName: 'div',

  initialize: function () {
    this.cards = this.model.cards();

    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.cards, 'add', this.addCardView);
    this.listenTo(this.cards, 'remove', this.removeCardView);

    this.cards.each(this.addCardView.bind(this));
  },

  events: {
    'submit form.add-card': 'addCard',
  },

  render: function () {
    this.$el.html(this.template({ list: this.model }));
    this.attachSubviews();
    return this;
  },

  addCardView: function (card) {
    var cardSubview = new TrelloClone.Views.CardShow({ model: card });
    this.addSubview('div.cards', cardSubview);
  },

  removeCardView: function (card) {
    this.removeModelSubview('div.cards', card);
  },

  addCard: function (event) {
    event.preventDefault();

    var cardContent = $(event.currentTarget).serializeJSON();
    var newCard = new TrelloClone.Models.Card(cardContent);
    newCard.save({}, {
      success: function () {
        var boardPath = '#boards/' + this.model.id;
        Backbone.history.navigate('dummyDivert');
        Backbone.history.navigate(boardPath, { trigger: true });
      }.bind(this)
    });
  },

});
