import dayjs from 'dayjs';
import _ from 'lodash';

export default {
    filesFormatter(arr) {
        if (!arr || !arr.length) return [];
        return arr.map((item) => item);
    },
    imageFormatter(arr) {
        if (!arr || !arr.length) return []
        return arr.map(item => ({
            publicUrl: item.publicUrl || ''
        }))
    },
    oneImageFormatter(arr) {
        if (!arr || !arr.length) return ''
        return arr[0].publicUrl || ''
    },
    dateFormatter(date) {
        if (!date) return ''
        return dayjs(date).format('YYYY-MM-DD')
    },
    dateTimeFormatter(date) {
        if (!date) return ''
        return dayjs(date).format('YYYY-MM-DD HH:mm')
    },
    booleanFormatter(val) {
        return val ? 'Yes' : 'No'
    },
    dataGridEditFormatter(obj) {
        return _.transform(obj, (result, value, key) => {
            if (_.isArray(value)) {
                result[key] = _.map(value, 'id');
            } else if (_.isObject(value)) {
                result[key] = value.id;
            } else {
                result[key] = value;
            }
        });
    },

        coursesManyListFormatter(val) {
            if (!val || !val.length) return []
            return val.map((item) => item.title)
        },
        coursesOneListFormatter(val) {
            if (!val) return ''
            return val.title
        },
        coursesManyListFormatterEdit(val) {
            if (!val || !val.length) return []
            return val.map((item) => {
              return {id: item.id, label: item.title}
            });
        },
        coursesOneListFormatterEdit(val) {
            if (!val) return ''
            return {label: val.title, id: val.id}
        },

        enrollmentsManyListFormatter(val) {
            if (!val || !val.length) return []
            return val.map((item) => item.payment_status)
        },
        enrollmentsOneListFormatter(val) {
            if (!val) return ''
            return val.payment_status
        },
        enrollmentsManyListFormatterEdit(val) {
            if (!val || !val.length) return []
            return val.map((item) => {
              return {id: item.id, label: item.payment_status}
            });
        },
        enrollmentsOneListFormatterEdit(val) {
            if (!val) return ''
            return {label: val.payment_status, id: val.id}
        },

        studentsManyListFormatter(val) {
            if (!val || !val.length) return []
            return val.map((item) => item.first_name)
        },
        studentsOneListFormatter(val) {
            if (!val) return ''
            return val.first_name
        },
        studentsManyListFormatterEdit(val) {
            if (!val || !val.length) return []
            return val.map((item) => {
              return {id: item.id, label: item.first_name}
            });
        },
        studentsOneListFormatterEdit(val) {
            if (!val) return ''
            return {label: val.first_name, id: val.id}
        },

}
