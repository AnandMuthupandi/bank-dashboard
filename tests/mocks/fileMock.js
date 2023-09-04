// module.exports = "test-file-stub";

const path = require('path');

module.exports = {
  process(src, filename, config, options) {
    return 'module.exports = ' + JSON.stringify(path.basename(filename)) + ';';
  },
};

// jest.mock("../../src/contexts/apicontext", () => {
//   return {
//     useApiContext: jest.fn(() => ({
//       apiState:  {
//           "apiState": {
//               "clientAccounts": {
                  
//                   "12345": [
//                       {
//                           "id": "12345",
//                           "card_type": "VISA",
//                           "number": 402400,
//                           "balance": 100,
//                           "created": "2021-04-24 12:39:31+00:00"
//                       },
//                       {
//                           "id": "6084122499e57e9b1e12ac47",
//                           "card_type": "MasterCard",
//                           "number": 405400,
//                           "balance": 200,
//                           "created": "2021-04-24 12:42:12+00:00"
//                       }
//                   ],
//                   "608435723e45940a9f129cc3": [],
//               }
//           },
//           "clients": {
//               "data": [
//                   {
//                       "id": "60834cac4c8b724f5891fef0",
//                       "name": "OReilly",
//                       "firstname": "Brian",
//                       "address": "4584 Sunny Day Drive, Irvine, CA",
//                       "created": "2021-04-23 22:39:40+00:00",
//                       "birthday": "1989-05-23 13:25:14",
//                       "accounts": []
//                   },
//                   {
//                       "id": "608572d363b913700be09a41",
//                       "name": "Simpson",
//                       "firstname": "Bart",
//                       "address": "SpringField, USA",
//                       "created": "2021-04-25 13:46:59+00:00",
//                       "birthday": "1995-04-14 13:25:14",
//                       "accounts": [
//                           "6084122499e57e9b1e12ac47",
//                           "6084118399e57e9b1e12ac45"
//                       ]
//                   }
                  
//               ],
//               "error": null
//           },
//           "clientAccounts": {
//               "data": [{
//                   "id": "6084118399e57e9b1e12ac45",
//                   "card_type": "VISA",
//                   "number": 402400,
//                   "balance": 100,
//                   "created": "2021-04-24 12:39:31+00:00"
//               }],
//               "error": null
//           },
//           "selectedCLient" : {
//               "name": "Bart",
//               "id": "608572d363b913700be09a41"
//           }
//       }
//       ,
//       fetchData: jest.fn(),
//     })),
//   };
// });
