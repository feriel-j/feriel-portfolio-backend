// contactRoutes.ts
import { Router } from 'express';
import handleContactForm from './contactControllers'; 
const contactRouter = Router();

contactRouter.post('/contact', (req, res) => {
  handleContactForm(req, res);
});
export default contactRouter;
