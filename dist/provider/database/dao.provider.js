"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dao = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
let Dao = class Dao {
    constructor(model) {
        this.ObjectId = mongoose_1.Types.ObjectId;
        this.modelName = model;
    }
    saveDataInBackground(data) {
        return new Promise((resolve, reject) => {
            this.modelName
                .create(data)
                .then((data) => {
                resolve(data);
            })
                .catch((err) => {
            });
        });
    }
    async saveData(data) {
        return new Promise((resolve, reject) => {
            this.modelName
                .create(data)
                .then((data) => {
                resolve(data);
            })
                .catch((err) => {
                console.error(err);
            });
        });
    }
    async getDataById(query) {
        return new Promise((resolve, reject) => {
            this.modelName
                .findById(query)
                .then((data) => {
                resolve(data);
            })
                .catch((err) => {
            });
        });
    }
    async findOne(query, projection = {}, options = {}) {
        return new Promise((resolve, reject) => {
            this.modelName
                .findOne(query, projection, options)
                .lean()
                .then((data) => {
                resolve(data);
            })
                .catch((err) => {
            });
        });
    }
    async findOneAndUpdate(conditions, update, options = {}) {
        return new Promise((resolve, reject) => {
            this.modelName
                .findOneAndUpdate(conditions, update, options)
                .lean()
                .then((data) => {
                resolve(data);
            })
                .catch((err) => {
                console.log();
            });
        });
    }
    async updateOne(conditions, update, options = { lean: true }) {
        return new Promise((resolve, reject) => {
            this.modelName
                .updateOne(conditions, update, options)
                .then((data) => {
                resolve(data);
            })
                .catch((err) => {
            });
        });
    }
    async updateMany(conditions, update, options = {}) {
        return new Promise((resolve, reject) => {
            if (options != undefined) {
                options['writeConcern'] = { w: 'majority', wtimeout: 5000 };
            }
            else {
                options = { writeConcern: { w: 'majority', wtimeout: 5000 } };
            }
            this.modelName
                .updateMany(conditions, update, options)
                .then((data) => {
                resolve(data);
            })
                .catch((err) => {
            });
        });
    }
    async findAll(query, projection = {}, options = {}) {
        return new Promise((resolve, reject) => {
            this.modelName
                .find(query, projection, options)
                .lean()
                .then((data) => {
                resolve(data);
            })
                .catch((err) => {
            });
        });
    }
    async findWithPagination(query, projection = {}, options = {}, page = 0, limit = 10) {
        return new Promise((resolve, reject) => {
            const paginationResult = { next: false, page: page };
            this.modelName
                .find(query, projection, options)
                .skip((page - 1) * limit)
                .limit(limit + 1)
                .then((data) => {
                if (data.length) {
                    if (data.length > limit) {
                        paginationResult.next = true;
                        data.slice(0, data.length - 1);
                    }
                    else
                        paginationResult.result = data;
                    resolve(paginationResult);
                }
                else
                    resolve({ next: false, result: [], page: page });
            })
                .catch((err) => {
            });
        });
    }
    async findAllPaginated(query, projection = {}, options = {}, page = 0, size = 10) {
        return new Promise((resolve, reject) => {
            this.modelName
                .find(query, projection, options)
                .skip(page * size)
                .limit(size)
                .then((data) => {
                resolve(data);
            })
                .catch((err) => {
            });
        });
    }
    async insertMany(data, options) {
        return new Promise((resolve, reject) => {
            this.modelName
                .insertMany(data, options)
                .then((data) => {
                resolve(data);
            })
                .catch((err) => {
            });
        });
    }
    async distinct(path) {
        return new Promise((resolve, reject) => {
            this.modelName
                .distinct(path)
                .then((data) => {
                resolve(data);
            })
                .catch((err) => {
            });
        });
    }
    async aggregateData(aggregateArray, options) {
        return new Promise((resolve, reject) => {
            this.modelName
                .aggregate(aggregateArray)
                .then((data) => {
                if (options) {
                    data.options = options;
                }
                resolve(data);
            })
                .catch((err) => {
            });
        });
    }
    async paginateAggregate(pipeline, options = {}) {
        if (options.getCount) {
            pipeline.push({
                $facet: {
                    total: [{ $count: 'count' }],
                    result: [{ $skip: (options.page - 1) * options.limit }, { $limit: options.limit }],
                },
            });
            let aggregateData;
            if (options.hint) {
                aggregateData = await this.modelName.aggregate(pipeline, { allowDiskUse: true }).collation({ locale: 'en', strength: 1 }).hint(options.hint).exec();
            }
            else
                aggregateData = await this.modelName.aggregate(pipeline, { allowDiskUse: true }).collation({ locale: 'en', strength: 1 }).exec();
            if (aggregateData.length) {
                if (aggregateData[0].result.length) {
                    const paginationResult = { next: false, page: options.page, total: aggregateData[0].total[0].count };
                    if (options.limit * options.page < paginationResult.total) {
                        paginationResult.next = true;
                    }
                    paginationResult.result = aggregateData[0].result;
                    return paginationResult;
                }
                else
                    return { next: false, result: [], page: options.page, total: aggregateData[0].total.length ? aggregateData[0].total[0].count : 0 };
            }
            else
                throw new Error('Error in paginate aggregation pipeline');
        }
        else {
            if (!options.prePaginated) {
                if (options.range)
                    pipeline.push({ $match: options.range });
                else
                    pipeline.push({ $skip: (options.page - 1) * options.limit });
                pipeline.push({ $limit: options.limit + 1 });
            }
            let aggregateData;
            if (options.hint) {
                aggregateData = await this.modelName.aggregate(pipeline, { allowDiskUse: true }).collation({ locale: 'en', strength: 1 }).hint(options.hint).exec();
            }
            else
                aggregateData = await this.modelName.aggregate(pipeline, { allowDiskUse: true }).collation({ locale: 'en', strength: 1 }).exec();
            if (aggregateData.length) {
                const paginationResult = { next: false, page: options.page };
                if (aggregateData.length > options.limit) {
                    paginationResult.next = true;
                    paginationResult.result = aggregateData.slice(0, aggregateData.length - 1);
                }
                else
                    paginationResult.result = aggregateData;
                return paginationResult;
            }
            else
                return { next: false, result: [], page: options.page };
        }
    }
    async deleteById(id) {
        return new Promise((resolve, reject) => {
            this.modelName
                .findByIdAndRemove(id)
                .then((data) => {
                resolve(data);
            })
                .catch((err) => {
            });
        });
    }
    async deleteMany(query) {
        return new Promise((resolve, reject) => {
            this.modelName
                .deleteMany(query)
                .then((data) => {
                resolve(data);
            })
                .catch((err) => {
            });
        });
    }
    async aggregate(query) {
        return new Promise((resolve, reject) => {
            this.modelName
                .aggregate(query)
                .then((data) => {
                resolve(data);
            })
                .catch((err) => {
            });
        });
    }
    async findAllCursor(query) {
        return await this.modelName.find(query).lean().cursor();
    }
    async aggregateCursor(query, batchSize) {
        return await this.modelName.aggregate(query).cursor({ batchSize: batchSize });
    }
    async vendorFindAllCursor(query) {
        return await this.modelName.find(query).lean().cursor();
    }
    async clientFindAllCursor(query) {
        return await this.modelName.find(query).lean().cursor();
    }
    async countDocuments(query) {
        return new Promise((resolve, reject) => {
            this.modelName
                .countDocuments(query)
                .then((data) => {
                resolve(data);
            })
                .catch((err) => {
            });
        });
    }
};
exports.Dao = Dao;
exports.Dao = Dao = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Object])
], Dao);
//# sourceMappingURL=dao.provider.js.map