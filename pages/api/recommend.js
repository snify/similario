const nlp = require('compromise');
const wtf = require('wtf_wikipedia');

export default async (req, res) => {
    let { t: title } = req.query;

    const API_KEY = '415287-similari-B3EJPW7Y';
    const TDAW = require('tdaw');

    nlp.extend(require('compromise-numbers'));

    const api = new TDAW({
      apiKey: API_KEY
    });
    
    const recommendations = await api.getRecommendations({
      q: title,
      type: 'movies', // Optional
      info: 1, // Optional
      limit: 15, // Optional
      verbose: 1 // Optional
    });

    //console.log(recommendations);
    let results = await Promise.all(recommendations.map(async rec => {

      // long descr, short descr, year
      let longDescription = rec.wTeaser;
      let shortDescription = longDescription;
      let year = '';
      let genre = '';
      let frontImage = '';

      if (longDescription) {
        let parsedDescription = nlp(longDescription);
        shortDescription = parsedDescription.sentences(0).text();
  
        let dates = parsedDescription.numbers().get();
        year = dates.find(date => date > 1850);
      }
      

      let wikipediaUrl = rec.wUrl;      
      // genre
      if (wikipediaUrl) {
        let wikiArticle = await wtf.fetch(wikipediaUrl);

        let jsonLinks = wikiArticle.links()
          .map(link => link.json().text)
          .filter(x => x)
          .filter(x => x[0] !== x[0].toUpperCase());
  
        genre = jsonLinks.find(x => x && x.endsWith(' film'));
        genre = genre || jsonLinks[0];
        if (genre) genre = genre.replace(' film', '').trim();

        frontImage = wikiArticle.images()[0];
        if (frontImage) frontImage = frontImage.json().url;
      }     
      
      return {
        name: rec.Name,
        short_description: shortDescription,
        long_description: longDescription,
        image: frontImage,
        year,
        genre,
        wikipedia_url: wikipediaUrl,
        youtube_id: rec.yID
      };
    }));

    // results.sort((a, b) => {
    //   return b.year - a.year;
    // })

    res.status(200).json(results);
}


