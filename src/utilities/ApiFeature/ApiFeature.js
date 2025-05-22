import { Sequelize } from "sequelize";

export default class ApiFeature {
  constructor(model, queryString) {
    this.model = model;
    this.queryString = queryString;
    this.queryOptions = {};
    this.page = parseInt(this.queryString.page, 10);
    this.limit = 30;
    this.totalDocs = 0;
    this.totalPages = 0;
  }

  pagination() {
    let page = this.queryString.page * 1 || 1;
    if (isNaN(this.page) || this.page <= 0) this.page = 1;

    let offset = (page - 1) * this.limit;

    this.queryOptions.limit = this.limit;
    this.queryOptions.offset = offset;

    return this;
  }

  filter() {
    let filterObj = { ...this.queryString };
    let excludedQuery = ["page", "keywords"];

    excludedQuery.forEach((q) => {
      delete filterObj[q];
    });

    // Modify filterObj to use Sequelize operators
    filterObj = JSON.stringify(filterObj);
    filterObj = filterObj.replace(/\bgt|gte|lt|lte\b/g, (match) => `$${match}`);
    filterObj = JSON.parse(filterObj);

    this.queryOptions.where = filterObj;
    return this;
  }

  search() {
    if (this.queryString.keywords) {
      let { keywords } = this.queryString;
      if (!this.queryOptions.where) this.queryOptions.where = {};
      this.queryOptions.where.name = {
        [Sequelize.Op.like]: `%${keywords}%`, // Assuming you're searching by name
      };
    }
    return this;
  }
  
  async getTotalDocs() {
    this.totalDocs = await this.model.count({
      where: this.queryOptions.where || {},
    });
    this.totalPages = Math.ceil(this.totalDocs / this.limit);
  }
}
