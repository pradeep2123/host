const mongoose = require('mongoose');
var  Schema = mongoose.Schema

var studentSchema = new Schema({
    student_id:{type:String,required:true},
    student_name:{type:String,required:true},
    student_email:{type:String},
    standard:{type:Number,required:true},
    photo:{type:String},
    team:{type:String, required:true},
    house_name:{type:String,required:true},
    challenge_marks:[
        {
        challenge_type:{type:String,enum:["C1","C2"]},
        cognitive_skills:{
            cog_total_ponts:{type:Number,default:0},
            cog_average:{type:Number,default:0},
            problem_solve:{type:Number,default:0},
            critical_think:{type:Number,default:0},
            creation:{type:Number,default:0},
            communication:{type:Number,default:0}
        },
        behavioural_skills:{
            beh_total_ponts:{type:Number,default:0},
            beh_average:{type:Number,default:0},
            listening:{type:Number,default:0},
            patience:{type:Number,default:0},
            re_silence:{type:Number,default:0},
            risk_talking:{type:Number,default:0}
        },  
        team_skills:{
            team_total_ponts:{type:Number,default:0},
            team_average:{type:Number,default:0},
            organising:{type:Number,default:0},
            collaboration:{type:Number,default:0},
            time_management:{type:Number,default:0},
            craftmanship:{type:Number,default:0}
        },
        leadership_skills:{
            lead_total_ponts:{type:Number,default:0},
            lead_average:{type:Number,default:0},
            lead:{type:Number,default:0},
            motivate:{type:Number,default:0},
            productive:{type:Number,default:0},
            initiate:{type:Number,default:0}
        }
    }],
},{timestamps:true})

// var volunteerSchema = new Schema({
//     volunteer_id:{type:String,required:true},
//     volunteer_name:{type:String,required:true},
//     volunteer_email:{type:String,required:true},
//     volunteer_password:{type:String,required:true},
//     volunteer_role:{type:String,enum:["ADMIN","USER","SUPER_ADMIN"]},
//     volunteer_team:{type:Schema.Types.ObjectId,ref:'team'},
// })

// var houseSchema = new Schema({
//     house_id:{type:Number,required:true},
//     house_name:{type:String,required:true},
//     house_score:{type:Number,default:0}
// })

// var teamSchema = new Schema({
//     house_id:{type:Schema.Types.ObjectId,ref:'house'},
//     team_id:{type:String,required:true},
//     team_name:{type:String},
//     team_score:{type:Number}
// })

// var evaluationSchema = new Schema({
//     volunteer_id:{type:Schema.Types.ObjectId, ref:'volunteer'},
//     questions:{
//         cognitive_skills:{
//             problem_solve:[{
//                 question_no:{type:Number,required:true},
//                 questions:{type:String,required:true}
//             }],
//             critical_think:[{
//                 question_no:{type:Number,required:true},
//                 questions:{type:String,required:true}
//             }],
//             creation:[{
//                 question_no:{type:Number,required:true},
//                 questions:{type:String,required:true}
//             }],
//             communication:[{
//                 question_no:{type:Number,required:true},
//                 questions:{type:String,required:true}
//             }]
//         },
//         behavioural_skills:{
//             listening:[{
//                 question_no:{type:Number,required:true},
//                 questions:{type:String,required:true}
//             }],
//             patience:[{
//                 question_no:{type:Number,required:true},
//                 questions:{type:String,required:true}
//             }],
//             re_silence:[{
//                 question_no:{type:Number,required:true},
//                 questions:{type:String,required:true}
//             }],
//             risk_talking:[{
//                 question_no:{type:Number,required:true},
//                 questions:{type:String,required:true}
//             }]
//         },
//         team_skills:{
//             organising:[{
//                 question_no:{type:Number,required:true},
//                 questions:{type:String,required:true}
//             }],
//             collaboration:[{
//                 question_no:{type:Number,required:true},
//                 questions:{type:String,required:true}
//             }],
//             time_management:[{
//                 question_no:{type:Number,required:true},
//                 questions:{type:String,required:true}
//             }],
//             craftmanship:[{
//                 question_no:{type:Number,required:true},
//                 questions:{type:String,required:true}
//             }]
//         },
//         leadership_skills:{
//             lead:[{
//                 question_no:{type:Number,required:true},
//                 questions:{type:String,required:true}
//             }],
//             motivate:[{
//                 question_no:{type:Number,required:true},
//                 questions:{type:String,required:true}
//             }],
//             productive:[{
//                 question_no:{type:Number,required:true},
//                 questions:{type:String,required:true}
//             }],
//             initiate:[{
//                 question_no:{type:Number,required:true},
//                 questions:{type:String,required:true}
//             }]
//         }
//     }
// })

// var markSchema = new Schema({
//  student_id:{type:Schema.Types.ObjectId, ref:'student'},
//  skill_marks:{
//     cognitive_skills:{
//         problem_solve:{type:Number,default:0},
//         critical_think:{type:Number,default:0},
//         creation:{type:Number,default:0},
//         communication:{type:Number,default:0}
//     },
//     behavioural_skills:{
//         listening:{type:Number,default:0},
//         patience:{type:Number,default:0},
//         re_silence:{type:Number,default:0},
//         risk_talking:{type:Number,default:0}
//     },  
//     team_skills:{
//         organising:{type:Number,default:0},
//         collaboration:{type:Number,default:0},
//         time_management:{type:Number,default:0},
//         craftmanship:{type:Number,default:0}
//     },
//     leadership_skills:{
//         lead:{type:Number,default:0},
//         motivate:{type:Number,default:0},
//         productive:{type:Number,default:0},
//         initiate:{type:Number,default:0}
//     }
// },
// challenge_marks:{
//     cognitive_skills:{
//         problem_solve:{type:Number,default:0},
//         critical_think:{type:Number,default:0},
//         creation:{type:Number,default:0},
//         communication:{type:Number,default:0}
//     },
//     behavioural_skills:{
//         listening:{type:Number,default:0},
//         patience:{type:Number,default:0},
//         re_silence:{type:Number,default:0},
//         risk_talking:{type:Number,default:0}
//     },
//     team_skills:{
//         organising:{type:Number,default:0},
//         collaboration:{type:Number,default:0},
//         time_management:{type:Number,default:0},
//         craftmanship:{type:Number,default:0}
//     },
//     leadership_skills:{
//         lead:{type:Number,default:0},
//         motivate:{type:Number,default:0},
//         productive:{type:Number,default:0},
//         initiate:{type:Number,default:0}
//     }
// }
// })

module.exports = {
    Student: mongoose.model('student',studentSchema),
    // Volunteer: mongoose.model('volunteer',volunteerSchema),
    // Evaluation: mongoose.model('evaluation',evaluationSchema),
    // House:mongoose.model('house',houseSchema),
    // Team:mongoose.model('team',teamSchema),
    // Marks:mongoose.model('marks',markSchema)
}

