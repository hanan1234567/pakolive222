const { GalleryController,NewsController,TendersController,DownloadsController,LinksController,JobsController, VideosController,
    SliderController, TeamController,SocialLinksController } = require('../controllers');
const websiteRoutes = require("express").Router();
// Gallery Routes
websiteRoutes.get('/gallery_/:limit',GalleryController.Get)
websiteRoutes.get('/news_',NewsController.Get)
websiteRoutes.get('/news_/:limit',NewsController.Get)
websiteRoutes.get('/tenders_',TendersController.Get)
websiteRoutes.get('/downloads_',DownloadsController.Get)
websiteRoutes.get('/links_',LinksController.Get)
websiteRoutes.get('/jobs_',JobsController.Get)
websiteRoutes.get("/videos_",VideosController.Get)
websiteRoutes.get("/slider_",SliderController.Get)
websiteRoutes.get('/team_',TeamController.Get)
websiteRoutes.get('/socialLinks_',SocialLinksController.Get)

module.exports = websiteRoutes