exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('gallery').del()
    .then(function () {
      // Inserts seed entries
      return knex('gallery').insert([
        { title: 'Mountain Hill Cabin', image_url: 'https://static1.squarespace.com/static/56609c25e4b054281a226b2f/t/58aa0dd8db29d65028670545/1487539738136/Mountain-Hill-Cabin-by-Fantastic-Norway01.jpg?format=750w', description: 'The project is a winter cabin to be built in a highly restricted area in the mountain landscape of Ål (Norway). The property is situated deep into the mountains and can only be reached by skis during winter. One of the client’s initial wishes was actually to go skiing, sledge riding and winter picnicking on top of the cabin.' },

        { title: 'Stimen', image_url: "https://i.pinimg.com/originals/57/b2/4b/57b24bda6fa250933bf8b20f2d90deaa.jpg", description: "Stimen is a locally anchored tourist destination. The vision is to create a small resort with a variety of public features creating a meeting point between inhabitants and visitors. The public features span from outdoor art exhibition areas to bicycle repair shops, fishing spots, a hot-smoke fish tower and a “high rise sauna”. The unites are described as “the worlds smallest high-rise builings”." },

        { title: 'Mountain Hill Cabin', image_url: 'http://www.ttjiemeng.net/uploads/allimg/170925/10-1F925160336.jpg', description: "The project is a winter cabin to be built in a highly restricted area in the mountain landscape of Ål in Norway. The cabin is designed as a landscape element that leads wind and snow around and over the building. One of the client’s initial wishes was to be able to actually go skiing, sledge riding and picnicking on top of the cabin. The cabin is to be erected during late summer 2012." },

        { title: 'Sirene Luxurious', image_url: 'http://www.dessign.net/architekttheme/wp-content/uploads/sirene1-logo.jpg', description: 'Sirene is a luxurious restaurant placed at Aker Brygge, where Oslo meets the fjord. We wanted to bring in aspects of nature into this very urban area. The building is designed with layers of flexible and transparent facades, floating on the water surface. When the tide changes, so do the facades of the building.' }

      ]);
    });
};