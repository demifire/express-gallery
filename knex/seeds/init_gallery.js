exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('gallery').del()
    .then(function () {
      // Inserts seed entries
      return knex('gallery').insert([
        { author: 'Leonardo da Vinci', link: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/687px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg', description: 'The Mona Lisa is a half-length portrait painting by the Italian Renaissance artist Leonardo da Vinci that has been described as "the best known, the most visited, the most written about, the most sung about, the most parodied work of art in the world' },

        { author: 'Johannes Vermeer', link: "https://upload.wikimedia.org/wikipedia/commons/7/77/%D0%94%D0%B5%D0%B2%D1%83%D1%88%D0%BA%D0%B0_%D1%81_%D0%B6%D0%B5%D0%BC%D1%87%D1%83%D0%B6%D0%BD%D0%BE%D0%B9_%D1%81%D0%B5%D1%80%D1%91%D0%B6%D0%BA%D0%BE%D0%B9.jpg", description: "Girl with a Pearl Earring is an oil painting by Dutch Golden Age painter Johannes Vermeer. It is a tronie of a girl wearing a headscarf and a pearl earring. The painting has been in the collection of the Mauritshuis in The Hague since 1902" },

        { author: 'Leonardo da Vinci', link: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Leonardo_da_Vinci_-_Last_Supper_%28copy%29_-_WGA12732.jpg/350px-Leonardo_da_Vinci_-_Last_Supper_%28copy%29_-_WGA12732.jpg', description: "The Last Supper is a late 15th-century mural painting by Leonardo da Vinci housed by the refectory of the Convent of Santa Maria delle Grazie in Milan. It is one of the world's most recognizable paintings." }
      ]);
    });
};