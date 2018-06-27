const {addMonths, format} = require('date-fns')

var parse = require('date-fns/parse')
var numeralFilter = require('nunjucks-numeral-filter')

module.exports = function (env) {
  /**
   * Instantiate object used to store the methods registered as a
   * 'filter' (of the same name) within nunjucks. You can override
   * gov.uk core filters by creating filter methods of the same name.
   * @type {Object}
   */
   var filters = {}

  // nunjucks numeral.js
  filters.numeral = numeralFilter

  // nunjucks numeral.js
  filters.parseDate = parse


  // DWP dummy data example
  filters.loadDummyData = (filename, feature = 'claim-capture') => {
    const data = require(`./views/${feature}/_dummy-data/${filename}.json`)
    if (data.schedule) {
      const fMonth = parse(data.schedule.payments.firstMonthly)
      const monthly = []
      let currentDate
      for (let i = 1; i < data.schedule.payments.number; i++) {
        if (i === 1) {
          currentDate = fMonth
          monthly.push(format(currentDate, 'D MMMM YYYY'))
        }
        const newDate = addMonths(currentDate, 1)
        monthly.push(format(newDate, 'D MMMM YYYY'))
        currentDate = newDate
      }
      data.schedule.payments.monthly = monthly
    }
    return data
  }

  // ESFA dummy data
  filters.esfaDummyData = (filename, version = 'version-2') => {
    const data = require(`./views/${version}/_dummy-data/${filename}.json`)
    return data
  }

  // ilr-submission dummy data
  filters.loadData = (filename, feature = 'ilr-submission') => {
    const data = require(`./views/${feature}/_dummy-data/${filename}.json`)
    return data
  }

  return filters
}
