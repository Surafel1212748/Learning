
const db = require('../models');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class AnalyticsDBApi {

    static async create(data, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        const analytics = await db.analytics.create(
            {
                id: data.id || undefined,

        student_engagement: data.student_engagement
        ||
        null
            ,

        completion_rate: data.completion_rate
        ||
        null
            ,

        instructor_performance: data.instructor_performance
        ||
        null
            ,

            importHash: data.importHash || null,
            createdById: currentUser.id,
            updatedById: currentUser.id,
    },
        { transaction },
    );

        return analytics;
    }

    static async bulkImport(data, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        // Prepare data - wrapping individual data transformations in a map() method
        const analyticsData = data.map((item, index) => ({
                id: item.id || undefined,

                student_engagement: item.student_engagement
            ||
            null
            ,

                completion_rate: item.completion_rate
            ||
            null
            ,

                instructor_performance: item.instructor_performance
            ||
            null
            ,

            importHash: item.importHash || null,
            createdById: currentUser.id,
            updatedById: currentUser.id,
            createdAt: new Date(Date.now() + index * 1000),
    }));

        // Bulk create items
        const analytics = await db.analytics.bulkCreate(analyticsData, { transaction });

        return analytics;
    }

    static async update(id, data, options) {
        const currentUser = (options && options.currentUser) || {id: null};
        const transaction = (options && options.transaction) || undefined;

        const analytics = await db.analytics.findByPk(id, {}, {transaction});

        const updatePayload = {};

        if (data.student_engagement !== undefined) updatePayload.student_engagement = data.student_engagement;

        if (data.completion_rate !== undefined) updatePayload.completion_rate = data.completion_rate;

        if (data.instructor_performance !== undefined) updatePayload.instructor_performance = data.instructor_performance;

        updatePayload.updatedById = currentUser.id;

        await analytics.update(updatePayload, {transaction});

        return analytics;
    }

    static async deleteByIds(ids, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        const analytics = await db.analytics.findAll({
            where: {
                id: {
                    [Op.in]: ids,
                },
            },
            transaction,
        });

        await db.sequelize.transaction(async (transaction) => {
            for (const record of analytics) {
                await record.update(
                    {deletedBy: currentUser.id},
                    {transaction}
                );
            }
            for (const record of analytics) {
                await record.destroy({transaction});
            }
        });

        return analytics;
    }

    static async remove(id, options) {
        const currentUser = (options && options.currentUser) || {id: null};
        const transaction = (options && options.transaction) || undefined;

        const analytics = await db.analytics.findByPk(id, options);

        await analytics.update({
            deletedBy: currentUser.id
        }, {
            transaction,
        });

        await analytics.destroy({
            transaction
        });

        return analytics;
    }

    static async findBy(where, options) {
        const transaction = (options && options.transaction) || undefined;

        const analytics = await db.analytics.findOne(
            { where },
            { transaction },
        );

        if (!analytics) {
            return analytics;
        }

        const output = analytics.get({plain: true});

        return output;
    }

    static async findAll(filter, options) {
        const limit = filter.limit || 0;
        let offset = 0;
        let where = {};
        const currentPage = +filter.page;

        const user = (options && options.currentUser) || null;

        offset = currentPage * limit;

        const orderBy = null;

        const transaction = (options && options.transaction) || undefined;

        let include = [];

        if (filter) {
            if (filter.id) {
                where = {
                    ...where,
                    ['id']: Utils.uuid(filter.id),
                };
            }

            if (filter.student_engagementRange) {
                const [start, end] = filter.student_engagementRange;

                if (start !== undefined && start !== null && start !== '') {
                    where = {
                        ...where,
                    student_engagement: {
                    ...where.student_engagement,
                            [Op.gte]: start,
                    },
                };
                }

                if (end !== undefined && end !== null && end !== '') {
                    where = {
                        ...where,
                    student_engagement: {
                    ...where.student_engagement,
                            [Op.lte]: end,
                    },
                };
                }
            }

            if (filter.completion_rateRange) {
                const [start, end] = filter.completion_rateRange;

                if (start !== undefined && start !== null && start !== '') {
                    where = {
                        ...where,
                    completion_rate: {
                    ...where.completion_rate,
                            [Op.gte]: start,
                    },
                };
                }

                if (end !== undefined && end !== null && end !== '') {
                    where = {
                        ...where,
                    completion_rate: {
                    ...where.completion_rate,
                            [Op.lte]: end,
                    },
                };
                }
            }

            if (filter.instructor_performanceRange) {
                const [start, end] = filter.instructor_performanceRange;

                if (start !== undefined && start !== null && start !== '') {
                    where = {
                        ...where,
                    instructor_performance: {
                    ...where.instructor_performance,
                            [Op.gte]: start,
                    },
                };
                }

                if (end !== undefined && end !== null && end !== '') {
                    where = {
                        ...where,
                    instructor_performance: {
                    ...where.instructor_performance,
                            [Op.lte]: end,
                    },
                };
                }
            }

            if (filter.active !== undefined) {
                where = {
                    ...where,
                    active: filter.active === true || filter.active === 'true'
                };
            }

            if (filter.createdAtRange) {
                const [start, end] = filter.createdAtRange;

                if (start !== undefined && start !== null && start !== '') {
                    where = {
                        ...where,
                        ['createdAt']: {
                            ...where.createdAt,
                            [Op.gte]: start,
                        },
                    };
                }

                if (end !== undefined && end !== null && end !== '') {
                    where = {
                        ...where,
                        ['createdAt']: {
                            ...where.createdAt,
                            [Op.lte]: end,
                        },
                    };
                }
            }
        }

        const queryOptions = {
            where,
            include,
            distinct: true,
            order: filter.field && filter.sort
                ? [[filter.field, filter.sort]]
                : [['createdAt', 'desc']],
            transaction: options?.transaction,
            logging: console.log
        };

        if (!options?.countOnly) {
            queryOptions.limit = limit ? Number(limit) : undefined;
            queryOptions.offset = offset ? Number(offset) : undefined;
        }

        try {
            const { rows, count } = await db.analytics.findAndCountAll(queryOptions);

            return {
                rows: options?.countOnly ? [] : rows,
                count: count
            };
        } catch (error) {
            console.error('Error executing query:', error);
            throw error;
        }
    }

    static async findAllAutocomplete(query, limit, offset) {
        let where = {};

        if (query) {
            where = {
                [Op.or]: [
                    { ['id']: Utils.uuid(query) },
                    Utils.ilike(
                        'analytics',
                        'course',
                        query,
                    ),
                ],
            };
        }

        const records = await db.analytics.findAll({
            attributes: [ 'id', 'course' ],
            where,
            limit: limit ? Number(limit) : undefined,
            offset: offset ? Number(offset) : undefined,
            orderBy: [['course', 'ASC']],
        });

        return records.map((record) => ({
            id: record.id,
            label: record.course,
        }));
    }

};

