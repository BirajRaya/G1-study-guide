import { useState, useEffect, useRef, useCallback } from "react";
import {
  BookOpen, ClipboardList, RotateCcw, CheckCircle, XCircle, Trophy,
  ArrowLeft, Eye, EyeOff, ChevronDown, ChevronUp, Timer, Layers,
  BarChart2, Zap, RefreshCw, ChevronLeft, ChevronRight, Award,
  TrendingUp, AlertCircle, CheckSquare, Clock
} from "lucide-react";
import { C, font, LETTERS, PageHeader, stateStyles } from "./TrafficSigns";

const rulesData = [
  { id: 1, question: "In Ontario, there is a seat belt law", options: ["Yes", "No", "Only when driving on an open highway", "Only when driving within a municipality"], correctAnswer: 0 },
  { id: 2, question: "If someone is tailgating you, what should you do?", options: ["Move into another lane when it is safe to do so", "Slow down slightly to increase the space in front of your car", "Pull over to let the tailgater pass", "All of the above"], correctAnswer: 3 },
  { id: 3, question: "Failing to stop for a school bus that is unloading passengers will", options: ["Result in a one year jail sentence", "Cost you 6 demerit points and a fine of up to $1000", "Get you a warning and a fine of $100", "Result in retaking your road test"], correctAnswer: 1 },
  { id: 4, question: "When a car is stopped to allow a pedestrian to cross the street at a marked crosswalk, you should", options: ["Pass the stopped car on the left", "Sound horn for the driver of the stopped car to drive on", "Pass the stopped car to the right", "Not pass any car stopped to allow a pedestrian to cross"], correctAnswer: 3 },
  { id: 5, question: "When driving in heavy fog, you should use", options: ["Parking lights", "Low beam headlights", "Parking lights and high beam headlights", "High beam headlights"], correctAnswer: 1 },
  { id: 6, question: "Never change lanes in traffic without", options: ["Giving proper signal and looking to make sure the move can be made safely", "Decreasing speed and giving the correct signal", "Looking into the rear view mirror only", "Blowing your horn and looking to the rear"], correctAnswer: 0 },
  { id: 7, question: "What documents may a police officer require a motor vehicle owner to produce?", options: ["If the motor vehicle is insured—a liability insurance card", "The motor vehicle ownership", "If he is operating a motor vehicle—a valid driver's licence", "Any of the above"], correctAnswer: 3 },
  { id: 8, question: "Every accident must be reported to the police where there is personal injury or when the damage exceeds", options: ["$100", "$150", "$1500", "$1000"], correctAnswer: 3 },
  { id: 9, question: "When lights are required, drivers must use lower beam headlights when following another vehicle", options: ["Within 30 m (100 ft.)", "Within 60 m (200 ft.)", "Within 120 m (400 ft.)", "This only applies when approaching another vehicle"], correctAnswer: 1 },
  { id: 10, question: "While travelling on a highway, the driver of a motor vehicle is not permitted to carry, in a house or boat trailer", options: ["Firearms", "Flammable material", "Persons (Passenger)", "Pets"], correctAnswer: 2 },
  { id: 11, question: "When on streets designed for two-way traffic, you hear the siren of an emergency vehicle, what does the law require you to do?", options: ["Speed up and get out of the way", "Signal the driver to pass", "Pull to the right as far as possible and stop", "Continue at the same speed"], correctAnswer: 2 },
  { id: 12, question: "Which of the following has the right-of-way over all others at an intersection when the signal light is green?", options: ["Pedestrians crossing against the light", "Pedestrians crossing with the light", "Vehicles turning right", "Vehicles turning left"], correctAnswer: 1 },
  { id: 13, question: "To what penalties is a driver liable who is convicted of driving while disqualified?", options: ["A fine of $500 or imprisonment for six months or both", "Impoundment of the motor vehicle being operated for three months", "An additional 6-month period of suspension of driving privilege", "Any or all of the above"], correctAnswer: 3 },
  { id: 14, question: "When the traffic signal-light facing you is red and you intend to go straight through the intersection, what must you do?", options: ["Stop, give pedestrians the right-of-way, then proceed with caution", "Stop, proceed when the way is clear", "Slow down, proceed when the way is clear", "Stop, proceed only when the signal turns green and when the way is clear"], correctAnswer: 3 },
  { id: 15, question: "If you are involved in a reportable accident how soon must you make a report to your nearest provincial or municipal police officer?", options: ["At once", "Within 24 hours", "Within 48 hours", "Within 72 hours"], correctAnswer: 0 },
  { id: 16, question: "If a traffic signal changes while a pedestrian is still in the street, which of the following has the right-of-way?", options: ["Motorists making turns", "The pedestrian", "Motorists coming from his right", "Motorists coming from his left"], correctAnswer: 1 },
  { id: 17, question: "Unless otherwise posted, the maximum speed limit allowed in cities, town, villages and built-up area is", options: ["30 km/h (20 m.p.h.)", "50 km/h (30 m.p.h.)", "40 km/h (25 m.p.h.)", "60 km/h (35 m.p.h.)"], correctAnswer: 1 },
  { id: 18, question: "At an intersection where there is a flashing amber (yellow) traffic light, you must", options: ["Stop if making a right turn", "Continue at the same speed", "Stop if making a left turn", "Slow down and proceed with caution"], correctAnswer: 3 },
  { id: 19, question: "Under what circumstances may a driver's licence be cancelled?", options: ["For failure to attend a re-examination", "For possession of an altered driver's licence", "For failure to satisfactorily complete a driver re-examination", "Any or all of the above"], correctAnswer: 3 },
  { id: 20, question: "As a level one (G1) driver, you must be accompanied by a class G or higher licensed driver, who has the following driving experience more than", options: ["Three years", "Four years", "Eight years", "Six years"], correctAnswer: 1 },
  { id: 21, question: "As a level two (G2) driver your alcohol level must not be over", options: ["0.08%", "0.05%", "0.02%", "0.00%"], correctAnswer: 3 },
  { id: 22, question: "Overdriving your headlights at night is dangerous because", options: ["You are driving too fast", "Your headlights are too bright", "You cannot stop within the distance that you can see", "It is not good for the car battery"], correctAnswer: 2 },
  { id: 23, question: "If you want to pass a motorcycle, you should", options: ["Honk your horn before you pass", "Turn on your high-beam lights before you pass", "Pass just as you would with another car", "Use half of their lane to pass"], correctAnswer: 2 },
  { id: 24, question: "If you are a teenage driver aged 19 or under and in the first six months of receiving your G2 licence. How many passengers are you allowed to carry between midnight and 5 a.m.?", options: ["3 passengers aged 19 or under", "No passengers aged 19 or under", "1 passenger aged 19 or under (no restrictions for passengers the age of 20 and over)", "2 passengers aged 19 or under"], correctAnswer: 2 },
  { id: 25, question: "If you are a teenage driver with your G2 licence for 6 months and until you obtain your full G licence or turn 20, how many passengers are you allowed to carry between midnight and 5 a.m.?", options: ["3 passengers aged 19 or under (no restrictions for passengers the age of 20 and over)", "No passengers aged 19 or under", "1 passenger aged 19 or under", "2 passengers aged 19 or under"], correctAnswer: 0 },
  { id: 26, question: "A 'No Parking' sign at a certain location means", options: ["You may stop here if the driver remains in the vehicle", "You may park your vehicle for less than five minutes", "You may stop temporarily to load or unload passengers", "You may not park your vehicle here"], correctAnswer: 3 },
  { id: 27, question: "In what position on the roadway must you be before making a left turn from a one-way traffic street?", options: ["Close to the right-hand side of the roadway", "Close to the centre line of the roadway", "Close to the left side of the roadway", "Does not matter"], correctAnswer: 2 },
  { id: 28, question: "When lights are required, drivers are required to use low beam headlights?", options: ["Within 1 km (0.6 mile) of the approach of another vehicle", "Within 150 m (500 ft.) of the approach of another vehicle", "Within 300 m (1000 ft.) of the approach of another vehicle", "This is a safety practice, not a law"], correctAnswer: 1 },
  { id: 29, question: "What insurance protection does the owner get who pays the uninsured motor vehicle fee?", options: ["$10,000 insurance coverage", "$20,000 insurance coverage", "$35,000 insurance coverage", "No insurance protection whatever"], correctAnswer: 3 },
  { id: 30, question: "When approaching a railway crossing at which an electrical or mechanical signal device is warning of the approach of a train you must", options: ["Stop not less than 1.5 m (5 ft.) from the nearest rail", "Increase speed and cross tracks as quickly as possible", "Stop not less than 5 m (15 ft.) from the nearest rail", "Slow down and proceed with caution"], correctAnswer: 2 },
  { id: 31, question: "Upon approaching a Yield-sign, what does the law require you to do?", options: ["Slow down, stop if necessary, and yield right-of-way", "Stop, then enter traffic slowly", "Stop, then enter traffic quickly", "Speed up and force your way into traffic"], correctAnswer: 0 },
  { id: 32, question: "When does the law require lights on vehicles to be turned on?", options: ["Between sunset and sunrise", "Between dusk and dawn and at any other time you cannot see clearly for a distance of 150 m (500 ft.)", "Between half an hour before sunset to half an hour after sunrise and at any other time you cannot see clearly for a distance of 150 m (500 ft.)", "No specified time"], correctAnswer: 2 },
  { id: 33, question: "A person whose driver's licence is under suspension, may", options: ["Operate a motor vehicle in a case of extreme emergency", "Operate a motor vehicle to and from work", "Operate a motor vehicle when accompanied by a licensed driver", "Not operate a motor vehicle under any conditions"], correctAnswer: 3 },
  { id: 34, question: "If the signal light changes from green to amber as you approach an intersection, what should you do?", options: ["Stop. If a stop cannot be made safely proceed with caution", "Speed up to clear the intersection as quickly as possible", "Continue through the intersection without slowing or stopping", "Sound horn to warn pedestrians and other drivers that you do not intend to stop"], correctAnswer: 0 },
  { id: 35, question: "When a streetcar is stopped to take on or discharge passengers, where there is no safety zone, what does the law require you to do before passing the streetcar?", options: ["Stop behind the rear of the streetcar and then proceed", "Sound horn and pass with caution", "Pass on the left side when the way is clear", "Stop 2 m (6 ft.) behind the rearmost door where passengers are getting on or off, and proceed only when it is safe to do so"], correctAnswer: 3 },
  { id: 36, question: "On a roadway where traffic is moving in both directions, in what position must you be before making a left turn?", options: ["Close to the right-hand side of the roadway", "Close to the left side of the roadway", "Immediately to the right of the centre line of the roadway", "Does not matter"], correctAnswer: 2 },
  { id: 37, question: "Upon approaching a stop sign, a driver must", options: ["Slow down, sound horn and then proceed", "Slow down, and if the way is clear, proceed", "Stop, sound horn, then proceed", "Stop, and when it is safe to do so, proceed"], correctAnswer: 3 },
  { id: 38, question: "You should under all condition drive at a speed which will allow you to", options: ["Stop within 90 metres (300 feet)", "Stop within 60 metres (200 feet)", "Stop within a safe distance", "Stop within 150 metres (500 feet)"], correctAnswer: 2 },
  { id: 39, question: "The Ministry of Transportation may suspend a licence after a 9 Demerit Point interview", options: ["If a driver fails to give satisfactory reasons why their licence should not be suspended", "If a driver does not have at least 5 years driving experience", "If the licence is not needed for business reasons", "The Ministry is not permitted to suspend a licence before the 15-point level is reached"], correctAnswer: 0 },
  { id: 40, question: "A 'School Bus', with red signal lights flashing, is stopped on a highway that has no median strip. What does the law require you to do when meeting or overtaking the bus?", options: ["Does not matter provided you sound horn", "Stop until the bus proceeds or the signal lights are no longer flashing", "Wait for approaching vehicles to pass", "Reduce speed and pass with care"], correctAnswer: 1 },
  { id: 41, question: "Which of the following penalties can the court impose on a person convicted of driving 50 km/h (30 m.p.h.) or more over the speed limit?", options: ["Suspension of licence for 6 months", "Suspension of licence for 30 days", "Impoundment of motor vehicle for 6 months", "Imprisonment of person for 6 months"], correctAnswer: 1 },
  { id: 42, question: "Before moving your car from a parked position, you should", options: ["Check other traffic, signal and pull from the curb quickly", "Honk your horn and pull from the curb slowly", "Check other traffic, signal and pull from the curb when it is safe to do so", "Signal and pull from the curb"], correctAnswer: 2 },
  { id: 43, question: "Should your right wheels drop off the roadway, what is the best way to get back on the roadway?", options: ["Steer hard to the left", "Apply brakes and steer hard to the left", "Take foot off gas pedal, turn back when vehicle has slowed", "Apply brakes to reduce speed"], correctAnswer: 2 },
  { id: 44, question: "When 15 or more Demerit Points have accumulated on a record, the driver's licence is suspended", options: ["Automatically, and for 30 days from receipt of licence", "At the discretion of the Ministry", "Only if the licence is NOT used for business purposes", "For 3 months"], correctAnswer: 0 },
  { id: 45, question: "When the driver of another vehicle is about to overtake and pass your vehicle you must", options: ["Move to the right and allow such vehicle to pass", "Speed up so that passing is not necessary", "Signal the other driver not to pass", "Move to the left to prevent passing"], correctAnswer: 0 },
  { id: 46, question: "When descending a steep hill a good safe-driving practice is to", options: ["Gear down and allow the engine to assist in braking", "Turn off the ignition", "Place the gear shift in neutral", "Disengage the clutch and coast"], correctAnswer: 0 },
  { id: 47, question: "A driver may be required to attend an interview and re-examination of his driving ability", options: ["When 9 demerit points have been accumulated", "When 3 demerit points have been accumulated", "When 6 demerit points have been accumulated", "When 15 demerit points have been accumulated"], correctAnswer: 0 },
  { id: 48, question: "When may you lend your driver's licence?", options: ["Never", "To another person who is learning to drive", "For identification purposes only", "In emergencies"], correctAnswer: 0 },
  { id: 49, question: "When a red signal light with a green arrow is shown at an intersection it means", options: ["Stop and wait for the green light before making a turn in the direction of the arrow", "Proceed with caution in the direction of the arrow, yielding right-of-way to pedestrians and other traffic", "Stop and then proceed", "The green arrow is a signal for pedestrians only"], correctAnswer: 1 },
  { id: 50, question: "Are drivers responsible for their passengers buckling up?", options: ["Only if passengers are over sixteen years of age", "Only if passengers are from five years of age up to sixteen", "Only if the passengers are in the front seat", "Only if passengers are over eighteen years of age"], correctAnswer: 1 },
  { id: 51, question: "When it is safe to do so, passing other vehicles on the right side", options: ["Is permitted on any street or highway", "Is permitted providing it is possible to do so by driving on the shoulder of the road", "Is not permitted under any circumstances", "Is permitted when the street or highway has two or more lanes for traffic in the direction you are travelling"], correctAnswer: 3 },
  { id: 52, question: "When a right turn against a red signal light is permitted, what does the law require you to do before entering the intersection and making the turn?", options: ["Slow down, proceed with caution", "Stop, then edge into traffic", "Stop, signal, make the turn so as not to interfere with other traffic, including pedestrians", "Slow down, signal and turn"], correctAnswer: 2 },
  { id: 53, question: "A flashing green light at an intersection, where turns to the left and right are permitted, means", options: ["You may turn to the left if the way is clear", "You may turn to the right if the way is clear", "You may proceed straight through if the way is clear", "You may do any of the above"], correctAnswer: 3 },
  { id: 54, question: "Under which of the following conditions is it dangerous and unlawful to make a 'U' turn?", options: ["Upon a curve or on a hill where there is a clear view of less than 150 m (500 ft.) in either direction", "On a railway crossing or within 30 m (100 ft.) of a railway crossing", "Within 150 m (500 ft.) of a bridge, viaduct or tunnel if driver's view is obstructed", "Under all of the above conditions"], correctAnswer: 3 },
  { id: 55, question: "If you are involved in an accident in which someone is injured you must", options: ["Report the accident at once to the nearest provincial or municipal police officer", "Report the accident within 48 hours to the nearest provincial or municipal police officer", "Report the accident to your insurance company only", "Report the accident to the Ministry of Transportation and Communications only"], correctAnswer: 0 },
  { id: 56, question: "How soon after a licensed driver changes his/her name or address is he/she required to notify the Ministry of Transportation and Communications?", options: ["Within 6 days", "Within 15 days", "Within 30 days", "At any time prior to renewal of licence"], correctAnswer: 0 },
  { id: 57, question: "A flashing red signal light at an intersection means", options: ["Slow down and drive with increased caution", "Slow down and if necessary yield right-of-way to cars approaching from the left or right", "Signal light is out of order, proceed with caution", "Stop. Proceed only when it is safe to do so"], correctAnswer: 3 },
  { id: 58, question: "When entering a freeway you should", options: ["Stop on acceleration lane, wait for an opening, then enter the freeway rapidly", "Accelerate quickly to freeway speed and merge with freeway traffic", "Slow down, and then enter freeway at a sharp angle", "Drive slowly and be prepared to stop for freeway traffic"], correctAnswer: 1 },
  { id: 59, question: "A flashing blue light mounted on a motor vehicle indicates", options: ["A motor vehicle carrying explosives", "Snow removal equipment", "An ambulance", "A police emergency vehicle"], correctAnswer: 1 },
  { id: 60, question: "When a truck becomes disabled on the highway, where the speed limit is in excess of 60 km/h flares or reflectors must be placed approximately what distance ahead of and to the rear of the disabled vehicle?", options: ["15 m (50 ft.)", "30 m (100 ft.)", "60 m (200 ft.)", "90 m (300 ft.)"], correctAnswer: 1 },
  { id: 61, question: "When selling a motor vehicle to another person, you, the seller, should", options: ["Notify the Ministry of the change of ownership within six days of date of sale", "Go with the buyer to a vehicle licence issuing office to carry out the change of ownership", "If selling the vehicle without a Safety Standards Certificate, you must return the vehicle licence plates and motor vehicle permit to a vehicle licence issuing office and obtain an Unfit Vehicle Permit in the buyer's name", "All of the above"], correctAnswer: 3 },
  { id: 62, question: "At 15 Demerit points, your licence is suspended, after 30 days, the number of points on the driver's record is", options: ["Reduce to 7 points", "Reduce to 0 points", "Reduce to 5 points", "None of the above"], correctAnswer: 0 },
  { id: 63, question: "When approaching an intersection where a traffic signal light is red and a policeman motions you to go through, you should", options: ["Wait for the light to turn green", "Obey the policeman's signal and go through at once", "Call the policeman's attention to the red light", "Stop to make sure he wants you to go through"], correctAnswer: 1 },
  { id: 64, question: "Except when passing, what distance must be maintained between commercial vehicles travelling in the same direction on the highway outside a city, town or village?", options: ["30 m (100 ft.)", "60 m (200 ft.)", "120 m (400 ft.)", "150 m (500 ft.)"], correctAnswer: 1 },
  { id: 65, question: "At what level of alcohol in the blood can you be convicted of being an impaired driver?", options: ["0.03%", "0.05%", "0.08%", "1.0%"], correctAnswer: 2 },
  { id: 66, question: "If you are convicted of drinking and driving, you will lose your driver's licence on the first offence for", options: ["1 month", "3 months", "6 months", "1 year"], correctAnswer: 3 },
  { id: 67, question: "Unless otherwise posted, the maximum speed limit on the highway outside of a city, town, village or built-up area is", options: ["100 kilometres (60 miles) an hour", "80 kilometres (50 miles) an hour", "60 kilometres (40 miles) an hour", "50 kilometres (30 miles) an hour"], correctAnswer: 1 },
  { id: 68, question: "If you are driving and suddenly one of your tires blows out, you should", options: ["Concentrate on steering", "Take your foot off the gas pedal to slow down", "Bring the vehicle to a stop off the road", "All of the above"], correctAnswer: 3 },
  { id: 69, question: "When a streetcar is stopped to pick up or discharge passengers and there is a safety island, what does the law require you to do?", options: ["Pass with caution", "Stop at least 2 metres behind the safety island", "Sound horn and pass with caution", "Pass on the left side of the streetcar"], correctAnswer: 0 },
  { id: 70, question: "When getting out of your car on a busy street you should open your door", options: ["After making the proper signals", "When you turn on your four-way flashers", "When you are sure that it can be done safely", "It does not matter"], correctAnswer: 2 },
  { id: 71, question: "When exiting an expressway you should", options: ["Give yourself plenty of time to move over to the lane closest to the exit", "Slow down smoothly to the posted speed limit or to the prevailing speed on the exit ramp", "Signal and maintain your speed until you are off the ramp", "All of the above"], correctAnswer: 3 },
  { id: 72, question: "If two drivers enter an intersection from opposite directions at the same time, one going straight while the other is turning left, which vehicle has the right-of-way?", options: ["The one turning left", "The one going straight", "Both have the right-of-way", "Both cars should stop first and then proceed"], correctAnswer: 1 },
  { id: 73, question: "You should reduce your speed below the posted speed limits for which of the following reasons", options: ["Bad weather conditions", "When approaching and crossing an intersection", "In rush hour with stop and go traffic conditions", "All of the above"], correctAnswer: 3 },
  { id: 74, question: "When approaching a sign that reads 'merging traffic' you must", options: ["Stop your vehicle before proceeding", "Let the cars behind you go first", "Honk your horn first before proceeding", "Adjust your speed and position to avoid a collision with other vehicles"], correctAnswer: 3 },
  { id: 75, question: "Drivers who have vision restrictions noted on their driver's licence must always wear glasses or contact lenses when", options: ["Watching movies", "Driving", "Reading", "Sleeping"], correctAnswer: 1 },
  { id: 76, question: "If you are involved in an accident that was due to your use of a cellular phone while driving", options: ["Your insurance will increase", "You will be charged with careless driving and lose 6 demerit points", "Your licence will be suspended for one year", "You will have to take your road test again"], correctAnswer: 1 },
  { id: 77, question: "Why is it necessary to look over your shoulder when changing lanes?", options: ["It is a good exercise for your neck", "There will always be a blind spot in your mirrors, no matter how you adjust them", "To see who is driving", "All of the above"], correctAnswer: 1 },
  { id: 78, question: "If your brakes fail", options: ["Pump the brake pedal", "Apply the parking brake gently but firmly", "Keep your hand on the release button (of the parking brake)", "All of the above"], correctAnswer: 3 },
  { id: 79, question: "The police have the right to stop any driver they suspect is impaired. If you refuse to take a breathalyzer test, your licence will be suspended immediately for", options: ["30 days", "1 year", "60 days", "90 days"], correctAnswer: 3 },
  { id: 80, question: "If you are driving and your cellular phone rings, what should you do?", options: ["Pick up the phone quickly and talk briefly while driving", "Let your voice mail service take the call and check your messages when you are parked", "Answer the phone if there are no police around", "Turn-it-off, it is illegal to talk on the cellular while driving"], correctAnswer: 1 },
  { id: 81, question: "Snow tires are good for", options: ["Summer driving", "All season driving", "Winter driving", "Spring and fall only"], correctAnswer: 2 },
  { id: 82, question: "Level one drivers (G1) must keep their blood alcohol level at zero percent and be accompanied by a class G driver with a blood alcohol level of less than", options: ["0.00%", "0.05%", "0.08%", "0.03%"], correctAnswer: 1 },
  { id: 83, question: "You must report an accident to the police under what condition?", options: ["There is less than $600 damage", "The damage is over $1000", "If someone has been hurt or killed", "2 and 3 are correct"], correctAnswer: 3 },
  { id: 84, question: "As a level one or level two driver you will have your licence suspended if you collect 9 or more demerit points during a two year period. 60 days after suspension your record will be reduced to", options: ["6 points", "4 points", "Zero", "2 points"], correctAnswer: 1 },
  { id: 85, question: "Under the Highway Traffic Act, if you are convicted of driving while your licence is suspended, assuming it is your first offence, you will", options: ["Receive a fine of $500", "Be fined between $1000 to $5000", "Be sentenced to six months in jail", "All of the above"], correctAnswer: 1 },
  { id: 86, question: "At night when you meet another vehicle with blinding bright lights, the safest thing to do is", options: ["Open and shut your eyes rapidly", "Look at the headlights of the approaching vehicle", "Turn your lights on high beam", "Look slightly to the right hand side"], correctAnswer: 3 },
  { id: 87, question: "When two cars reach an uncontrolled intersection at approximately the same time the right-of-way should be given to", options: ["The one approaching from the left", "The one approaching from the right", "Neither one", "The one moving faster"], correctAnswer: 1 },
  { id: 88, question: "In what lane of traffic should you drive when you intend to make a right-hand turn?", options: ["Close to the left side of the roadway", "Close to the right-hand side of the roadway", "Close to the centre line of the roadway", "Does not matter"], correctAnswer: 1 },
  { id: 89, question: "When you are deciding whether or not to make a U turn, your first consideration should be to check", options: ["Traffic regulations", "Presence of trees, fire hydrants, or poles near the curb", "Turning radius of your car", "Height of curb"], correctAnswer: 0 },
  { id: 90, question: "What is the only effective way to remove alcohol from your body?", options: ["Drinking strong coffee", "Allow your body time to get rid of the alcohol", "Taking a cold shower", "Drinking more wine"], correctAnswer: 1 },
  { id: 91, question: "If you miss an expressway exit, what should you do?", options: ["Stop on the shoulder and check your map", "If there are no cars, you may back up", "Go straight and exit at the next exit", "Make a U-turn"], correctAnswer: 2 },
  { id: 92, question: "If you are involved in an accident and another person is injured you should", options: ["Keep talking to the injured person", "Move the injured person away from the vehicle immediately", "Do not move the injured person unnecessarily, keep the injured person warm and administer first aid if possible", "Don't talk to the injured person"], correctAnswer: 2 },
  { id: 93, question: "Before leaving your car parked on a downgrade, you should", options: ["Leave your front wheels parallel to the curb", "Turn your front wheels to the left and set your parking brake", "Set your parking brake only", "Turn your front wheels to the right and set your parking brake"], correctAnswer: 3 },
  { id: 94, question: "It is more dangerous to drive at the maximum speed limit at night than during day-time because", options: ["Some drivers unlawfully drive with parking lights only", "You cannot see as far ahead at night", "The roadway are more apt to be slippery at night", "Your reaction time is slower at night"], correctAnswer: 1 },
  { id: 95, question: "The broken centre line on a roadway means you may", options: ["Never pass", "Pass if the way is clear", "Pass at any time", "Pass only during daylight hours"], correctAnswer: 1 },
  { id: 96, question: "How close to a fire hydrant may you legally park?", options: ["3 metres (10 ft.)", "4.5 metres (15 ft.)", "1.5 metres (5 ft.)", "6 metres (20 ft.)"], correctAnswer: 0 },
  { id: 97, question: "Except when you intend to overtake and pass another vehicle or when you intend to make a left turn, you should", options: ["Drive in the centre of the roadway", "Always keep well to the right", "Drive on the shoulder of the highway", "Always keep well to the left"], correctAnswer: 1 },
  { id: 98, question: "Parking lights may be used", options: ["At any time", "For Parking only", "When driving in heavy fog", "When driving on well lighted street"], correctAnswer: 1 },
  { id: 99, question: "A solid centre line on the roadway is on your side of a broken centre line. What does the solid centre line mean?", options: ["It is unsafe to overtake and pass", "Pass only when no traffic is in sight", "It is safe to overtake and pass", "Pass at any time"], correctAnswer: 0 },
  { id: 100, question: "The best way to stop quickly on a wet or icy roadway is to", options: ["Pump the brake until you come to a stop", "Keep foot off brake and let compression stop you", "Slam on brake and try to prevent vehicle from skidding", "Apply brakes the same way you always do"], correctAnswer: 0 },
  { id: 101, question: "If you lose control of your vehicle and it goes off the road, you should", options: ["Grip the steering wheel firmly", "Take your foot off the gas pedal to slow down and avoid heavy braking", "When the vehicle is under control steer back to the road", "All of the above"], correctAnswer: 3 },
  { id: 102, question: "Under the Criminal Code, if you are caught driving while your licence is suspended, your vehicle will be impounded for?", options: ["1 year", "6 months", "45 days", "30 days"], correctAnswer: 0 },
  { id: 103, question: "When taking any medication, you should", options: ["Have someone follow you home", "Drive even slower", "Consult your doctor about the effects before driving", "Drink lots of water"], correctAnswer: 2 },
  { id: 104, question: "What should you do if your vehicle becomes disabled on the highway?", options: ["Park with all your four wheels off the travelled highway, if possible", "Stop where you are", "Stop in the right lane", "Stop in the left lane"], correctAnswer: 0 },
  { id: 105, question: "A defensive driver will", options: ["Drive faster in the rain", "Play music loudly", "Consider what other drivers might do and is always prepared", "Talk on the cell phone while driving"], correctAnswer: 2 },
  { id: 106, question: "Which of the following hand-and-arm signals is correct for slowing or stopping?", options: ["Arm out and up", "Arm straight out the window", "Arm out and down", "Circle motion"], correctAnswer: 2 },
  { id: 107, question: "You are required to keep a safe distance behind the vehicle in front of you at 50 kilometres (30 miles) an hour. You should keep at least", options: ["Seven car lengths behind the other vehicle", "Three car lengths behind the other vehicle", "One car length behind the other vehicle", "Five car lengths behind the other vehicle"], correctAnswer: 1 },
  { id: 108, question: "When driving a motor vehicle on the highway at night, you should use low beam headlights (dim lights) when", options: ["Approaching an intersection", "Meeting or following another vehicle", "Another driver dims his lights", "Blinded by the headlights of an approaching vehicle"], correctAnswer: 1 },
  { id: 109, question: "What must a driver do before entering a highway from a private road or driveway?", options: ["Sound horn and proceed with caution", "Enter or cross the highway as quickly as possible", "Give hand signal then take right-of-way", "Yield right-of-way to all vehicles approaching on the highway"], correctAnswer: 3 },
  { id: 110, question: "Demerit points lost will remain on your driver's record for a period of _____ from the date of offence.", options: ["One year", "Two years", "Three years", "Five years"], correctAnswer: 1 },
  { id: 111, question: "As a level one or level two driver, if you collect nine or more points during a two-year period, your licence will be suspended for", options: ["60 days", "30 days", "1 year", "15 days"], correctAnswer: 0 },
  { id: 112, question: "Highway 407 is", options: ["The longest highway in Ontario", "Is a new highway", "Is an express toll route (pay toll highway)", "An expressway to the USA"], correctAnswer: 2 },
  { id: 113, question: "To get your vehicle out of a skid, you should first", options: ["Steer in the opposite direction of the skid", "Steer straight ahead", "Apply brake hard", "Steer in the direction of the skid"], correctAnswer: 3 },
  { id: 114, question: "Most automobile skids are the result of", options: ["Under-inflated tires", "Over-inflated tires", "Snow or ice on the road", "Driving too fast"], correctAnswer: 3 },
  { id: 115, question: "Roadways are most slippery", options: ["During a heavy downpour", "After it has been raining for awhile", "The first rain after a dry spell", "In construction zones"], correctAnswer: 2 },
  { id: 116, question: "If you become very tired while driving you should", options: ["Stop and rest", "Drink coffee", "Drive faster to your destination", "Open your windows to allow fresh air in the car"], correctAnswer: 0 },
  { id: 117, question: "Hydroplaning occurs during heavy rain when a vehicle's tires ride up above the water on the roadway. To help prevent hydroplaning you should", options: ["Ensure that your tires on your vehicle have good tread depth", "Ensure that the tires on the vehicle are inflated to the proper tire pressure", "Reduce vehicle speed when driving in the rain", "All of the above"], correctAnswer: 3 },
  { id: 118, question: "The two-second rule is used to determine", options: ["How fast they can react to obstacles", "How fast they are travelling", "How much gas you will save", "If they are following at a safe distance"], correctAnswer: 3 },
  { id: 119, question: "When approaching a construction area, drivers should", options: ["Honk the horn a few times to let the workers know you are approaching", "Watch for children", "Slow down and yield the right-of-way", "Speed up to get out of the area quicker"], correctAnswer: 2 },
  { id: 120, question: "When are broken white lines (dashes) used on streets and highways?", options: ["On a two way street", "When it is a no stopping zone", "When passing is permitted", "On a one way street or highway that has more than one lane of traffic moving in the same direction"], correctAnswer: 3 },
  { id: 121, question: "If you are approaching an intersection and the traffic lights are not working, you should", options: ["Yield to the traffic to your right", "Stop until no cars are passing and then go", "Treat it as a four way stop sign", "Slow down and proceed with caution"], correctAnswer: 2 },
  { id: 122, question: "When approaching an intersection and you notice the roadway beyond the intersection is blocked with traffic, you should", options: ["Keep as close as possible to the car ahead", "Proceed slowly into the intersection until the traffic ahead moves on", "Stop before entering the intersection and wait until traffic ahead moves on", "Sound horn to warn cars ahead to move on"], correctAnswer: 2 },
  { id: 123, question: "Level one and level two drivers must have a blood alcohol level of zero when driving. New drivers caught drinking and driving will be charged under the Criminal Code and will get how many days suspension?", options: ["30 days", "60 days", "90 days", "1 year"], correctAnswer: 0 },
];

