module.exports = (model) => async (req, res, next) => {
  try {
    const page = +req.query.page;
    const limit = +req.query.limit;

    const start_index = (page - 1) * limit;
    const end_index = page * limit;

    const results = {};

    if (start_index > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }

    const document_count = await model.countDocuments();

    if (end_index < document_count) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }

    results.total_results = document_count;

    results.results = await model.find().skip(start_index).limit(limit);

    res.paginated_results = results;
    next();
  } catch (err) {
    next(err);
  }
};
