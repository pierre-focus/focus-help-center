import express from 'express';
import {Article} from '../db';

/**
 * @swagger
 * definition:
 *   Article-Get:
 *     properties:
 *       id:
 *         type: integer
 *       title:
 *         type: string
 *       description:
 *         type: string
 *       content:
 *         type: string
 *       published:
 *         type: boolean
 *       createdAt:
 *         type: string
 *       updatedAt:
 *         type: string
 */

/**
 * @swagger
 * definition:
 *   Article-Post:
 *     properties:
 *       id:
 *         type: integer
 *       title:
 *         type: string
 *       description:
 *         type: string
 *       content:
 *         type: string
 *       published:
 *         type: boolean
 */

/**
 * @swagger
 * definition:
 *   Error:
 *     properties:
 *       error:
 *         type: string
 */

export function articleService(app: express.Application) {

    /**
     * @swagger
     * /api/article/{id}:
     *   get:
     *     tags:
     *       - Article
     *     description: Returns a single article.
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: Id of the article.
     *         in: path
     *         required: true
     *         type: integer
     *     responses:
     *       200:
     *         description: A single article.
     *         schema:
     *           $ref: '#/definitions/Article-Get'
     *       403:
     *         description: Article not published and no rights
     *         schema:
     *           $ref: '#/definitions/Error'
     *       404:
     *         description: Article not found
     *         schema:
     *           $ref: '#/definitions/Error'
     */
    app.get('/api/article/:id', async (req, res) => {
        const {signedIn} = req.session;
        const article = await Article.findById(req.params.id);
        if (!article) {
            res.status(404);
            res.json({error: 'No article found'});
        } else if (signedIn || article.get().published === true) {
            res.json(article);
        } else {
            res.status(403);
            res.json({error: 'This article isn\'t published'});
        }
    });

    /**
     * @swagger
     * /api/article:
     *   get:
     *     tags:
     *       - Article
     *     description: Returns all the articles.
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: Returns all the articles.
     *         schema:
     *         type: array
     *         items:
     *             $ref: '#/definitions/Article-Get'
     */
    app.get('/api/article', async (req, res) => {
        const {signedIn} = req.session;
        if (signedIn) {
            res.json(await Article.findAll());
        } else {
            res.json(await Article.findAll({where: {published: true}}));
        }
    });

    /**
     * @swagger
     * /api/article:
     *   post:
     *     tags:
     *       - Article
     *     description: Saves an article.
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: article
     *         description: The article to save.
     *         in: body
     *         required: true
     *         schema:
     *           $ref: '#/definitions/Article-Post'
     *     responses:
     *       200:
     *         description: The saved article with its id.
     *         schema:
     *           $ref: '#/definitions/Article-Get'
     *       403:
     *         description: No rights to save
     *         schema:
     *           $ref: '#/definitions/Error'
     */
    app.post('/api/article', async (req, res) => {
        const {signedIn} = req.session;
        if (!signedIn) {
            res.status(403);
            res.json({error: 'Cannot save an article when not connected'});
        } else {
            try {
                await Article.create(req.body);
                res.json({success: true});
            } catch (error) {
                res.json({error});
            }
        }
    });
}
