import {Router} from 'express';
import ActivitiesRoutes from './activitiesRoutes';
import BuyServicesOrProductsRoutes from './buyServicesOrProductsRoutes';
import cepsRoutes from './cepsRoutes';
import ClientsRoutes from './clientsRoutes';
import DaysRoutes from './daysRoutes';
import DepartmentsRoutes from './departmentsRoutes';
import InformativeRoutes from './informativeRoutes';
import LicensesRoutes from './licensesRoutes';
import LogoutRoutes from './logoutRoutes';
import ModulesRoutes from './modulesRoutes';
import NotificationRoutes from './notificationRoutes';
import PermissionsRoutes from './permissionsRoutes';
import ProfileRoutes  from './profileRoutes';
import WorksRoutes from './worksRoutes';
import WorkDiaryRoutes from './workDiaryRoutes';
import SessionRoutes from './sessionRoutes';
import SignupRoutes from './signupRoutes';
import TutorialRoutes from './tutorialRoutes';
import UsersRoutes from './usersRoutes';
//import secureRoutes from './Secure/SecureRoutes';

const routes = Router();

routes.use('/activities', ActivitiesRoutes);
routes.use('/buyServicesOrProducts', BuyServicesOrProductsRoutes);
routes.use('/ceps', cepsRoutes);
routes.use('/clients', ClientsRoutes);
routes.use('/days', DaysRoutes);
routes.use('/departments', DepartmentsRoutes);
routes.use('/informative', InformativeRoutes);
routes.use('/licenses', LicensesRoutes);
routes.use('/logout', LogoutRoutes);
routes.use('/modules', ModulesRoutes);
routes.use('/notification', NotificationRoutes);
routes.use('/permissions', PermissionsRoutes);
routes.use('/profile', ProfileRoutes);
routes.use('/works', WorksRoutes);
routes.use('/workDiary', WorkDiaryRoutes);
routes.use('/session', SessionRoutes);
routes.use('/signup', SignupRoutes);
routes.use('/tutorial', TutorialRoutes);
routes.use('/users', UsersRoutes);


//routes.use('/secure', secureRoutes);


export default routes;
