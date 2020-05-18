// main.ts
// const fs = require('fs');
import * as fs from "fs";

//const readline = require('readline');
import * as readline from "readline";

import Parse from './parser';

//const {google} = require('googleapis');
import { google } from "googleapis";

// If modifying these scopes, delete token.json.
const SCOPES: string[] = ["https://www.googleapis.com/auth/gmail.readonly"];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH: string = "token.json";

// Load client secrets from a local file.
//var creds = require("./credentials.json");
import * as creds from "./credentials.json"
authorize(creds, getRecentEmail);

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials: any, callback: any) {
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err: any, token: any) => {
    if (err) return getNewToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client: any, callback: any) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });
  console.log("Authorize this app by visiting this url:", authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question("Enter the code from that page here: ", (code: string) => {
    rl.close();
    oAuth2Client.getToken(code, (err: any, token: any) => {
      if (err) return console.error("Error retrieving access token", err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err: any) => {
        if (err) return console.error(err);
        console.log("Token stored to", TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

/**
 * Lists the labels in the user's account.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function listLabels(auth: any) {
  const gmail = google.gmail({ version: "v1", auth });
  gmail.users.labels.list(
    {
      userId: "me",
    },
    (err: any, res: any) => {
      if (err) return console.log("The API returned an error: " + err);
      const labels = res.data.labels;
      if (labels.length) {
        console.log("Labels:");
        labels.forEach((label: any) => {
          console.log(`- ${label.name}`);
        });
      } else {
        console.log("No labels found.");
      }
    }
  );
}
/**
 * Get the recent email from your Gmail account
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function getRecentEmail(auth: any) {
  const gmail = google.gmail({ version: "v1", auth });
  // Only get the recent email - 'maxResults' parameter
  gmail.users.messages.list(
    { auth: auth, userId: "me", labelIds: ['CATEGORY_FORUMS'], maxResults: 4 },
    function (err: any, response: any) {
      if (err) {
        console.log("The API returned an error: " + err);
        return;
      }

      // Get the message id which we will need to retreive tha actual message next.
      var message_id = response["data"]["messages"][0]["id"];

      // Retreive the actual message using the message id
      gmail.users.messages.get(
        { auth: auth, userId: "me", id: message_id },
        function (err: any, response: any) {
          if (err) {
            console.log("The API returned an error: " + err);
            return;
          }
          const regex = /(?:"?([^"]*)"?\s)?(?:<?(.+@[^>]+)>?)/;
          // console.log(response["data"]["payload"]["headers"]);
          response["data"]["payload"]["headers"].forEach((a: any, b: any) => {
            if (a["name"] == "From") {
              Parse(regex.exec(a["value"])[2], response.data.payload.parts[0].body.data)
              /**
              if (
                regex.exec(a["value"])[2] == "someone@gmail.com"
              ) {
                var message_raw = response.data.payload.parts[0].body.data;
                var data = message_raw;
                var buff = new Buffer(data, "base64");
                var text = buff.toString();
                console.log(text);
              } **/
            }
          });
        }
      );
    }
  );
}
