import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'
import models from './models/index';
import routes from './routes/IndexRoute';


const app = express()

// parse body params and attache them to req.body
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
// use helmet spy bisa dikenali SEO
app.use(helmet())
// secure apps by setting various HTTP headers
app.use(compress())
// enable CORS - Cross Origin Resource Sharing
app.use(cors());

// 1. client-side 
/* import React from 'react'
import ReactDOMServer from 'react-dom/server'
import MainRouter from './../client/MainRouter'
import { StaticRouter } from 'react-router-dom'
import Template from './../template' */

//comment script dibawah before building for production
//import devBundle from './devBundle'
// client-side : gunakan ketika development only
//devBundle.compile(app)


//comment script dibawah before building for production


const CURRENT_WORKING_DIR = process.cwd()
app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')))


app.use("/TA/api/v1/test", (req, res) => {
    res.send("HAII DANI")
});

// #middleware
app.use(async (req, res, next) => {
    req.context = {models};
    next();
});


app.use('/api/auth', routes.AuthRoute);
app.use('/api/talents', routes.TalentRoute);
app.use('/api/talentscart', routes.TalentsCartRoute);
app.use('/api/talentscomments', routes.Talents_commentsRoute);
app.use('/api/talentsimages', routes.TalentsImagesRoute)
app.use('/api/UploadDownload', routes.UploadDownload)
app.use('/api/liteitem', routes.LiteItemRoute)
app.use('/api/shop' , routes.ShopRoute)

// 2. Client-Side : ReactDOMServer.
/* app.get('/hr/*', (req, res) => {

    const context = {}
    const markup = ReactDOMServer.renderToString(
      <StaticRouter location={req.url} context={context}>
        <MainRouter />
      </StaticRouter>
    );
    if (context.url) {
      return res.redirect(303, context.url)
    }
  
    res.status(200).send(Template())
  }); */

// Catch unauthorised errors
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ "error": err.name + ": " + err.message })
    } else if (err) {
        res.status(400).json({ "error": err.name + ": " + err.message })
        console.log(err)
    }
})

export default app