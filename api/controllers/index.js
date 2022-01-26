const AuthController = require('./Auth.controller')
const RoleController = require('./Role.controller')
const UserController = require('./User.controller')
const SubjectController = require('./Subject.controller')
const ChapterController = require('./Chapter.controller')
const QuestionBankController = require('./QuestionBank.Controller')
const ContentController = require('./Content.controller')
const GalleryController=require("./Gallery.controller")
const NewsController=require("./News.controller")
const HeadlineController=require("./headline.controller")
const TendersController=require("./Tenders.controller")
const JobsController=require("./Jobs.controller")
const DownloadsController=require("./Downloads.controller")
const LinksController=require("./Links.controller")
const SliderController=require("./Slider.controller")
const VideosController=require("./videos.controller")
const LocationsController=require("./Locations.controller")
const TeamController=require("./team.controller")
const SocialLinksController=require("./socialLinks.controller")
module.exports = { AuthController, RoleController, UserController, SubjectController, ChapterController, 
    QuestionBankController, ContentController,
    GalleryController,NewsController,HeadlineController,
    TendersController,JobsController,DownloadsController,LinksController,SliderController, VideosController,
    LocationsController, TeamController, SocialLinksController};