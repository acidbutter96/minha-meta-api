import Vendor from '../models/Vendor';

class SessionController {
    create(req, res) {
        return res.status(200).send('Session Controller');
    }
}

export default new SessionController();