// ── Attempt Tracker (in-memory) ───────────────────────────────────────────────
// attempts: { [qId]: { correct: number, wrong: number, lastResult: 'correct'|'wrong' } }
const useAttemptTracker = () => {
  const [attempts, setAttempts] = useState({});
  const record = useCallback((qId, isCorrect) => {
    setAttempts(prev => {
      const cur = prev[qId] || { correct: 0, wrong: 0, lastResult: null };
      return {
        ...prev,
        [qId]: {
          correct: cur.correct + (isCorrect ? 1 : 0),
          wrong: cur.wrong + (isCorrect ? 0 : 1),
          lastResult: isCorrect ? 'correct' : 'wrong',
        }
      };
    });
  }, []);
  const reset = useCallback(() => setAttempts({}), []);
  return { attempts, record, reset };
};

// ── Timer Hook ─────────────────────────────────────────────────────────────────
const useTimer = (initialSeconds, onExpire) => {
  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const [running, setRunning] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (running && timeLeft > 0) {
      ref.current = setTimeout(() => setTimeLeft(t => t - 1), 1000);
    } else if (running && timeLeft === 0) {
      setRunning(false);
      onExpire?.();
    }
    return () => clearTimeout(ref.current);
  }, [running, timeLeft]);

  const start = () => setRunning(true);
  const pause = () => setRunning(false);
  const reset = (secs) => { setRunning(false); setTimeLeft(secs ?? initialSeconds); };
  return { timeLeft, running, start, pause, reset };
};

