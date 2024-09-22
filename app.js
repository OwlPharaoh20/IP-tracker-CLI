#!/usr/bin/env node

// Import necessary modules
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import fetch from 'node-fetch';

// Your API key from ipgeolocation.io (replace with your actual key)
const API_KEY = '1044842f53c9446385893216dd4f1c32';
const API_URL = 'https://api.ipgeolocation.io/ipgeo';

// Fetch geolocation information for an IP address
async function fetchIpGeolocation(ipAddress) {
    try {
        const response = await fetch(`${API_URL}?apiKey=${API_KEY}&ip=${ipAddress}`);
        const data = await response.json();
        displayGeolocation(data);
    } catch (error) {
        console.error('Error fetching geolocation:', error);
    }
}

// Display geolocation information
function displayGeolocation(data) {
    if (data && data.ip) {
        console.log(`IP Address: ${data.ip}`);
        console.log(`Country: ${data.country_name}`);
        console.log(`State: ${data.state_prov}`);
        console.log(`City: ${data.city}`);
        console.log(`Latitude: ${data.latitude}`);
        console.log(`Longitude: ${data.longitude}`);
        console.log(`ISP: ${data.isp}`);
    } else {
        console.log('Failed to retrieve geolocation information.');
    }
}

// Define CLI commands with Yargs
yargs(hideBin(process.argv))
    .command({
        command: 'track <ip>',
        describe: 'Track the geolocation of a given IP address',
        handler: (argv) => {
            fetchIpGeolocation(argv.ip);
        }
    })
    .demandCommand(1, 'You need to provide an IP address to track')
    .help()
    .argv;
