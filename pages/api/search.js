export default async (req, res) => {
    let { t: title } = req.query;
    let result = await fetch(`https://tastedive.com/api/autocomplete?t=m&v=3&target=search&q=${title}`);

    result = await result.json();
    result = result.suggestions.map(suggestion => {
      return {
        name: suggestion.title,
        year: suggestion.disambiguation
      }
    });

    result = result.filter(x => !x.name.match(/tastedive/ig));

    console.log(JSON.stringify(result, null, 2));

    res.status(200).json(result);
}


