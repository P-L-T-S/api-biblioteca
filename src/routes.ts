import { Router } from 'express';
import booksController from './controllers/booksController';

const router = Router();

router.get('/', booksController.getAll);
router.get('/:id', booksController.getById);
router.put('/:id', booksController.update)
router.post('/', booksController.create)
router.delete('/:id', booksController.delete)
export default router;
