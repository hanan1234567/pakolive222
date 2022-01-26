const { AuthController, RoleController, UserController, SubjectController, ChapterController, 
       QuestionBankController, ContentController,GalleryController, NewsController,HeadlineController,
       TendersController, JobsController,DownloadsController, LinksController, SliderController, VideosController 
       ,LocationsController, TeamController, SocialLinksController} = require('../controllers');
const adminRoutes = require("express").Router();
const { auth, can, upload } = require('../middlewares')

adminRoutes.post('/login', AuthController.Login)
adminRoutes.post('/forget-password', AuthController.ForgetPassword)
adminRoutes.post('/check-reset', AuthController.ValidatePasswordRequest)
adminRoutes.post('/reset-password', AuthController.ResetPassword)
adminRoutes.get('/logout', AuthController.Logout)

adminRoutes.post('/signup', AuthController.Signup)
adminRoutes.get('/get-class-id/:id', SubjectController.GetClassById)


adminRoutes.use(auth);
adminRoutes.get('/auth-check', AuthController.CheckAuth)
adminRoutes.get('/token', AuthController.refreshToken)

/* Roles Routes */
adminRoutes.post('/roles', can('create:any|create:own', 'roles'), RoleController.Create)
adminRoutes.get('/roles', can('read:any|read:own', 'roles'), RoleController.Get)
adminRoutes.put('/roles/:id', can('update:any|update:own', 'roles'), RoleController.Update)
adminRoutes.delete('/roles/:id', can('delete:any|delete:own', 'roles'), RoleController.Delete)


/* Users Routes */
adminRoutes.post('/users', can('create:any|create:own', 'users'), UserController.Create)
adminRoutes.get('/users', can('read:any|read:own', 'users'), UserController.Get)
adminRoutes.put('/users/:id', can('update:any|update:own', 'users'), UserController.Update)
adminRoutes.delete('/users/:id', can('delete:any|delete:own', 'roles'), UserController.Delete)

/* Subjects Routes */
adminRoutes.post('/subjects', can('create:any|create:own', 'subjects'), upload.single('thumbnail'), SubjectController.Create)
adminRoutes.get('/subjects/:class_id', can('read:any|read:own', 'subjects'), SubjectController.Get)
adminRoutes.get('/subjects/details/:subject_id', can('read:any|read:own', 'subjects'), SubjectController.GetSubjectDetails)
adminRoutes.post('/subjects/:id', can('update:any|update:own', 'subjects'), upload.single('thumbnail'), SubjectController.Update)
adminRoutes.delete('/subjects/:id', can('delete:any|delete:own', 'subjects'), SubjectController.Delete)

// Gallery Routes
adminRoutes.get('/gallery', can('create:any|create:own', 'subjects'), GalleryController.Get)
adminRoutes.post('/gallery', can('create:any|create:own', 'subjects'), upload.single('thumbnail'), GalleryController.Create)
adminRoutes.put('/gallery', can('create:any|create:own', 'subjects'), upload.single('thumbnail'), GalleryController.Update)
adminRoutes.post('/gallery/:galleryID', can('create:any|create:own', 'subjects'),  upload.array('photos',2), GalleryController.GalleryImage)
adminRoutes.delete('/gallery/:galleryID', can('create:any|create:own', 'subjects'),GalleryController.Delete)
// News and Event Routes
adminRoutes.get('/news', can('create:any|create:own', 'subjects'), NewsController.Get)
adminRoutes.post('/news', can('create:any|create:own', 'subjects'),  upload.single('thumbnail'), NewsController.Create)
adminRoutes.put('/news', can('create:any|create:own', 'subjects'),  upload.single('thumbnail'), NewsController.Update)
adminRoutes.delete('/news/:newsID', can('create:any|create:own', 'subjects'), NewsController.Delete)
//headline
adminRoutes.get('/headlines', can('create:any|create:own', 'subjects'), HeadlineController.Get)
adminRoutes.post('/headline', can('create:any|create:own', 'subjects'), HeadlineController.Create)
adminRoutes.put('/headline', can('create:any|create:own', 'subjects'), HeadlineController.Update)
adminRoutes.delete('/headline/:headlineID', can('create:any|create:own', 'subjects'), HeadlineController.Delete)

