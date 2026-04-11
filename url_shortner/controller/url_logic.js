const {nanoid} = require('nanoid');
const URL = require('..modles/URL');

async function generateShortUrl(req,res) {
    try{
        const body = req.body;
        if(!body) {
            return res.status(400).json({
                message: 'Redirect URL is required',
            });
        }
        const shortID = nanoid(8);

        await URL.create({
            shortID: shortID,
            redirectUrl: body.url
        })

        return res.status(201).json({
            status: 'success',
            shortUrl: `${req.headers.host}/${shortID}`,
        });
    }
    catch(error) {
        return res.status(500).json({
            message: 'Error in generating short URL',
            error: error.message,
        })
    }
}


async function getAllURLRecords(req,res) {
    try {
        const data = await URL.find({});
        return res.json({
            status: 'success',
            data: data,
        });
    }
    catch(error) {
        return res.status(500).json({
            message: 'Error in fetching URL record',
            error: error.message,
        })
}
    
}