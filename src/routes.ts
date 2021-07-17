import { Router } from 'express';
import booksController from './controllers/booksController';

const router = Router();

router.get('/', booksController.get);
router.get('/:id', booksController.get);
router.put('/:id', booksController.update)
router.post('/', booksController.create)
router.delete('/:id', booksController.delete)
export default router;