// tenders
adminRoutes.get('/tenders', can('create:any|create:own', 'subjects'), TendersController.Get)
adminRoutes.post('/tenders', can('create:any|create:own', 'subjects'),  upload.single('file'), TendersController.Create)
adminRoutes.put('/tenders', can('create:any|create:own', 'subjects'),  upload.single('file'), TendersController.Update)
adminRoutes.delete('/tenders/:tenderID', can('create:any|create:own', 'subjects'), TendersController.Delete)
//jobs
adminRoutes.get('/jobs', can('create:any|create:own', 'subjects'), JobsController.Get)
adminRoutes.post('/jobs', can('create:any|create:own', 'subjects'), JobsController.Create)
adminRoutes.put('/jobs', can('create:any|create:own', 'subjects'), JobsController.Update)
adminRoutes.delete('/jobs/:jobsID', can('create:any|create:own', 'subjects'), JobsController.Delete)
//downloaded material
adminRoutes.get('/downloads', can('create:any|create:own', 'subjects'), DownloadsController.Get)
adminRoutes.post('/downloads', can('create:any|create:own', 'subjects'),  upload.single('file'), DownloadsController.Create)
adminRoutes.put('/downloads', can('create:any|create:own', 'subjects'),  upload.single('file'), DownloadsController.Update)
adminRoutes.delete('/downloads/:downloadID', can('create:any|create:own', 'subjects'), DownloadsController.Delete)
//useful links
adminRoutes.get('/links', can('create:any|create:own', 'subjects'), LinksController.Get)
adminRoutes.post('/links', can('create:any|create:own', 'subjects'), LinksController.Create)
adminRoutes.put('/links', can('create:any|create:own', 'subjects'), LinksController.Update)
adminRoutes.delete('/links/:linkID', can('create:any|create:own', 'subjects'), LinksController.Delete)
//slider routes
adminRoutes.get('/slider', can('create:any|create:own', 'subjects'), SliderController.Get)
adminRoutes.post('/slider', can('create:any|create:own', 'subjects'),  upload.single('image'), SliderController.Create)
adminRoutes.put('/slider', can('create:any|create:own', 'subjects'),  upload.single('image'), SliderController.Update)
adminRoutes.delete('/slider/:slideID', can('create:any|create:own', 'subjects'), SliderController.Delete)
//
adminRoutes.get('/videos', can('create:any|create:own', 'subjects'), VideosController.Get)
adminRoutes.post('/videos', can('create:any|create:own', 'subjects'),  upload.single('thumbnail'), VideosController.Create)
adminRoutes.put('/videos', can('create:any|create:own', 'subjects'),  upload.single('thumbnail'), VideosController.Update)
adminRoutes.delete('/videos/:videoID', can('create:any|create:own', 'subjects'), VideosController.Delete)
//location
adminRoutes.get('/locations', can('create:any|create:own', 'subjects'), LocationsController.Get)
adminRoutes.post('/locations', can('create:any|create:own', 'subjects'),  upload.single('kmz'), LocationsController.Create)
adminRoutes.put('/locations', can('create:any|create:own', 'subjects'),  upload.single('kmz'), LocationsController.Update)
adminRoutes.delete('/locations/:locationID', can('create:any|create:own', 'subjects'), LocationsController.Delete)
//core team
adminRoutes.get('/team', can('create:any|create:own', 'subjects'), TeamController.Get)
adminRoutes.post('/team', can('create:any|create:own', 'subjects'), TeamController.Create)
adminRoutes.put('/team', can('create:any|create:own', 'subjects'), TeamController.Update)
adminRoutes.delete('/team/:_id', can('create:any|create:own', 'subjects'), TeamController.Delete)
//social links
adminRoutes.get('/socialLinks', can('create:any|create:own', 'subjects'), SocialLinksController.Get)
adminRoutes.post('/socialLinks', can('create:any|create:own', 'subjects'), SocialLinksController.Create)
adminRoutes.put('/socialLinks', can('create:any|create:own', 'subjects'), SocialLinksController.Update)
adminRoutes.delete('/socialLinks/:linkID', can('create:any|create:own', 'subjects'), SocialLinksController.Delete)

adminRoutes.get('/email', UserController.SendMail)
// adminRoutes.post('/signup', AuthController.Signup)
// adminRoutes.get('/logout', auth, AuthController.Me)
// adminRoutes.get('/me', auth, AuthController.Me)

module.exports = adminRoutes