const formatTime = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
const TIMED_TEST_SECONDS = 20 * 60; // 20 minutes for 20 questions

// ── Landing ───────────────────────────────────────────────────────────────────
function Landing({ onSelect, onBack, attempts }) {
  const [hov, setHov] = useState(null);
  const totalAttempted = Object.keys(attempts).length;
  const totalCorrect = Object.values(attempts).filter(a => a.lastResult === 'correct').length;

  const cards = [
    {
      key: "practice", icon: <BookOpen size={26} color={C.primary} />, iconBg: "rgba(26,86,219,0.18)",
      bg: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
      title: "Practice Mode", desc: "Review all 123 rules questions at your own pace with expandable answers.",
      tag: `${rulesData.length} Questions · Self-paced`, tagStyle: { background: "rgba(26,86,219,0.35)", color: "#93c5fd" }
    },
    {
      key: "test", icon: <ClipboardList size={26} color={C.white} />, iconBg: "rgba(255,255,255,0.2)",
      bg: "linear-gradient(135deg,#1a56db 0%,#7c3aed 100%)", border: "none",
      title: "Test Mode", desc: "20 random questions. Score 16/20 to pass — just like the real G1 exam.",
      tag: "20 Questions · Pass: 16/20", tagStyle: { background: "rgba(255,255,255,0.2)", color: C.white }
    },
    {
      key: "timed", icon: <Timer size={26} color="#f59e0b" />, iconBg: "rgba(245,158,11,0.2)",
      bg: "rgba(255,255,255,0.05)", border: "1px solid rgba(245,158,11,0.25)",
      title: "Timed Test", desc: "20 minutes, 20 questions. Race the clock to simulate real exam pressure.",
      tag: "20 min · Pressure Mode", tagStyle: { background: "rgba(245,158,11,0.2)", color: "#fcd34d" }
    },
    {
      key: "flashcard", icon: <Layers size={26} color="#10b981" />, iconBg: "rgba(16,185,129,0.2)",
      bg: "rgba(255,255,255,0.05)", border: "1px solid rgba(16,185,129,0.25)",
      title: "Flashcard Mode", desc: "Flip cards to test your recall. Great for quick review before the exam.",
      tag: `${rulesData.length} Cards · Flip to reveal`, tagStyle: { background: "rgba(16,185,129,0.2)", color: "#6ee7b7" }
    },
    {
      key: "progress", icon: <BarChart2 size={26} color="#a78bfa" />, iconBg: "rgba(167,139,250,0.2)",
      bg: "rgba(255,255,255,0.05)", border: "1px solid rgba(167,139,250,0.25)",
      title: "Progress Report", desc: "See your attempt history, weak spots, and overall mastery score.",
      tag: `${totalAttempted} Tracked · ${totalCorrect} Correct`, tagStyle: { background: "rgba(167,139,250,0.2)", color: "#c4b5fd" }
    },
  ];

  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(145deg,${C.n900} 0%,#1a3460 50%,${C.n900} 100%)`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "48px 20px", fontFamily: font, position: "relative" }}>
      <button onClick={onBack} style={{ position: "absolute", top: 24, left: 24, display: "flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.18)", borderRadius: 8, padding: "7px 14px", cursor: "pointer", color: "rgba(255,255,255,0.75)", fontSize: "0.875rem", fontWeight: 600 }}>
        <ArrowLeft size={15} /> Home
      </button>
      <div style={{ background: "rgba(245,158,11,0.12)", border: "1px solid rgba(245,158,11,0.35)", color: C.accent, padding: "5px 18px", borderRadius: "50px", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 28 }}>📖 Ontario G1 Prep</div>
      <h1 style={{ fontSize: "clamp(2.2rem,5vw,3.8rem)", fontWeight: 900, color: C.white, textAlign: "center", lineHeight: 1.1, letterSpacing: "-0.025em", margin: "0 0 18px" }}>Rules of<br /><span style={{ color: C.accent }}>the Road</span></h1>
      <p style={{ color: C.n400, fontSize: "1.05rem", textAlign: "center", margin: "0 0 44px", maxWidth: "460px", lineHeight: 1.75 }}>Master Ontario's driving rules with 5 study modes designed for the G1 exam.</p>

      <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center", width: "100%", maxWidth: 900 }}>
        {cards.map(card => (
          <div key={card.key} onClick={() => onSelect(card.key)} onMouseEnter={() => setHov(card.key)} onMouseLeave={() => setHov(null)}
            style={{ flex: "1 1 260px", maxWidth: 290, background: card.bg, border: card.border, borderRadius: 22, padding: "28px 24px", cursor: "pointer", display: "flex", flexDirection: "column", gap: 12, transform: hov === card.key ? "translateY(-6px)" : "none", boxShadow: hov === card.key ? "0 20px 56px rgba(0,0,0,0.5)" : "0 4px 20px rgba(0,0,0,0.2)", transition: "transform 0.22s ease, box-shadow 0.22s ease" }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: card.iconBg, display: "flex", alignItems: "center", justifyContent: "center" }}>{card.icon}</div>
            <h2 style={{ color: C.white, fontSize: "1.2rem", fontWeight: 800, margin: 0 }}>{card.title}</h2>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.84rem", lineHeight: 1.65, margin: 0, flex: 1 }}>{card.desc}</p>
            <div style={{ ...card.tagStyle, padding: "5px 12px", borderRadius: 7, fontSize: "0.75rem", fontWeight: 700, alignSelf: "flex-start", marginTop: 4 }}>{card.tag}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 48, marginTop: 52 }}>
        {[[`${rulesData.length}`, "Total Questions"], ["20", "Test Qs"], ["80%", "Pass Mark"], [totalAttempted > 0 ? `${Math.round((totalCorrect / totalAttempted) * 100)}%` : "—", "Accuracy"]].map(([n, l]) => (
          <div key={l} style={{ textAlign: "center" }}>
            <span style={{ display: "block", fontSize: "2rem", fontWeight: 900, color: C.white }}>{n}</span>
            <span style={{ display: "block", fontSize: "0.68rem", color: C.n400, textTransform: "uppercase", letterSpacing: "0.1em", marginTop: 4 }}>{l}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Practice Mode ─────────────────────────────────────────────────────────────
function PracticeMode({ onBack }) {
  const [revealed, setRevealed] = useState({});
  const [expanded, setExpanded] = useState({});
  const [showProgress, setShowProgress] = useState(false);
  const [page, setPage] = useState(0);
  const PER_PAGE = 10;
  const pages = Math.ceil(rulesData.length / PER_PAGE);
  const pageData = rulesData.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE);

  const toggleExpand = id => setExpanded(p => ({ ...p, [id]: !p[id] }));
  const toggleReveal = (e, id) => { e.stopPropagation(); setRevealed(p => ({ ...p, [id]: !p[id] })); };
  const count = Object.values(revealed).filter(Boolean).length;
  const pct = Math.round((count / rulesData.length) * 100);

  return (
    <div style={{ minHeight: "100vh", background: C.n50, fontFamily: font }}>
      <PageHeader title="📖 Practice Mode — Rules" onBack={onBack} rightEl={<div style={{ background: C.primaryLight, color: C.primary, fontWeight: 700, fontSize: "0.82rem", padding: "6px 14px", borderRadius: "50px" }}>{count}/{rulesData.length} reviewed</div>} />
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "32px 20px 72px" }}>
        {showProgress && (
          <div style={{ background: `linear-gradient(135deg,${C.primary} 0%,#7c3aed 100%)`, borderRadius: 18, padding: "26px 28px", color: C.white, marginBottom: 28 }}>
            <div style={{ fontSize: "0.78rem", opacity: 0.75, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.08em" }}>Study Progress</div>
            <div style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: 12 }}>{pct}% Complete — {count} of {rulesData.length} questions reviewed</div>
            <div style={{ height: 10, borderRadius: 10, background: "rgba(255,255,255,0.22)", overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${pct}%`, background: C.white, borderRadius: 10, transition: "width 0.6s ease" }} />
            </div>
          </div>
        )}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {pageData.map(q => {
            const open = !!expanded[q.id]; const shown = !!revealed[q.id];
            return (
              <div key={q.id} style={{ background: C.white, border: `2px solid ${shown ? C.success : C.n200}`, borderRadius: 16, overflow: "hidden", boxShadow: shown ? "0 4px 20px rgba(5,150,105,0.1)" : "0 2px 8px rgba(0,0,0,0.04)", transition: "border-color 0.2s" }}>
                <div onClick={() => toggleExpand(q.id)} style={{ display: "flex", alignItems: "center", padding: "14px 18px", cursor: "pointer", gap: 12 }}>
                  <span style={{ background: shown ? C.successBg : C.primaryLight, color: shown ? C.success : C.primary, fontWeight: 700, fontSize: "0.73rem", padding: "3px 9px", borderRadius: 6, flexShrink: 0 }}>Q{q.id}</span>
                  <span style={{ flex: 1, color: C.n700, fontSize: "0.92rem", fontWeight: 500, lineHeight: 1.5 }}>{q.question}</span>
                  <button onClick={e => toggleReveal(e, q.id)} title={shown ? "Hide answer" : "Reveal answer"} style={{ width: 34, height: 34, borderRadius: 8, border: "none", background: shown ? C.successBg : C.n100, color: shown ? C.success : C.n500, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.2s" }}>
                    {shown ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                  <div style={{ width: 30, height: 30, borderRadius: 8, background: C.n100, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {open ? <ChevronUp size={15} color={C.n500} /> : <ChevronDown size={15} color={C.n500} />}
                  </div>
                </div>
                {open && (
                  <div style={{ padding: "0 18px 18px", borderTop: `1px solid ${C.n100}` }}>
                    <p style={{ margin: "14px 0", color: C.n800, fontWeight: 700, fontSize: "0.95rem" }}>{q.question}</p>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      {q.options.map((opt, i) => {
                        const correct = i === q.correctAnswer; const highlight = shown && correct;
                        return (
                          <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "11px 14px", borderRadius: 10, background: highlight ? C.successBg : C.n100, border: `1.5px solid ${highlight ? C.success : "transparent"}` }}>
                            <div style={{ width: 28, height: 28, borderRadius: 7, background: highlight ? C.success : C.n300, color: C.white, fontWeight: 700, fontSize: "0.78rem", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{LETTERS[i]}</div>
                            <span style={{ flex: 1, color: highlight ? C.success : C.n700, fontWeight: highlight ? 600 : 400, fontSize: "0.9rem" }}>{opt}</span>
                            {highlight && <CheckCircle size={15} color={C.success} />}
                          </div>
                        );
                      })}
                    </div>
                    {!shown && (
                      <button onClick={e => toggleReveal(e, q.id)} style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 6, background: C.primaryLight, border: "none", color: C.primary, padding: "8px 16px", borderRadius: 8, fontWeight: 600, fontSize: "0.85rem", cursor: "pointer" }}>
                        <Eye size={14} /> Reveal Answer
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 12, marginTop: 28 }}>
          <button onClick={() => { setPage(p => p - 1); window.scrollTo(0, 0); }} disabled={page === 0} style={{ background: page === 0 ? C.n100 : C.white, border: `1px solid ${C.n200}`, color: page === 0 ? C.n400 : C.n700, fontWeight: 600, fontSize: "0.87rem", padding: "8px 18px", borderRadius: 8, cursor: page === 0 ? "default" : "pointer" }}>← Previous</button>
          <span style={{ color: C.n500, fontSize: "0.87rem", fontWeight: 600 }}>Page {page + 1} of {pages}</span>
          <button onClick={() => { setPage(p => p + 1); window.scrollTo(0, 0); }} disabled={page === pages - 1} style={{ background: page === pages - 1 ? C.n100 : C.white, border: `1px solid ${C.n200}`, color: page === pages - 1 ? C.n400 : C.n700, fontWeight: 600, fontSize: "0.87rem", padding: "8px 18px", borderRadius: 8, cursor: page === pages - 1 ? "default" : "pointer" }}>Next →</button>
        </div>
        <div style={{ display: "flex", justifyContent: "center", marginTop: 28 }}>
          <button onClick={() => setShowProgress(p => !p)} style={{ background: `linear-gradient(135deg,${C.primary} 0%,#7c3aed 100%)`, color: C.white, border: "none", padding: "14px 38px", borderRadius: "50px", fontSize: "0.97rem", fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 8, boxShadow: "0 6px 24px rgba(26,86,219,0.35)" }}>
            <Trophy size={18} /> {showProgress ? "Hide Progress" : "Check My Progress"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Shared Test Engine (used by both Test Mode + Timed Test) ──────────────────
function TestEngine({ onBack, timed, record }) {
  const [questions] = useState(() => [...rulesData].sort(() => Math.random() - 0.5).slice(0, 20));
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [hovOpt, setHovOpt] = useState(null);
  const [timeTaken, setTimeTaken] = useState(0);

  const submitTest = () => {
    setTimeTaken(timed ? TIMED_TEST_SECONDS - timeLeft : 0);
    questions.forEach(q => {
      if (answers[q.id] !== undefined) {
        record(q.id, answers[q.id] === q.correctAnswer);
      }
    });
    setSubmitted(true);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleExpire = useCallback(() => {
    if (!submitted) submitTest();
  }, [submitted]);

  const { timeLeft, start } = useTimer(TIMED_TEST_SECONDS, handleExpire);

  useEffect(() => {
    if (timed && !submitted) start();
  }, [timed]); // eslint-disable-line react-hooks/exhaustive-deps

  const q = questions[current];
  const totalAnswered = Object.keys(answers).length;
  const score = submitted ? questions.filter(q => answers[q.id] === q.correctAnswer).length : null;
  const passed = score !== null && score >= 16;
  const timerColor = timeLeft < 120 ? C.danger : timeLeft < 300 ? C.accent : C.success;

  const selectAnswer = (qId, idx) => { if (submitted) return; setAnswers(p => ({ ...p, [qId]: idx })); };

  const getState = (qId, idx) => {
    const sel = answers[qId];
    const correct = questions.find(q => q.id === qId)?.correctAnswer;
    if (!submitted) return sel === idx ? "selected" : "default";
    if (idx === correct) return sel === idx ? "correct" : "missed";
    if (sel === idx) return "wrong";
    return "default";
  };

  if (submitted) {
    const unanswered = 20 - totalAnswered;
    return (
      <div style={{ minHeight: "100vh", background: C.n50, fontFamily: font }}>
        <PageHeader title={`📋 ${timed ? "Timed Test" : "Test"} Results`} onBack={onBack} />
        <div style={{ maxWidth: 700, margin: "0 auto", padding: "32px 20px 72px" }}>
          <div style={{ background: passed ? `linear-gradient(135deg,${C.success} 0%,#047857 100%)` : `linear-gradient(135deg,${C.danger} 0%,#991b1b 100%)`, borderRadius: 22, padding: "40px 32px", color: C.white, textAlign: "center", marginBottom: 32 }}>
            <div style={{ fontSize: "3rem", marginBottom: 8 }}>{passed ? "🎉" : "📚"}</div>
            <div style={{ fontSize: "1.8rem", fontWeight: 900, marginBottom: 4 }}>{passed ? "You Passed!" : "Keep Studying"}</div>
            <div style={{ fontSize: "4.5rem", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1 }}>{score}/20</div>
            {timed && timeTaken > 0 && <div style={{ opacity: 0.8, fontSize: "0.9rem", marginTop: 8 }}>⏱ Time used: {formatTime(timeTaken)}</div>}
            {unanswered > 0 && <div style={{ opacity: 0.7, fontSize: "0.85rem", marginTop: 4 }}>({unanswered} question{unanswered !== 1 ? "s" : ""} left unanswered)</div>}
            <div style={{ opacity: 0.8, fontSize: "1rem", marginTop: 10 }}>{passed ? "Excellent! You've met the passing threshold of 16/20." : `You need ${16 - score} more correct answer${16 - score !== 1 ? "s" : ""} to pass.`}</div>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 28 }}>
              <button onClick={onBack} style={{ background: "rgba(255,255,255,0.2)", border: "1.5px solid rgba(255,255,255,0.45)", color: C.white, padding: "10px 24px", borderRadius: 10, fontWeight: 700, cursor: "pointer", fontSize: "0.9rem" }}>Back</button>
              <button onClick={() => window.location.reload()} style={{ background: C.white, border: "none", color: C.n800, padding: "10px 24px", borderRadius: 10, fontWeight: 700, cursor: "pointer", fontSize: "0.9rem", display: "flex", alignItems: "center", gap: 6 }}><RotateCcw size={14} /> Try Again</button>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {questions.map((q, qi) => {
              const correct = answers[q.id] === q.correctAnswer;
              return (
                <div key={q.id} style={{ background: C.white, borderRadius: 16, padding: 20, borderLeft: `4px solid ${correct ? C.success : answers[q.id] === undefined ? C.n300 : C.danger}`, boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                    <span style={{ background: correct ? C.successBg : answers[q.id] === undefined ? C.n100 : C.dangerBg, color: correct ? C.success : answers[q.id] === undefined ? C.n400 : C.danger, fontWeight: 700, fontSize: "0.73rem", padding: "3px 9px", borderRadius: 6 }}>Q{qi + 1}</span>
                    {answers[q.id] === undefined ? <AlertCircle size={15} color={C.n400} /> : correct ? <CheckCircle size={15} color={C.success} /> : <XCircle size={15} color={C.danger} />}
                    <span style={{ fontSize: "0.8rem", color: correct ? C.success : answers[q.id] === undefined ? C.n400 : C.danger, fontWeight: 600 }}>{answers[q.id] === undefined ? "Unanswered" : correct ? "Correct" : "Incorrect"}</span>
                  </div>
                  <p style={{ margin: "0 0 12px", color: C.n800, fontWeight: 600, fontSize: "0.92rem" }}>{q.question}</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                    {q.options.map((opt, i) => {
                      const st = getState(q.id, i); const ss = stateStyles[st];
                      return (
                        <div key={i} style={{ display: "flex", alignItems: "center", gap: 9, padding: "9px 12px", borderRadius: 9, background: ss.bg, border: `1.5px solid ${ss.border}` }}>
                          <div style={{ width: 24, height: 24, borderRadius: 6, background: ss.letterBg, color: ss.letterColor, fontWeight: 700, fontSize: "0.75rem", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{LETTERS[i]}</div>
                          <span style={{ flex: 1, color: ss.textColor, fontWeight: st !== "default" ? 600 : 400, fontSize: "0.86rem" }}>{opt}</span>
                          {st === "correct" && <CheckCircle size={13} color={C.success} />}
                          {st === "wrong" && <XCircle size={13} color={C.danger} />}
                          {st === "missed" && <span style={{ fontSize: "0.68rem", color: C.success, fontWeight: 700 }}>✓ Correct</span>}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: C.n50, fontFamily: font }}>
      <PageHeader
        title={`📋 ${timed ? "⏱ Timed " : ""}Test Mode — Rules`}
        onBack={onBack}
        rightEl={
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            {timed && (
              <div style={{ background: timeLeft < 120 ? C.dangerBg : timeLeft < 300 ? "rgba(245,158,11,0.1)" : C.successBg, color: timerColor, fontWeight: 800, fontSize: "1rem", padding: "5px 14px", borderRadius: "50px", border: `1.5px solid ${timerColor}`, display: "flex", alignItems: "center", gap: 6 }}>
                <Clock size={14} /> {formatTime(timeLeft)}
              </div>
            )}
            <div style={{ background: C.primaryLight, color: C.primary, fontWeight: 700, fontSize: "0.82rem", padding: "6px 14px", borderRadius: "50px" }}>{totalAnswered}/20 answered</div>
          </div>
        }
      />
      <div style={{ maxWidth: 680, margin: "0 auto", padding: "28px 20px 80px" }}>
        {/* Progress bar */}
        <div style={{ display: "flex", gap: 5, marginBottom: 24 }}>
          {questions.map((_, i) => {
            let bg = C.n200;
            if (answers[questions[i].id] !== undefined) bg = C.primary;
            if (i === current) bg = C.accent;
            return <div key={i} onClick={() => setCurrent(i)} style={{ flex: 1, height: 7, borderRadius: 7, background: bg, cursor: "pointer", transition: "background 0.25s" }} />;
          })}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
          <button onClick={() => setCurrent(c => c - 1)} disabled={current === 0} style={{ background: current === 0 ? C.n100 : C.white, border: `1px solid ${C.n200}`, color: current === 0 ? C.n400 : C.n700, fontWeight: 600, fontSize: "0.87rem", padding: "8px 18px", borderRadius: 8, cursor: current === 0 ? "default" : "pointer" }}>← Previous</button>
          <span style={{ color: C.n500, fontSize: "0.87rem", fontWeight: 600 }}>Question {current + 1} of 20 {answers[q.id] !== undefined && <span style={{ color: C.success }}>✓</span>}</span>
          <button onClick={() => setCurrent(c => c + 1)} disabled={current === 19} style={{ background: current === 19 ? C.n100 : C.white, border: `1px solid ${C.n200}`, color: current === 19 ? C.n400 : C.n700, fontWeight: 600, fontSize: "0.87rem", padding: "8px 18px", borderRadius: 8, cursor: current === 19 ? "default" : "pointer" }}>Next →</button>
        </div>
        <div style={{ background: C.white, borderRadius: 22, padding: 32, boxShadow: "0 6px 30px rgba(0,0,0,0.07)", marginBottom: 20 }}>
          <p style={{ margin: "0 0 22px", fontSize: "1.1rem", fontWeight: 700, color: C.n800, lineHeight: 1.6 }}>{q.question}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
            {q.options.map((opt, i) => {
              const st = answers[q.id] === i ? "selected" : "default"; const ss = stateStyles[st];
              const isHov = hovOpt === `${q.id}-${i}`;
              return (
                <div key={i} onClick={() => selectAnswer(q.id, i)} onMouseEnter={() => setHovOpt(`${q.id}-${i}`)} onMouseLeave={() => setHovOpt(null)} style={{ display: "flex", alignItems: "center", gap: 13, padding: "13px 16px", borderRadius: 12, background: isHov && st === "default" ? C.n200 : ss.bg, border: `2px solid ${isHov && st === "default" ? C.n300 : ss.border}`, cursor: "pointer", transition: "all 0.15s ease" }}>
                  <div style={{ width: 30, height: 30, borderRadius: 8, background: ss.letterBg, color: ss.letterColor, fontWeight: 700, fontSize: "0.83rem", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{LETTERS[i]}</div>
                  <span style={{ flex: 1, color: ss.textColor, fontWeight: st === "selected" ? 600 : 400, fontSize: "0.93rem" }}>{opt}</span>
                </div>
              );
            })}
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          {totalAnswered === 20
            ? <button onClick={submitTest} style={{ background: `linear-gradient(135deg,${C.primary} 0%,#7c3aed 100%)`, color: C.white, border: "none", padding: "15px 44px", borderRadius: "50px", fontSize: "1rem", fontWeight: 800, cursor: "pointer", boxShadow: "0 8px 28px rgba(26,86,219,0.38)" }}>Submit Test — See Results</button>
            : <div>
              <p style={{ color: C.n400, fontSize: "0.85rem", margin: "0 0 12px" }}>Answer all 20 questions to submit · {20 - totalAnswered} remaining</p>
              {timed && <button onClick={submitTest} style={{ background: C.n100, border: `1px solid ${C.n200}`, color: C.n500, padding: "10px 24px", borderRadius: "50px", fontSize: "0.85rem", fontWeight: 600, cursor: "pointer" }}>Submit anyway ({totalAnswered}/20 answered)</button>}
            </div>
          }
        </div>
      </div>
    </div>
  );
}

// ── Flashcard Mode ─────────────────────────────────────────────────────────────
function FlashcardMode({ onBack, record }) {
  const [deck] = useState(() => [...rulesData].sort(() => Math.random() - 0.5));
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [answered, setAnswered] = useState({}); // { [id]: 'correct'|'wrong' }
  const [filter, setFilter] = useState("all"); // all | wrong | unanswered
  const [animDir, setAnimDir] = useState(null); // 'left' | 'right'

  const filtered = deck.filter(q => {
    if (filter === "wrong") return answered[q.id] === "wrong";
    if (filter === "unanswered") return !answered[q.id];
    return true;
  });
  const total = filtered.length;
  const card = filtered[Math.min(index, total - 1)];

  const correctCount = Object.values(answered).filter(v => v === "correct").length;
  const wrongCount = Object.values(answered).filter(v => v === "wrong").length;

  const navigate = (dir) => {
    setAnimDir(dir);
    setTimeout(() => {
      setFlipped(false);
      setIndex(i => dir === "next" ? Math.min(i + 1, total - 1) : Math.max(i - 1, 0));
      setAnimDir(null);
    }, 180);
  };

  const handleAnswer = (correct) => {
    const q = filtered[index];
    setAnswered(p => ({ ...p, [q.id]: correct ? "correct" : "wrong" }));
    record(q.id, correct);
    if (index < total - 1) navigate("next");
    else setFlipped(false);
  };

  if (!card) return (
    <div style={{ minHeight: "100vh", background: C.n50, fontFamily: font }}>
      <PageHeader title="🃏 Flashcard Mode" onBack={onBack} />
      <div style={{ maxWidth: 600, margin: "80px auto", padding: "0 20px", textAlign: "center" }}>
        <div style={{ fontSize: "4rem", marginBottom: 16 }}>✅</div>
        <h2 style={{ color: C.n800, fontWeight: 800 }}>No cards in this filter!</h2>
        <p style={{ color: C.n500 }}>Try switching to a different filter.</p>
        <button onClick={() => { setFilter("all"); setIndex(0); }} style={{ marginTop: 20, background: C.primary, color: C.white, border: "none", padding: "12px 28px", borderRadius: 12, fontWeight: 700, cursor: "pointer" }}>Show All Cards</button>
      </div>
    </div>
  );

  const progress = total > 0 ? ((index + 1) / total) * 100 : 0;

  return (
    <div style={{ minHeight: "100vh", background: C.n50, fontFamily: font }}>
      <PageHeader
        title="🃏 Flashcard Mode"
        onBack={onBack}
        rightEl={
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <div style={{ background: C.successBg, color: C.success, fontWeight: 700, fontSize: "0.78rem", padding: "4px 11px", borderRadius: "50px" }}>✓ {correctCount}</div>
            <div style={{ background: C.dangerBg, color: C.danger, fontWeight: 700, fontSize: "0.78rem", padding: "4px 11px", borderRadius: "50px" }}>✗ {wrongCount}</div>
          </div>
        }
      />
      <div style={{ maxWidth: 680, margin: "0 auto", padding: "28px 20px 80px" }}>

        {/* Filter tabs */}
        <div style={{ display: "flex", gap: 8, marginBottom: 24, background: C.white, padding: 6, borderRadius: 12, border: `1px solid ${C.n200}` }}>
          {[["all", "All Cards", rulesData.length], ["unanswered", "Unanswered", rulesData.length - Object.keys(answered).length], ["wrong", "Need Review", wrongCount]].map(([key, label, count]) => (
            <button key={key} onClick={() => { setFilter(key); setIndex(0); setFlipped(false); }} style={{ flex: 1, padding: "8px 12px", borderRadius: 8, border: "none", background: filter === key ? C.primary : "transparent", color: filter === key ? C.white : C.n500, fontWeight: 700, fontSize: "0.8rem", cursor: "pointer", transition: "all 0.15s" }}>
              {label} <span style={{ opacity: 0.7 }}>({count})</span>
            </button>
          ))}
        </div>

        {/* Progress bar */}
        <div style={{ height: 6, background: C.n200, borderRadius: 6, marginBottom: 20, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${progress}%`, background: `linear-gradient(90deg,${C.primary},#7c3aed)`, borderRadius: 6, transition: "width 0.3s ease" }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
          <span style={{ color: C.n500, fontSize: "0.82rem", fontWeight: 600 }}>Card {Math.min(index + 1, total)} of {total}</span>
          <span style={{ color: C.n400, fontSize: "0.82rem" }}>Click card to flip</span>
        </div>

        {/* Card */}
        <div
          onClick={() => setFlipped(f => !f)}
          style={{
            minHeight: 280, borderRadius: 24, padding: "40px 36px",
            background: flipped ? `linear-gradient(135deg,${C.successBg} 0%,#d1fae5 100%)` : C.white,
            boxShadow: "0 8px 40px rgba(0,0,0,0.1)", cursor: "pointer",
            display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
            textAlign: "center", gap: 20, marginBottom: 24,
            border: `2px solid ${flipped ? C.success : C.n200}`,
            opacity: animDir ? 0 : 1,
            transform: animDir === "next" ? "translateX(-20px)" : animDir === "prev" ? "translateX(20px)" : "translateX(0)",
            transition: "opacity 0.18s, transform 0.18s, border-color 0.2s",
          }}
        >
          {!flipped ? (
            <>
              <div style={{ background: C.primaryLight, color: C.primary, fontWeight: 700, fontSize: "0.72rem", padding: "4px 12px", borderRadius: 6 }}>Q{card.id} — QUESTION</div>
              <p style={{ fontSize: "1.15rem", fontWeight: 700, color: C.n800, lineHeight: 1.65, margin: 0, maxWidth: 480 }}>{card.question}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, width: "100%", maxWidth: 440 }}>
                {card.options.map((opt, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderRadius: 10, background: C.n100, textAlign: "left" }}>
                    <div style={{ width: 26, height: 26, borderRadius: 6, background: C.n300, color: C.white, fontWeight: 700, fontSize: "0.75rem", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{LETTERS[i]}</div>
                    <span style={{ color: C.n700, fontSize: "0.88rem" }}>{opt}</span>
                  </div>
                ))}
              </div>
              <div style={{ color: C.n400, fontSize: "0.8rem", display: "flex", alignItems: "center", gap: 5 }}>
                <RefreshCw size={13} /> Tap to reveal answer
              </div>
            </>
          ) : (
            <>
              <div style={{ background: C.successBg, color: C.success, fontWeight: 700, fontSize: "0.72rem", padding: "4px 12px", borderRadius: 6 }}>✓ ANSWER</div>
              <div style={{ width: 52, height: 52, borderRadius: 14, background: C.success, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <CheckCircle size={28} color={C.white} />
              </div>
              <p style={{ fontSize: "1.1rem", fontWeight: 800, color: C.success, margin: 0, maxWidth: 440 }}>{card.options[card.correctAnswer]}</p>
              <p style={{ fontSize: "0.85rem", color: C.n600, margin: 0 }}>
                Option <strong>{LETTERS[card.correctAnswer]}</strong> — {card.question}
              </p>
            </>
          )}
        </div>

        {/* Action buttons */}
        {flipped && (
          <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
            <button onClick={() => handleAnswer(false)} style={{ flex: 1, padding: "14px", borderRadius: 14, border: `2px solid ${C.danger}`, background: C.dangerBg, color: C.danger, fontWeight: 700, fontSize: "0.9rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
              <XCircle size={18} /> Got it Wrong
            </button>
            <button onClick={() => handleAnswer(true)} style={{ flex: 1, padding: "14px", borderRadius: 14, border: `2px solid ${C.success}`, background: C.successBg, color: C.success, fontWeight: 700, fontSize: "0.9rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
              <CheckCircle size={18} /> Got it Right!
            </button>
          </div>
        )}

        {/* Navigation */}
        <div style={{ display: "flex", justifyContent: "center", gap: 12, alignItems: "center" }}>
          <button onClick={() => navigate("prev")} disabled={index === 0} style={{ width: 44, height: 44, borderRadius: 10, border: `1px solid ${C.n200}`, background: index === 0 ? C.n100 : C.white, color: index === 0 ? C.n300 : C.n700, cursor: index === 0 ? "default" : "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <ChevronLeft size={20} />
          </button>
          <button onClick={() => { setIndex(0); setFlipped(false); }} style={{ padding: "10px 20px", borderRadius: 10, border: `1px solid ${C.n200}`, background: C.white, color: C.n600, fontWeight: 600, fontSize: "0.84rem", cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
            <RefreshCw size={14} /> Restart
          </button>
          <button onClick={() => navigate("next")} disabled={index >= total - 1} style={{ width: 44, height: 44, borderRadius: 10, border: `1px solid ${C.n200}`, background: index >= total - 1 ? C.n100 : C.white, color: index >= total - 1 ? C.n300 : C.n700, cursor: index >= total - 1 ? "default" : "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Progress Report ─────────────────────────────────────────────────────────────
function ProgressReport({ onBack, attempts, onReset }) {
  const [filter, setFilter] = useState("all"); // all | correct | wrong | unattempted

  const total = rulesData.length;
  const attempted = Object.keys(attempts).length;
  const correct = Object.values(attempts).filter(a => a.lastResult === "correct").length;
  const wrong = Object.values(attempts).filter(a => a.lastResult === "wrong").length;
  const unattempted = total - attempted;
  const accuracy = attempted > 0 ? Math.round((correct / attempted) * 100) : 0;

  // Questions with most wrong attempts — top 5 weak spots
  const weakSpots = rulesData
    .filter(q => attempts[q.id] && attempts[q.id].wrong > 0)
    .sort((a, b) => (attempts[b.id]?.wrong || 0) - (attempts[a.id]?.wrong || 0))
    .slice(0, 5);

  const filteredQs = rulesData.filter(q => {
    if (filter === "correct") return attempts[q.id]?.lastResult === "correct";
    if (filter === "wrong") return attempts[q.id]?.lastResult === "wrong";
    if (filter === "unattempted") return !attempts[q.id];
    return true;
  });

  const masteryColor = accuracy >= 80 ? C.success : accuracy >= 60 ? C.accent : C.danger;

  return (
    <div style={{ minHeight: "100vh", background: C.n50, fontFamily: font }}>
      <PageHeader
        title="📊 Progress Report"
        onBack={onBack}
        rightEl={
          <button onClick={onReset} style={{ display: "flex", alignItems: "center", gap: 6, background: C.dangerBg, border: `1px solid ${C.danger}`, color: C.danger, padding: "6px 14px", borderRadius: 8, fontWeight: 600, fontSize: "0.8rem", cursor: "pointer" }}>
            <RotateCcw size={13} /> Reset Data
          </button>
        }
      />
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "32px 20px 72px" }}>

        {/* Hero stats */}
        <div style={{ background: `linear-gradient(135deg,${C.n900} 0%,#1a3460 100%)`, borderRadius: 22, padding: "32px 28px", color: C.white, marginBottom: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
            <div style={{ width: 70, height: 70, borderRadius: 18, background: masteryColor, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Award size={36} color={C.white} />
            </div>
            <div>
              <div style={{ fontSize: "0.75rem", opacity: 0.6, textTransform: "uppercase", letterSpacing: "0.1em" }}>Overall Accuracy</div>
              <div style={{ fontSize: "3rem", fontWeight: 900, lineHeight: 1, color: masteryColor }}>{accuracy}%</div>
              <div style={{ fontSize: "0.85rem", opacity: 0.7, marginTop: 2 }}>{attempted} of {total} questions attempted</div>
            </div>
          </div>

          {/* Progress bar */}
          <div style={{ marginBottom: 8, fontSize: "0.75rem", opacity: 0.65, display: "flex", justifyContent: "space-between" }}>
            <span>Progress to mastery (80%)</span><span>{accuracy}%</span>
          </div>
          <div style={{ height: 10, borderRadius: 10, background: "rgba(255,255,255,0.15)", overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${accuracy}%`, background: masteryColor, borderRadius: 10, transition: "width 0.8s ease" }} />
          </div>

          {/* Stat chips */}
          <div style={{ display: "flex", gap: 12, marginTop: 20, flexWrap: "wrap" }}>
            {[
              { label: "Correct", value: correct, color: "#34d399", bg: "rgba(52,211,153,0.15)" },
              { label: "Wrong", value: wrong, color: "#f87171", bg: "rgba(248,113,113,0.15)" },
              { label: "Unattempted", value: unattempted, color: "#94a3b8", bg: "rgba(148,163,184,0.15)" },
              { label: "Total", value: total, color: "#c4b5fd", bg: "rgba(196,181,253,0.15)" },
            ].map(s => (
              <div key={s.label} style={{ flex: "1 1 80px", background: s.bg, borderRadius: 12, padding: "12px 16px", textAlign: "center" }}>
                <div style={{ fontSize: "1.6rem", fontWeight: 900, color: s.color }}>{s.value}</div>
                <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.55)", textTransform: "uppercase", letterSpacing: "0.08em" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Weak spots */}
        {weakSpots.length > 0 && (
          <div style={{ background: C.white, borderRadius: 18, padding: "22px 22px", marginBottom: 24, border: `1px solid ${C.dangerBg}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <TrendingUp size={18} color={C.danger} />
              <h3 style={{ margin: 0, color: C.n800, fontWeight: 800, fontSize: "1rem" }}>Weak Spots — Focus Here</h3>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {weakSpots.map(q => {
                const a = attempts[q.id];
                const total_attempts = a.correct + a.wrong;
                const pct = Math.round((a.wrong / total_attempts) * 100);
                return (
                  <div key={q.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", background: C.dangerBg, borderRadius: 10, border: `1px solid rgba(220,38,38,0.15)` }}>
                    <span style={{ background: C.danger, color: C.white, fontWeight: 700, fontSize: "0.7rem", padding: "3px 8px", borderRadius: 5, flexShrink: 0 }}>Q{q.id}</span>
                    <span style={{ flex: 1, color: C.n700, fontSize: "0.87rem", lineHeight: 1.4 }}>{q.question}</span>
                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                      <div style={{ fontSize: "1rem", fontWeight: 800, color: C.danger }}>{pct}%</div>
                      <div style={{ fontSize: "0.68rem", color: C.n400 }}>error rate</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Filter tabs + question list */}
        <div style={{ background: C.white, borderRadius: 18, padding: "20px 20px", border: `1px solid ${C.n200}` }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 18, background: C.n50, padding: 5, borderRadius: 10 }}>
            {[["all", "All", total], ["correct", "✓ Correct", correct], ["wrong", "✗ Wrong", wrong], ["unattempted", "Not Tried", unattempted]].map(([key, label, count]) => (
              <button key={key} onClick={() => setFilter(key)} style={{ flex: 1, padding: "7px 8px", borderRadius: 7, border: "none", background: filter === key ? C.primary : "transparent", color: filter === key ? C.white : C.n500, fontWeight: 700, fontSize: "0.75rem", cursor: "pointer", transition: "all 0.15s" }}>
                {label} ({count})
              </button>
            ))}
          </div>

          {filteredQs.length === 0 ? (
            <div style={{ textAlign: "center", padding: "40px 20px", color: C.n400 }}>
              <CheckSquare size={32} style={{ marginBottom: 12 }} />
              <p style={{ fontWeight: 600 }}>No questions in this category yet</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {filteredQs.map(q => {
                const a = attempts[q.id];
                const status = !a ? "unattempted" : a.lastResult;
                const statusColor = status === "correct" ? C.success : status === "wrong" ? C.danger : C.n400;
                const statusBg = status === "correct" ? C.successBg : status === "wrong" ? C.dangerBg : C.n100;
                return (
                  <div key={q.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 14px", background: statusBg, borderRadius: 10, border: `1px solid ${status === "correct" ? "rgba(5,150,105,0.15)" : status === "wrong" ? "rgba(220,38,38,0.15)" : C.n200}` }}>
                    <span style={{ background: statusColor, color: C.white, fontWeight: 700, fontSize: "0.7rem", padding: "3px 8px", borderRadius: 5, flexShrink: 0 }}>Q{q.id}</span>
                    <span style={{ flex: 1, color: C.n700, fontSize: "0.86rem", lineHeight: 1.4 }}>{q.question}</span>
                    {a && (
                      <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                        {a.correct > 0 && <span style={{ background: C.successBg, color: C.success, fontWeight: 700, fontSize: "0.68rem", padding: "2px 7px", borderRadius: 5 }}>✓{a.correct}</span>}
                        {a.wrong > 0 && <span style={{ background: C.dangerBg, color: C.danger, fontWeight: 700, fontSize: "0.68rem", padding: "2px 7px", borderRadius: 5 }}>✗{a.wrong}</span>}
                      </div>
                    )}
                    {!a && <span style={{ color: C.n400, fontSize: "0.72rem" }}>—</span>}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Root ──────────────────────────────────────────────────────────────────────
export default function RulesOfTheRoad({ onBack }) {
  const [mode, setMode] = useState("home");
  const { attempts, record, reset } = useAttemptTracker();

  if (mode === "practice") return <PracticeMode onBack={() => setMode("home")} />;
  if (mode === "test") return <TestEngine onBack={() => setMode("home")} timed={false} record={record} />;
  if (mode === "timed") return <TestEngine onBack={() => setMode("home")} timed={true} record={record} />;
  if (mode === "flashcard") return <FlashcardMode onBack={() => setMode("home")} record={record} />;
  if (mode === "progress") return <ProgressReport onBack={() => setMode("home")} attempts={attempts} onReset={reset} />;
  return <Landing onSelect={setMode} onBack={onBack} attempts={attempts} />;
}