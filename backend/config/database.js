const mongoose = require('mongoose');
const User = require('../models/User');
const Company = require('../models/Company');
require('dotenv').config();

exports.connect = () =>{
    // to avoid (node:10736) [MONGOOSE] DeprecationWarning warning
    mongoose.set('strictQuery', true);

    //Connecting to DB...
    console.log("Connecting to DB...")

    const config = process.env;

    mongoose.connect(
        config.MONGO_URI,
        async function (err){

            if (err){
                console.log('Connection Failed: ' + err);
            }
            console.log("Connected to DB!");
            
            const companyName = "The Little Eatery";
            const company = await Company.findOne({name: companyName})            
            
            if (company === null){
                Company.create([{
                    name: companyName,
                    tables: {
                        "table1": {
                            reservations: {
                                "2/28/2024": {
                                    reservation: {
                                        from: "2024-02-28T09:00:00",
                                        to: "2024-02-28T11:00:00"
                                    },
                                    reservation: {
                                        from: "2024-02-28T14:00:00",
                                        to: "2024-02-28T16:00:00"
                                    }
                                },
                                "3/1/2024": {
                                    reservation: {
                                        from: "2024-03-01T10:00:00",
                                        to: "2024-03-01T12:00:00"
                                    }
                                }
                            }
                        },
                        "table2": {
                            reservations: {
                                "3/1/2024": {
                                    reservation: {
                                        from: "2024-03-01T14:00:00",
                                        to: "2024-03-01T16:00:00"
                                    }
                                }
                            }
                        }
                    },
                    operation:{"sunday":{"start_time":"08:00 AM","close_time":"09:00 PM"},"monday":{"start_time":"07:30 AM","close_time":"08:30 PM"},"tuesday":{"start_time":"07:30 AM","close_time":"08:30 PM"},"wednesday":{"start_time":"07:30 AM","close_time":"08:30 PM"},"thursday":{"start_time":"07:30 AM","close_time":"08:30 PM"},"friday":{"start_time":"07:30 AM","close_time":"10:00 PM"},"saturday":{"start_time":"09:00 AM","close_time":"10:00 PM"}}
                }])
            }
        }
    )
}