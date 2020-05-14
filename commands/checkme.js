const { prefix } = require('../config.js');
const {
 google
} = require('googleapis');
const {
  spreadsheet,
  range,
  google_email,
  google_private_key,
} = require('../config.js');


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


    if (rows && rows.length) {
      const mods = rows.map((row) => {
        return {
          discord_user: row[0],
          hash: row[5],
        };
      });
      module.exports.sheet_data = JSON.stringify(mods);
      return module.exports.sheet_data;
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

module.exports.execute = async function(message, args) {
    try {
      var result = await module.exports.init();
      if (args.length) {
        await new Promise((resolve, reject) => setTimeout(resolve, 2000));
        var sheets = module.exports.sheet_data;
        if (sheets != "") {
          let parsed = JSON.parse(sheets);
          console.log(parsed);
          for (let i = 0; i < parsed.length; i++) {

              // checks if verification code is valid
              if (parsed[i].discord_user == message.author.tag && parsed[i].hash == args[0]){
                
                assignVerifiedRole(message);

                return message.channel.send(`${message.author.username} has been verified!`);
              }
          }
        }
        
        message.channel.send(`${message.author.username} is not allowed!`);
      }
      else {message.reply(`You need to give me your verification code as well!\nTry \`${prefix}checkme [verification code]\`\n\
If you haven't recieved a verification code yet, please fill out the google form to get emailed a code to your UNSW email: https://forms.gle/TSg9YXqeokzi2Jad8`);}
    } catch (e) {
      console.error(e);
    }
};

function assignVerifiedRole(message) {
	var cache = message.guild.roles.cache;
	var verifiedRole;

	cache.map(role => {
		if (role.name === 'rookie') {
			verifiedRole = role;
		}
	})
	console.log(cache);
	console.log(verifiedRole);


  message.guild.member(message.author).roles.add([verifiedRole]);

  }