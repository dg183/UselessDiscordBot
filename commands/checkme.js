const {
 google
} = require('googleapis');
const {
  spreadsheet,
  range,
  google_email,
  google_private_key,
} = require('../config.js');

let sheet_data;

module.exports = {
  name: 'checkme',
  description: 'Verify new user',
  aliases: ['verify'],
  cooldown: 5,
  sheet_data:[],
};

module.exports.init = async function() {
  // Authorize Client for spreadsheets

  let jwtClient = await authorize();
  if (jwtClient === null) {
    console.log('Authorization for Google Sheets Failed');
    return;
  }
  
  //Google Sheets API
  let sheets = google.sheets('v4');
  sheets.spreadsheets.values.get({
    auth: jwtClient,
    spreadsheetId: spreadsheet,
    range: range
  }, function (err, response) {
    
    if (err) {
      return console.log('The API returned an error: ' + err);
    }

    const rows = response.data.values;

    if (rows.length) {
      const mods = rows.map((row) => {
        return {
          name: row[0],
          zid: row[1],
        };
      });
      module.exports.sheet_data = JSON.stringify(mods);
    } else {
      console.log('No data found.');
    }
  });
}

async function authorize() {
    // configure a JWT auth client
    let jwtClient = new google.auth.JWT(
       google_email,
       null,
       google_private_key,
       'https://www.googleapis.com/auth/spreadsheets');
      
    // Authenticate request
    jwtClient.authorize(function (err, tokens) {
        if (err) {
            console.error(err);
            return;
        }
    });
    return jwtClient;
};


module.exports.execute = function(message, args) {
  const result = module.exports.sheet_data.includes(message.author.username);
  if (result) {message.channel.send(`${message.author.username} is in the spreadsheet!`);}
  else if (!result) {message.channel.send(`${message.author.username} is not the spreadsheet!`);}
};