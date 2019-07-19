const mongodb = require('mongodb');
const mongoose = require('mongoose');
var  Schema = mongoose.Schema

var studentSchema = new Schema({
    student_id:{type:String,required:true},
    student_name:{type:String,required:true},
    standard:{type:Number,required:true},
    team:{type:Schema.Types.ObjectId, ref:'team'},
    skill_marks:{type:Schema.Types.ObjectId, ref:'skills'},
    challenge_marks:{type:Schema.Types.ObjectId, ref:'challenges'}
},{timestamps:true})

var volunteerSchema = new Schema({
    volunteer_id:{type:String,required:true},
    volunteer_name:{type:String,required:true},
    volunteer_team:{type:Schema.Types.ObjectId,ref:'team'},
})

var houseSchema = new Schema({
    house_id:{type:Number,required:true},
    house_name:{type:String,required:true},
    house_score:{type:Number,default:0}
})

var teamSchema = new Schema({
    house_id:{type:Schema.Types.ObjectId,ref:'house'},
    team_id:{type:String,required:true},
    team_name:{type:String},
    team_score:{type:Number}
})

var evaluationSchema = new Schema({
    volunteer_id:{type:Schema.Types.ObjectId, ref:'volunteer'},
    questions:{
        cognitive_skills:{
            problem_solve:[{
                question_no:{type:Number,required:true},
                questions:{type:String,required:true}
            }],
            critical_think:[{
                question_no:{type:Number,required:true},
                questions:{type:String,required:true}
            }],
            creation:[{
                question_no:{type:Number,required:true},
                questions:{type:String,required:true}
            }],
            communication:[{
                question_no:{type:Number,required:true},
                questions:{type:String,required:true}
            }]
        },
        behavioural_skills:{
            listening:[{
                question_no:{type:Number,required:true},
                questions:{type:String,required:true}
            }],
            patience:[{
                question_no:{type:Number,required:true},
                questions:{type:String,required:true}
            }],
            re_silence:[{
                question_no:{type:Number,required:true},
                questions:{type:String,required:true}
            }],
            risk_talking:[{
                question_no:{type:Number,required:true},
                questions:{type:String,required:true}
            }]
        },
        team_skills:{
            organising:[{
                question_no:{type:Number,required:true},
                questions:{type:String,required:true}
            }],
            collaboration:[{
                question_no:{type:Number,required:true},
                questions:{type:String,required:true}
            }],
            time_management:[{
                question_no:{type:Number,required:true},
                questions:{type:String,required:true}
            }],
            craftmanship:[{
                question_no:{type:Number,required:true},
                questions:{type:String,required:true}
            }]
        },
        leadership_skills:{
            lead:[{
                question_no:{type:Number,required:true},
                questions:{type:String,required:true}
            }],
            motivate:[{
                question_no:{type:Number,required:true},
                questions:{type:String,required:true}
            }],
            productive:[{
                question_no:{type:Number,required:true},
                questions:{type:String,required:true}
            }],
            initiate:[{
                question_no:{type:Number,required:true},
                questions:{type:String,required:true}
            }]
        }
    }
})

module.exports ={
    Student: mongoose.model('student',studentSchema),
    Volunteer: mongoose.model('volunteer',volunteerSchema),
    Evaluation: mongoose.model('evaluation',evaluationSchema),
    House:mongoose.model('house',houseSchema),
    Team:mongoose.model('team',teamSchema)
}