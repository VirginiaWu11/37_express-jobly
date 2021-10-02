const { BadRequestError } = require("../expressError");

/**
 * Helper function to help conver Javascript style variables into actual databse column names to be used in an sql query.
 *
 * @param  dataToUpdate {Object} user passes in fields to update{field1: newVal,field2:newVal, ...}
 * @param  jsToSql {object} maps js style data fields to database column names. e.g. { firstName: "first_name", age: "age" }
 * @returns {Object} {SQL column names separated by commas,values}
 * e.g {["first_name=$1","last_name=$2"], ["John", "Doe"]}
 */

function sqlForPartialUpdate(dataToUpdate, jsToSql) {
    const keys = Object.keys(dataToUpdate);
    if (keys.length === 0) throw new BadRequestError("No data");

    // {firstName: 'Aliya', age: 32} => ['"first_name"=$1', '"age"=$2']
    const cols = keys.map(
        (colName, idx) => `"${jsToSql[colName] || colName}"=$${idx + 1}`
    );

    return {
        setCols: cols.join(", "),
        values: Object.values(dataToUpdate),
    };
}

module.exports = { sqlForPartialUpdate };
