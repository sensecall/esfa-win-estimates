/*

Provide default values for user session data. These are automatically added
via the `autoStoreData` middleware. Values will only be added to the
session if a value doesn't already exist. This may be useful for testing
journeys where users are returning or logging in to an existing application.

============================================================================

Example usage:

"full-name": "Sarah Philips",

"options-chosen": [ "foo", "bar" ]

============================================================================

*/

module.exports = {

  'expired_funds': ['50', '0'],
  'unspent_levy': ['2,000','4,000'],
  'predicted_levy': ['6,000','12,000'],
  'current_funds': ['12,000','24,000'],
  'spent_last_year': ['5,000','10,000'],
  'predicted_spending': ['8,000','16,000'],

}
